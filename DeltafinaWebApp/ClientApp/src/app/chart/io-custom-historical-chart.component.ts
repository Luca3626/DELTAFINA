import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { TagsClient } from '../../tags/tags-client';
import { TrendService } from '../../services/trend.service';
import { TrendQueryModel, TrendLogModel } from '../../models/trend.models';
import { IoScaleRegistry } from '../shared/io-scale-registry.service';
import { now } from 'moment';

// Numero massimo di segnali visualizzabili contemporaneamente nel grafico storico
const MAX_SIGNALS = 10;
// Chiave localStorage per persistere la selezione segnali tra sessioni
const STORAGE_KEY_PREFIX = 'io-custom-hist-signals-v2-';

interface SelectedSignal { tagName: string; color: string; }

@Component({
  selector: 'io-custom-historical-chart',
  templateUrl: './io-custom-historical-chart.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    './io-custom-historical-chart.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class IoCustomHistoricalChartComponent implements OnChanges, AfterViewInit {

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() deviceName: string = '';
  @Input() deviceAlias: string = '';
  @Input() analogTags: TagsClient[] = [];
  @Input() ioDescriptions: Map<string, string> = new Map();
  @Input() ioSignalTypes: Map<string, string> = new Map();
  /** Se valorizzato, il chart mostra solo questi tag (presi dalla lista analogTags) e nasconde la UI di selezione.
   *  Usato dalla pagina dettaglio singolo segnale per fissare il tag senza permettere rimozione/aggiunta. */
  @Input() lockedTagNames: string[] | null = null;

  selectedSignals: SelectedSignal[] = [];
  chartData: { datasets: any[]; labels: string[] } = { datasets: [], labels: [] };
  chartOptions: ChartOptions = {};
  lineChartType: ChartType = 'line';
  hasAnyData: boolean = false;

  // True se almeno un segnale è valorizzato (per attivare/disattivare la toolbar)
  get hasValidSignal(): boolean {
    return this.selectedSignals.some(s => !!s.tagName);
  }

  // Opzioni per ng-select (calcolate una sola volta quando arrivano i tag)
  signalOptions: { label: string, value: string }[] = [];

  displayRangeModel: number = 0;
  diagDateSelected: Date = new Date();
  queryStartDate: Date;
  queryEndDate: Date;
  isLoading: boolean = false;
  errorMessage: string = '';
  private initialized: boolean = false;

  // Palette colori estesa
  private readonly COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

  get diagDateForInput(): string {
    const d = this.diagDateSelected;
    if (!d) return '';
    const dd = new Date(d);
    return `${dd.getFullYear()}-${(dd.getMonth()+1).toString().padStart(2,'0')}-${dd.getDate().toString().padStart(2,'0')}`;
  }

  onDateInputChange(event: any): void {
    this.diagDateSelected = event.target.value;
    this.changeDiagDate();
  }

  displayName(tagName: string): string { return this.scaleRegistry.formatDisplayName(tagName); }

  descriptionOrName(tagName: string): string {
    if (!tagName) return '';
    const desc = this.ioDescriptions?.get(tagName);
    return desc || this.scaleRegistry.formatDisplayName(tagName);
  }

  isSelected(tagName: string): boolean { return this.selectedSignals.some(s => s.tagName === tagName); }

  getColor(tagName: string): string {
    const s = this.selectedSignals.find(x => x.tagName === tagName);
    return s ? s.color : 'transparent';
  }

  constructor(private trendService: TrendService, private scaleRegistry: IoScaleRegistry, private cdr: ChangeDetectorRef) {
    const dtNow = new Date(now());
    this.queryStartDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate(), 0, 0, 0);
    this.queryEndDate = new Date(dtNow.getFullYear(), dtNow.getMonth(), dtNow.getDate(), 23, 59, 59);
    this.diagDateSelected = dtNow;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se i tag bloccati sono cambiati (modalità singolo segnale o ritorno alla modalità libera), allinea la selezione
    if (changes['lockedTagNames']) {
      this.rebuildSignalOptions();
      if (this.isLocked) {
        this.applyLockedSelection();
      } else if (this.deviceName && this.analogTags?.length) {
        // Tornati in modalità libera: ricarica la selezione persistita
        this.loadSelection();
      }
      this.initialized = true;
    }

    if ((changes['analogTags'] || changes['deviceName']) && !this.initialized) {
      this.rebuildSignalOptions();
      // Inizializzo solo quando ho davvero deviceName + analogTags pronti, altrimenti
      // resto in attesa del prossimo ngOnChanges con dati validi
      if (this.deviceName && this.analogTags?.length) {
        if (this.isLocked) {
          this.applyLockedSelection();
        } else {
          this.loadSelection();
        }
        this.initialized = true;
      }
    }
    // Se cambiano i tag o le descrizioni, ricalcola le opzioni
    if (changes['analogTags'] || changes['ioDescriptions']) {
      this.rebuildSignalOptions();
    }
    // Quando arrivano le descrizioni, ricostruisci le label del chart
    if (changes['ioDescriptions'] && this.initialized) {
      this.rebuildChart();
      if (this.chartData.datasets.length > 0) this.onSearch();
    }
  }

  /** True se il chart è in modalità "singolo segnale fissato" (pagina dettaglio): niente UI di selezione/rimozione/aggiunta */
  get isLocked(): boolean {
    return Array.isArray(this.lockedTagNames) && this.lockedTagNames.length > 0;
  }

  /** In modalità locked: i selectedSignals sono solo i tag forzati dal padre, niente persistenza, niente righe vuote */
  private applyLockedSelection(): void {
    if (!this.isLocked) return;
    this.selectedSignals = (this.lockedTagNames || []).map((tagName, i) => ({
      tagName,
      color: this.COLORS[i % this.COLORS.length]
    }));
    this.rebuildChart();
    if (this.deviceName && this.analogTags?.length) this.onSearch();
  }

  /** Ricostruisce signalOptions a partire da analogTags + ioDescriptions */
  private rebuildSignalOptions(): void {
    this.signalOptions = (this.analogTags || []).map(t => ({
      label: this.descriptionOrName(t.name),
      value: t.name
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.chart?.chart?.resize(); });
  }

  // ========== Selezione segnali con dropdown ==========
  onSignalChange(index: number, newTagName: string): void {
    if (!newTagName) return;
    this.selectedSignals[index] = { tagName: newTagName, color: this.COLORS[index % this.COLORS.length] };
    this.saveSelection();
    this.rebuildChart();
    this.onSearch();
  }

  /** Opzioni per ng-select: descrizione come label, tagLogName come value */
  getSignalOptions(): { label: string, value: string }[] {
    return this.analogTags.map(t => ({
      label: this.descriptionOrName(t.name),
      value: t.name
    }));
  }

  /** Etichetta tipo segnale (Digitale/Analogico) dal tipo I/O (DI/DO/AI/AO) */
  getTypeLabel(tagName: string): string {
    const t = this.ioSignalTypes?.get(tagName);
    if (t === 'DI' || t === 'DO') return 'Digitale';
    if (t === 'AI' || t === 'AO') return 'Analogico';
    return '';
  }

  /** Classe CSS colore tipo: blu per digitale, viola per analogico */
  getTypeClass(tagName: string): string {
    const t = this.ioSignalTypes?.get(tagName);
    if (t === 'DI' || t === 'DO') return 'io-type-digital';
    if (t === 'AI' || t === 'AO') return 'io-type-analog';
    return '';
  }

  /** Colore tipo: stesso colore per digitale e analogico (Marco non vuole distinzione) */
  getTypeColor(tagName: string): string {
    const t = this.ioSignalTypes?.get(tagName);
    if (t === 'DI' || t === 'DO' || t === 'AI' || t === 'AO') return '#7f8cf1';
    return '#9aa5b1';
  }

  addSignal(): void {
    if (this.selectedSignals.length >= MAX_SIGNALS) return;
    // Aggiunge una riga vuota — l'utente sceglie il segnale dal dropdown
    this.selectedSignals.push({ tagName: null as any, color: this.COLORS[this.selectedSignals.length % this.COLORS.length] });
    this.rebuildChart();
  }

  removeSignal(index: number): void {
    this.selectedSignals.splice(index, 1);
    this.selectedSignals.forEach((s, i) => s.color = this.COLORS[i % this.COLORS.length]);
    this.saveSelection();
    this.rebuildChart();
    this.onSearch();
  }

  canAddSignal(): boolean { return this.selectedSignals.length < MAX_SIGNALS && this.selectedSignals.length < this.analogTags.length; }

  isUsedByOther(index: number, tagName: string): boolean {
    return this.selectedSignals.some((s, i) => i !== index && s.tagName === tagName);
  }

  // Range temporale
  changeRange(value: number) {
    this.displayRangeModel = value;
    switch (value) {
      case 0: {
        const dt = new Date(now());
        this.diagDateSelected = dt;
        this.queryStartDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);
        this.queryEndDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 23, 59, 59);
        this.onSearch(); break;
      }
      case 1: {
        const dt = new Date(now()); dt.setDate(dt.getDate() - 1);
        this.diagDateSelected = dt;
        this.queryStartDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0);
        this.queryEndDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 23, 59, 59);
        this.onSearch(); break;
      }
      case 48: this.changeDiagDate(); break;
    }
  }

  changeDiagDate() {
    const d = new Date(this.diagDateSelected);
    this.queryStartDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    this.queryEndDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
    this.onSearch();
  }

  //  Costruzione chart multi-axis 
  // Per gli storici usiamo SEMPRE l'UdM originale salvata nel DB (baseUnit),
  // NON la UserUnit che l'utente può cambiare  quella è solo per il live
  private getUnitForTag(tagName: string): string {
    if (!tagName) return '';
    // Se è un segnale digitale (DI/DO) → niente UdM
    const sigType = this.ioSignalTypes?.get(tagName);
    if (sigType === 'DI' || sigType === 'DO') return '';
    const config = this.scaleRegistry.getLinearizationConfig(tagName);
    return config ? config.baseUnit : '';
  }

  /** Label abbreviata per asse Y: descrizione troncata + UdM */
  private shortAxisLabel(tagName: string): string {
    const desc = this.descriptionOrName(tagName);
    const unit = this.getUnitForTag(tagName);
    const short = desc.length > 15 ? desc.substring(0, 15) + '..' : desc;
    return unit ? `${short} (${unit})` : short;
  }

  private rebuildChart(): void {
    // SOLO i segnali con tagName valido producono dataset+asse. Le righe vuote (placeholder) restano fuori dal grafico.
    const validSignals = this.selectedSignals.filter(s => !!s.tagName);
    if (validSignals.length === 0) {
      this.chartData = { datasets: [], labels: [] };
      this.chartOptions = {};
      // Forza pulizia del chart sottostante (ng2-charts a volte mantiene il vecchio dataset → "undefined" nella legenda)
      setTimeout(() => {
        if (this.chart?.chart) {
          (this.chart.chart as any).data.datasets = [];
          (this.chart.chart as any).data.labels = [];
          this.chart.chart.update();
        }
      }, 0);
      return;
    }

    // 1 asse dedicato per ogni segnale valido — tutti uguali, nessuna gerarchia
    const yAxes = validSignals.map((sig, i) => {
      const scaleOverride = this.scaleRegistry.getChartScale(sig.tagName);
      const isCustom = scaleOverride && scaleOverride.mode === 'custom';
      const ticks: any = {
        maxTicksLimit: 3,
        fontSize: 8,
        fontColor: sig.color,
        padding: 2
      };
      if (isCustom) {
        ticks.min = scaleOverride.min;
        ticks.max = scaleOverride.max;
      } else {
        ticks.beginAtZero = true;
        ticks.suggestedMin = 0;
      }
      return {
        id: `y${i}`,
        position: i % 2 === 0 ? 'left' : 'right',
        offset: true,
        ticks,
        gridLines: {
          drawOnChartArea: i === 0,
          color: i === 0 ? 'rgba(0,0,0,0.04)' : 'transparent',
          drawTicks: true, tickMarkLength: 2
        },
        scaleLabel: {
          display: true,
          labelString: this.getUnitForTag(sig.tagName),
          fontColor: sig.color, fontSize: 8
        }
      };
    });

    // Costruisci datasets SOLO per i segnali validi
    const datasets = validSignals.map((sig, i) => {
      const sigType = this.ioSignalTypes?.get(sig.tagName);
      const isDigital = sigType === 'DI' || sigType === 'DO';
      return {
        label: this.descriptionOrName(sig.tagName), data: [],
        borderColor: sig.color, backgroundColor: sig.color + '15',
        pointBackgroundColor: sig.color, pointBorderColor: sig.color,
        borderWidth: 2, pointRadius: 1.5, pointHoverRadius: 4,
        // I digitali sono ON/OFF: transizione a gradino, niente curva.
        // Gli analogici mantengono una curva leggera.
        tension: isDigital ? 0 : 0.3,
        steppedLine: isDigital ? 'before' : false,
        fill: false, spanGaps: true,
        yAxisID: `y${i}`
      };
    });

    this.chartData = { datasets, labels: [] };
    this.chartOptions = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 300 },
      layout: { padding: { left: 4, right: 4, top: 6, bottom: 28 } },
      scales: {
        xAxes: [{ ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 6, fontSize: 10, fontColor: '#666', padding: 10 }, gridLines: { color: 'rgba(0,0,0,0.06)' } }],
        yAxes: yAxes
      },
      legend: { display: true, position: 'bottom', labels: { boxWidth: 10, fontSize: 9, fontColor: '#555', padding: 6, usePointStyle: true } },
      tooltips: {
        mode: 'index', intersect: false, backgroundColor: 'rgba(0,0,0,0.85)', titleFontSize: 10, bodyFontSize: 10,
        callbacks: {
          label: (t: any, d: any) => {
            const label = d.datasets[t.datasetIndex].label || '';
            const sig = validSignals[t.datasetIndex];
            const unit = sig ? this.getUnitForTag(sig.tagName) : '';
            return unit ? `${label}: ${t.yLabel} ${unit}` : `${label}: ${t.yLabel}`;
          }
        }
      }
    };
  }

  // Ricerca dati storici
  async onSearch(): Promise<void> {
    // Considera solo i segnali con tagName valorizzato (le righe vuote — placeholder — non vanno in query)
    const validSignals = this.selectedSignals.filter(s => !!s.tagName);
    if (validSignals.length === 0) {
      this.chartData.labels = [];
      this.chartData.datasets.forEach(ds => ds.data = []);
      this.hasAnyData = false;
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const query = new TrendQueryModel();
      query.tagLogNameList = validSignals.map(s => s.tagName);
      query.startDate = this.queryStartDate;
      query.endDate = this.queryEndDate;
      query.zoneFilterList = []; query.deviceFilterList = []; query.plcFilterList = [];

      const results: TrendLogModel[] = await this.trendService.GetLogging(query);

      // Raggruppa per tagLogName
      const grouped = new Map<string, TrendLogModel[]>();
      if (results?.length) {
        for (const log of results) {
          if (!grouped.has(log.tagLogName)) grouped.set(log.tagLogName, []);
          grouped.get(log.tagLogName)!.push(log);
        }
        for (const [, logs] of grouped) logs.sort((a, b) => new Date(a.logDate).getTime() - new Date(b.logDate).getTime());
      }

      // Usa le labels del primo segnale che ha dati
      let labels: string[] = [];
      for (const sig of this.selectedSignals) {
        const logs = grouped.get(sig.tagName);
        if (logs?.length && logs.length > labels.length) {
          labels = logs.map(l => {
            const d = new Date(l.logDate);
            return `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
          });
        }
      }

      this.chartData.labels = labels;
      this.hasAnyData = false;

      // I datasets sono allineati a validSignals (gli unici con tagName valorizzato)
      validSignals.forEach((sig, i) => {
        const logs = grouped.get(sig.tagName);
        const data = logs ? logs.map(l => l.logValue) : [];
        if (data.length > 0) this.hasAnyData = true;
        if (this.chartData.datasets[i]) {
          this.chartData.datasets[i] = { ...this.chartData.datasets[i], data, label: this.descriptionOrName(sig.tagName) };
        }
      });

      this.cdr.detectChanges();
      setTimeout(() => { this.chart?.chart?.resize(); this.chart?.update(); }, 50);

    } catch (errorOnSearch) {
      const requestedSignals = validSignals.map(s => s.tagName);
      console.error('[IoCustomHistoricalChart] onSearch — Errore caricamento dati storici', {
        device: this.deviceName,
        rangeStart: this.queryStartDate,
        rangeEnd: this.queryEndDate,
        requestedSignals,
        error: errorOnSearch
      });
      const backendMessage = (errorOnSearch as any)?.error?.error
        || (errorOnSearch as any)?.message
        || 'Errore sconosciuto';
      this.errorMessage = 'Errore durante il caricamento dei dati storici: ' + backendMessage;
    } finally { this.isLoading = false; }
  }

  exportCSV(): void {
    if (!this.hasAnyData) return;
    const bom = '\uFEFF';
    const header = 'Segnale;Descrizione;Data;Valore;UdM';
    const rows: string[] = [];
    this.selectedSignals.forEach((sig, i) => {
      const name = this.displayName(sig.tagName);
      const desc = this.descriptionOrName(sig.tagName);
      const unit = this.getUnitForTag(sig.tagName);
      const data = this.chartData.datasets[i]?.data || [];
      const labels = this.chartData.labels || [];
      for (let j = 0; j < data.length; j++) {
        rows.push(`${name};${desc};${labels[j] || ''};${data[j]};${unit}`);
      }
    });
    const n = new Date();
    const ts = `${n.getFullYear()}-${(n.getMonth()+1).toString().padStart(2,'0')}-${n.getDate().toString().padStart(2,'0')}_${n.getHours().toString().padStart(2,'0')}-${n.getMinutes().toString().padStart(2,'0')}`;
    const alias = this.deviceAlias || this.deviceName;
    const content = bom + header + '\n' + rows.join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${alias}_storici_${ts}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  
  private getStorageKey(): string { return `${STORAGE_KEY_PREFIX}${this.deviceName}`; }

  private loadSelection(): void {
    if (!this.deviceName || !this.analogTags?.length) return;
    try {
      const raw = localStorage.getItem(this.getStorageKey());
      if (raw) {
        const stored: string[] = JSON.parse(raw);
        if (stored?.length) {
          const available = new Set(this.analogTags.map(t => t.name));
          const valid = stored.filter(n => available.has(n)).slice(0, MAX_SIGNALS);
          if (valid.length > 0) {
            this.selectedSignals = valid.map((tagName, i) => ({ tagName, color: this.COLORS[i % this.COLORS.length] }));
            this.rebuildChart();
            this.onSearch();
            return;
          }
        }
      }
    } catch (errorReadingStorage) {
      console.error('[IoCustomHistoricalChart] loadSelection — Errore lettura localStorage chiave=' + this.getStorageKey(), errorReadingStorage);
    }

    this.selectedSignals = [{ tagName: null as any, color: this.COLORS[0] }];
    this.rebuildChart();
  }

  private saveSelection(): void {
    try {
      // Salva solo i segnali con tagName valorizzato
      const tags = this.selectedSignals.map(s => s.tagName).filter(t => !!t);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(tags));
    } catch (errorWritingStorage) {
      console.error('[IoCustomHistoricalChart] saveSelection — Errore scrittura localStorage chiave=' + this.getStorageKey(), errorWritingStorage);
    }
  }
}
