import { Component, Input, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { TrendService } from 'src/app/services/trend.service';
import { TrendQueryModel, TrendLogModel } from 'src/app/models/trend.models';

// Grafico storico dei popup di device (PID, analogiche...): stessa impostazione del
// grafico multi-asse di ClientApp/src/app/chart (tenuto come riferimento ma escluso
// dalla compilazione in tsconfig.app.json), senza pero' la selezione libera dei
// segnali: qui le tracce sono fissate dal popup che ospita il grafico.
//
// I dati arrivano dalla storicizzazione: TagLoggingTask scrive in TagLogging i tag
// configurati in TagsToSave, /api/trend/GetLogging li rilegge. Se il tag non e'
// configurato in TagsToSave il grafico resta vuoto ("nessun dato storico").

/** Una traccia del grafico: un tag storicizzato (TagsToSave.TagLogName) con etichetta e UdM. */
export interface PlateChartSeries {
  tagLogName: string;
  label: string;
  unit?: string;
  color?: string;
}

@Component({
  selector: 'plate-chart',
  templateUrl: './plate-chart.component.html',
  styleUrls: ['./plate-chart.component.css']
})
export class PlateChartComponent implements OnChanges {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  /** Tracce da disegnare. Va passato un array stabile (campo, non getter): un nuovo
   *  riferimento a ogni giro di change detection farebbe ripartire la query storica. */
  @Input() series: PlateChartSeries[] = [];
  /** Prefisso del file CSV esportato. */
  @Input() exportAlias: string = 'storico';

  chartData: { datasets: any[]; labels: string[] } = { datasets: [], labels: [] };
  chartOptions: ChartOptions = {};
  lineChartType: ChartType = 'line';

  hasAnyData: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  // 0 = oggi, 1 = ieri, 48 = giorno scelto con il selettore data
  displayRangeModel: number = 0;
  diagDateSelected: Date;
  queryStartDate: Date;
  queryEndDate: Date;

  // Palette: PV blu, SP verde, OUT arancio (poi ciclica)
  private readonly COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  constructor(private trendService: TrendService, private cdr: ChangeDetectorRef) {
    const dtNow = new Date();
    this.diagDateSelected = dtNow;
    this.queryStartDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate(), 0, 0, 0);
    this.queryEndDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate(), 23, 59, 59);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series']) {
      this.rebuildChart();
      this.onSearch();
    }
  }

  /** True se c'e' almeno una traccia con un tag storicizzato da disegnare. */
  get hasSeries(): boolean {
    return this.validSeries.length > 0;
  }

  private get validSeries(): PlateChartSeries[] {
    return (this.series || []).filter(s => s != null && !!s.tagLogName);
  }

  private colorOf(serie: PlateChartSeries, index: number): string {
    return serie.color || this.COLORS[index % this.COLORS.length];
  }

  // #region Selezione periodo

  get diagDateForInput(): string {
    const d = this.diagDateSelected;
    if (!d) return '';
    const dd = new Date(d);
    return dd.getFullYear() + '-'
      + (dd.getMonth() + 1).toString().padStart(2, '0') + '-'
      + dd.getDate().toString().padStart(2, '0');
  }

  onDateInputChange(event: any): void {
    this.diagDateSelected = event.target.value;
    this.changeDiagDate();
  }

  changeRange(value: number): void {
    this.displayRangeModel = value;
    switch (value) {
      case 0: {
        this.diagDateSelected = new Date();
        this.changeDiagDate();
        break;
      }
      case 1: {
        const dt = new Date();
        dt.setDate(dt.getDate() - 1);
        this.diagDateSelected = dt;
        this.changeDiagDate();
        break;
      }
      case 48: this.changeDiagDate(); break;
    }
  }

  changeDiagDate(): void {
    const d = new Date(this.diagDateSelected);
    this.queryStartDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    this.queryEndDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
    this.onSearch();
  }

  // #endregion

  // #region Costruzione del grafico

  // Un asse Y per unita' di misura, non per traccia: PV e SP di un PID hanno la stessa
  // UdM e vanno confrontati sulla stessa scala, l'uscita in % finisce sul suo asse.
  private rebuildChart(): void {
    const series = this.validSeries;
    if (series.length === 0) {
      this.chartData = { datasets: [], labels: [] };
      this.chartOptions = {};
      return;
    }

    const axisIdByUnit = new Map<string, string>();
    series.forEach(s => {
      const unit = s.unit || '';
      if (!axisIdByUnit.has(unit)) axisIdByUnit.set(unit, 'y' + axisIdByUnit.size);
    });

    const yAxes: any[] = [];
    let axisIndex = 0;
    axisIdByUnit.forEach((axisId, unit) => {
      // Colore dell'asse = colore della prima traccia che ci appoggia
      const firstIndex = series.findIndex(s => (s.unit || '') === unit);
      const axisColor = this.colorOf(series[firstIndex], firstIndex);
      yAxes.push({
        id: axisId,
        position: axisIndex % 2 === 0 ? 'left' : 'right',
        ticks: { maxTicksLimit: 5, fontSize: 9, fontColor: axisColor, padding: 2, beginAtZero: true, suggestedMin: 0 },
        gridLines: {
          drawOnChartArea: axisIndex === 0,
          color: axisIndex === 0 ? 'rgba(0,0,0,0.06)' : 'transparent',
          drawTicks: true, tickMarkLength: 2
        },
        scaleLabel: { display: !!unit, labelString: unit, fontColor: axisColor, fontSize: 9 }
      });
      axisIndex++;
    });

    const datasets = series.map((s, i) => {
      const color = this.colorOf(s, i);
      return {
        label: s.label, data: [],
        borderColor: color, backgroundColor: color + '15',
        pointBackgroundColor: color, pointBorderColor: color,
        borderWidth: 2, pointRadius: 1.5, pointHoverRadius: 4,
        lineTension: 0.3, fill: false, spanGaps: true,
        yAxisID: axisIdByUnit.get(s.unit || '')
      };
    });

    this.chartData = { datasets, labels: [] };
    this.chartOptions = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 300 },
      layout: { padding: { left: 4, right: 4, top: 6, bottom: 4 } },
      scales: {
        xAxes: [{
          ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 8, fontSize: 9, fontColor: '#666', padding: 6 },
          gridLines: { color: 'rgba(0,0,0,0.06)' }
        }],
        yAxes: yAxes
      },
      legend: { display: true, position: 'bottom', labels: { boxWidth: 10, fontSize: 9, fontColor: '#555', padding: 6, usePointStyle: true } },
      tooltips: {
        mode: 'index', intersect: false, backgroundColor: 'rgba(0,0,0,0.85)', titleFontSize: 10, bodyFontSize: 10,
        callbacks: {
          label: (t: any, d: any) => {
            const label = d.datasets[t.datasetIndex].label || '';
            const unit = series[t.datasetIndex] ? (series[t.datasetIndex].unit || '') : '';
            return unit ? label + ': ' + t.yLabel + ' ' + unit : label + ': ' + t.yLabel;
          }
        }
      }
    } as any;
  }

  // #endregion

  // #region Lettura dati storici

  async onSearch(): Promise<void> {
    const series = this.validSeries;
    if (series.length === 0) {
      this.hasAnyData = false;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const query = new TrendQueryModel();
      query.tagLogNameList = series.map(s => s.tagLogName);
      query.startDate = this.queryStartDate;
      query.endDate = this.queryEndDate;
      query.zoneFilterList = [];
      query.plcFilterList = [];

      const results: TrendLogModel[] = await this.trendService.GetLogging(query);

      // I campioni delle varie tracce non cadono sullo stesso millisecondo (il task
      // logga i tag in sequenza): si allineano sul minuto, poi si costruisce un asse
      // dei tempi unico con l'unione dei minuti presenti.
      const samplesByTag = new Map<string, Map<number, number>>();
      series.forEach(s => samplesByTag.set(s.tagLogName, new Map<number, number>()));

      if (results != null) {
        for (const log of results) {
          const samples = samplesByTag.get(log.tagLogName);
          if (samples == null) continue; // tag non richiesto da questo grafico
          const d = new Date(log.logDate);
          d.setSeconds(0, 0);
          samples.set(d.getTime(), log.logValue);
        }
      }

      const timeKeys = new Set<number>();
      samplesByTag.forEach(samples => samples.forEach((value, key) => timeKeys.add(key)));
      const timeline = Array.from(timeKeys).sort((a, b) => a - b);

      this.chartData.labels = timeline.map(t => {
        const d = new Date(t);
        return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
      });

      this.hasAnyData = timeline.length > 0;

      series.forEach((s, i) => {
        const samples = samplesByTag.get(s.tagLogName);
        // null sui minuti senza campione: con spanGaps la linea resta continua
        const data = timeline.map(t => samples.has(t) ? samples.get(t) : null);
        if (this.chartData.datasets[i] != null)
          this.chartData.datasets[i] = Object.assign({}, this.chartData.datasets[i], { data: data });
      });

      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.chart != null && this.chart.chart != null) {
          this.chart.chart.resize();
          this.chart.update();
        }
      }, 50);

    } catch (errorOnSearch) {
      console.error('[PlateChart] onSearch - Errore caricamento dati storici', {
        tags: series.map(s => s.tagLogName),
        rangeStart: this.queryStartDate,
        rangeEnd: this.queryEndDate,
        error: errorOnSearch
      });
      this.errorMessage = 'Errore durante il caricamento dei dati storici';
      this.hasAnyData = false;
    } finally {
      this.isLoading = false;
    }
  }

  // #endregion

  exportCSV(): void {
    if (!this.hasAnyData) return;
    // Senza BOM Excel non riconosce l'UTF-8 e sballa accenti e simbolo dei gradi
    const bom = String.fromCharCode(0xFEFF);
    const rows: string[] = ['Segnale;Descrizione;Ora;Valore;UdM'];
    const labels = this.chartData.labels || [];
    this.validSeries.forEach((s, i) => {
      const data = this.chartData.datasets[i] != null ? this.chartData.datasets[i].data : [];
      for (let j = 0; j < data.length; j++) {
        if (data[j] == null) continue;
        rows.push(s.tagLogName + ';' + s.label + ';' + (labels[j] || '') + ';' + data[j] + ';' + (s.unit || ''));
      }
    });

    const d = new Date(this.queryStartDate);
    const stamp = d.getFullYear() + '-'
      + (d.getMonth() + 1).toString().padStart(2, '0') + '-'
      + d.getDate().toString().padStart(2, '0');
    const blob = new Blob([bom + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.exportAlias + '_storico_' + stamp + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
