import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { TagsClient, VAR_TYPE_Enum } from '../../tags/tags-client';
import { IoScaleRegistry } from '../shared/io-scale-registry.service';

// Numero massimo di segnali visualizzabili contemporaneamente nel grafico live
const MAX_SIGNALS = 10;
// Chiave localStorage per persistere la selezione segnali tra sessioni
const STORAGE_KEY_PREFIX = 'io-custom-live-signals-v2-';

interface SelectedSignal { tagName: string; color: string; }

@Component({
  selector: 'io-custom-live-chart',
  templateUrl: './io-custom-live-chart.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss',
    './io-custom-live-chart.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class IoCustomLiveChartComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  @Input() deviceName: string = '';
  @Input() analogTags: TagsClient[] = [];
  @Input() userUnitsVersion: number = 0;
  @Input() ioDescriptions: Map<string, string> = new Map();
  @Input() ioSignalTypes: Map<string, string> = new Map();
  /** Se valorizzato, il chart mostra solo questi tag e nasconde la UI di selezione.
   *  Usato dalla pagina dettaglio singolo segnale per fissare il tag senza permettere rimozione/aggiunta. */
  @Input() lockedTagNames: string[] | null = null;

  selectedSignals: SelectedSignal[] = [];
  currentValues: number[] = [];
  chartData: { datasets: any[]; labels: string[] } = { datasets: [], labels: [] };
  chartOptions: ChartOptions = {};
  lineChartType: ChartType = 'line';
  isPaused: boolean = false;

  // True se almeno un segnale è valorizzato (per attivare/disattivare la toolbar)
  get hasValidSignal(): boolean {
    return this.selectedSignals.some(s => !!s.tagName);
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
    this.currentValues = this.selectedSignals.map(() => 0);
    this.rebuildChart();
  }

  // Opzioni per ng-select (calcolate una sola volta quando arrivano i tag)
  signalOptions: { label: string, value: string }[] = [];

  timeWindow: number = 3;
  updateInterval: number = 3;
  maxDataPoints: number = 60;

  // Opzioni per ng-select toolbar (label visibile + value)
  timeWindowOptions = [
    { label: '1 min', value: 1 },
    { label: '3 min', value: 3 },
    { label: '5 min', value: 5 },
    { label: '10 min', value: 10 }
  ];
  updateIntervalOptions = [
    { label: '1 sec', value: 1 },
    { label: '3 sec', value: 3 },
    { label: '5 sec', value: 5 },
    { label: '10 sec', value: 10 }
  ];

  private pollingTimer: any = null;
  private scaleSub: Subscription;

  private readonly COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

  chartPlugins = [{
    beforeUpdate: (chart: any) => {
      const width = chart.width || 0;
      const xAxis = chart.options?.scales?.xAxes?.[0]?.ticks;
      if (xAxis) { xAxis.maxTicksLimit = width < 300 ? 3 : width < 450 ? 5 : 7; }
    }
  }];

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

  getUnitForTag(tagName: string): string {
    if (!tagName) return '';
    // Se è un segnale digitale (DI/DO) → niente UdM
    const sigType = this.ioSignalTypes?.get(tagName);
    if (sigType === 'DI' || sigType === 'DO') return '';
    const override = this.scaleRegistry.getUserUnitOverride(tagName);
    if (override) return override.userUnit;
    const config = this.scaleRegistry.getLinearizationConfig(tagName);
    return config ? config.baseUnit : '';
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

  constructor(private scaleRegistry: IoScaleRegistry) {}

  ngOnInit(): void {
    this.maxDataPoints = Math.floor((this.timeWindow * 60) / this.updateInterval);
    if (this.isLocked) {
      this.applyLockedSelection();
    } else {
      this.loadSelection();
    }
    this.startTimer();
    this.scaleSub = this.scaleRegistry.onChartScaleChanged.subscribe(() => this.applyScaleOverrides());
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se cambia il flag di "tag forzato" applica la selezione giusta (locked → singolo, non locked → riprendo da localStorage)
    if (changes['lockedTagNames']) {
      this.rebuildSignalOptions();
      if (this.isLocked) {
        this.applyLockedSelection();
      } else {
        // Modalità libera: ricarica selezione persistita / riga vuota
        this.loadSelection();
      }
    }

    if (changes['analogTags'] || changes['deviceName']) {
      // Evita rebuild inutili se i tag non sono cambiati davvero
      const prev = changes['analogTags']?.previousValue as any[] || [];
      const curr = changes['analogTags']?.currentValue as any[] || [];
      const tagsChanged = !changes['analogTags'] || prev.length !== curr.length ||
        prev.some((t: any, i: number) => t?.name !== curr[i]?.name);
      if (changes['deviceName'] || tagsChanged) {
        this.rebuildSignalOptions();
        if (this.isLocked) {
          this.applyLockedSelection();
        } else {
          this.loadSelection();
        }
      }
    } else if (changes['userUnitsVersion']) {
      this.rebuildChart();
    }
    if (changes['ioDescriptions']) {
      this.rebuildSignalOptions();
      if (this.selectedSignals.length > 0) {
        this.rebuildChart();
      }
    }
  }

  /** Ricostruisce signalOptions a partire da analogTags + ioDescriptions */
  private rebuildSignalOptions(): void {
    this.signalOptions = (this.analogTags || []).map(t => ({
      label: this.descriptionOrName(t.name),
      value: t.name
    }));
  }

  ngOnDestroy(): void { this.stopTimer(); if (this.scaleSub) this.scaleSub.unsubscribe(); }

  // Selezione segnali
  onSignalChange(index: number, newTagName: string): void {
    if (!newTagName) return;
    this.selectedSignals[index] = { tagName: newTagName, color: this.COLORS[index % this.COLORS.length] };
    this.currentValues[index] = 0;
    this.saveSelection();
    this.rebuildChart();
  }

  addSignal(): void {
    if (this.selectedSignals.length >= MAX_SIGNALS) return;
    // Aggiunge una riga vuota — l'utente sceglie il segnale dal dropdown
    this.selectedSignals.push({ tagName: null as any, color: this.COLORS[this.selectedSignals.length % this.COLORS.length] });
    this.currentValues.push(0);
    this.rebuildChart();
  }

  removeSignal(index: number): void {
    this.selectedSignals.splice(index, 1);
    this.currentValues.splice(index, 1);
    this.selectedSignals.forEach((s, i) => s.color = this.COLORS[i % this.COLORS.length]);
    this.saveSelection();
    this.rebuildChart();
  }

  canAddSignal(): boolean { return this.selectedSignals.length < MAX_SIGNALS && this.selectedSignals.length < this.analogTags.length; }

  isUsedByOther(index: number, tagName: string): boolean {
    return this.selectedSignals.some((s, i) => i !== index && s.tagName === tagName);
  }

  // Controlli
  onTimeWindowChange(): void { this.maxDataPoints = Math.floor((this.timeWindow * 60) / this.updateInterval); }
  onIntervalChange(): void { this.maxDataPoints = Math.floor((this.timeWindow * 60) / this.updateInterval); this.startTimer(); }

  // Handler per ng-select [ngModel] one-way: setta esplicitamente la variabile e ricalcola
  onTimeWindowSelect(opt: any): void {
    if (opt && typeof opt.value === 'number') {
      this.timeWindow = opt.value;
      this.onTimeWindowChange();
    }
  }
  onUpdateIntervalSelect(opt: any): void {
    if (opt && typeof opt.value === 'number') {
      this.updateInterval = opt.value;
      this.onIntervalChange();
    }
  }
  togglePause(): void { this.isPaused = !this.isPaused; }

  resetChart(): void {
    this.chartData.labels = [];
    this.chartData.datasets.forEach(ds => ds.data = []);
    this.currentValues = this.selectedSignals.map(() => 0);
    this.chart?.update();
  }

  // Timer e polling
  private startTimer(): void {
    this.stopTimer();
    // Primo poll immediato (così il valore live arriva subito senza aspettare l'intervallo)
    setTimeout(() => this.pollSignalR(), 0);
    this.pollingTimer = setInterval(() => this.pollSignalR(), this.updateInterval * 1000);
  }

  private stopTimer(): void {
    if (this.pollingTimer != null) { clearInterval(this.pollingTimer); this.pollingTimer = null; }
  }

  private pollSignalR(): void {
    if (this.isPaused || this.selectedSignals.length === 0) return;
    // Solo i segnali con tagName valido vengono pushati nel grafico (i datasets sono allineati a validSignals)
    const validSignals = this.selectedSignals.filter(s => !!s.tagName);
    if (validSignals.length === 0) return;

    const now = new Date();
    const timeLabel = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    this.chartData.labels.push(timeLabel);

    // Map: indice nel selectedSignals → indice nel validSignals (per aggiornare currentValues coerentemente)
    let validIdx = 0;
    this.selectedSignals.forEach((sig, i) => {
      if (!sig.tagName) {
        this.currentValues[i] = 0;
        return;
      }
      const tag = this.analogTags.find(t => t.name === sig.tagName);
      const rawValue = tag ? (Number(tag.actValue) || 0) : 0;
      const linearized = this.scaleRegistry.linearizeTag(sig.tagName, rawValue);
      const override = this.scaleRegistry.getUserUnitOverride(sig.tagName);
      const factor = (override && override.factor > 0) ? override.factor : 1;
      const displayValue = Math.round(linearized * factor * 100) / 100;

      this.currentValues[i] = displayValue;
      if (this.chartData.datasets[validIdx]) {
        this.chartData.datasets[validIdx].data.push(displayValue);
      }
      validIdx++;
    });

    while (this.chartData.labels.length > this.maxDataPoints) {
      this.chartData.labels.shift();
      this.chartData.datasets.forEach(ds => ds.data.shift());
    }

    this.chart?.update();
  }

  // Costruzione chart: 1 asse Y per segnale, alternati left/right
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

    // 1 asse Y per segnale valido, griglia solo sul primo
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

    const datasets = validSignals.map((sig, i) => {
      const sigType = this.ioSignalTypes?.get(sig.tagName);
      const isDigital = sigType === 'DI' || sigType === 'DO';
      return {
        label: this.descriptionOrName(sig.tagName), data: [],
        borderColor: sig.color, backgroundColor: sig.color + '15',
        pointBackgroundColor: sig.color, pointBorderColor: sig.color,
        borderWidth: 2, pointRadius: 0, pointHoverRadius: 4,
        // I digitali sono ON/OFF: transizione a gradino, niente curva.
        tension: isDigital ? 0 : 0.3,
        steppedLine: isDigital ? 'before' : false,
        fill: false,
        yAxisID: `y${i}`
      };
    });

    this.chartData = { datasets, labels: [] };
    this.currentValues = this.selectedSignals.map(() => 0);

    this.chartOptions = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 300 },
      layout: { padding: { left: 4, right: 4, top: 6, bottom: 4 } },
      scales: {
        xAxes: [{ ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 7, fontSize: 10, fontColor: '#666', padding: 4 }, gridLines: { color: 'rgba(0,0,0,0.06)' } }],
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

  // Aggiorna assi Y dal registry senza ricreare i datasets
  private applyScaleOverrides(): void {
    if (!this.chart?.chart || this.selectedSignals.length === 0) return;

    // Gli assi yAxes sono allineati a validSignals (non a selectedSignals)
    const validSignals = this.selectedSignals.filter(s => !!s.tagName);
    if (validSignals.length === 0) return;

    const yAxes = (this.chart.chart as any).options?.scales?.yAxes;
    if (!yAxes) return;

    validSignals.forEach((sig, i) => {
      if (!yAxes[i]) return;
      const scaleOverride = this.scaleRegistry.getChartScale(sig.tagName);
      const isCustom = scaleOverride && scaleOverride.mode === 'custom';

      if (isCustom) {
        yAxes[i].ticks.min = scaleOverride.min;
        yAxes[i].ticks.max = scaleOverride.max;
        delete yAxes[i].ticks.beginAtZero;
        delete yAxes[i].ticks.suggestedMin;
      } else {
        delete yAxes[i].ticks.min;
        delete yAxes[i].ticks.max;
        yAxes[i].ticks.beginAtZero = true;
        yAxes[i].ticks.suggestedMin = 0;
      }
    });

  // Aggiorna anche chartOptions per coerenza
    if (this.chartOptions?.scales?.yAxes) {
      validSignals.forEach((sig, i) => {
        if (!this.chartOptions.scales.yAxes[i]) return;
        const scaleOverride = this.scaleRegistry.getChartScale(sig.tagName);
        const isCustom = scaleOverride && scaleOverride.mode === 'custom';
        const ticks = this.chartOptions.scales.yAxes[i].ticks as any;
        if (isCustom) {
          ticks.min = scaleOverride.min;
          ticks.max = scaleOverride.max;
          delete ticks.beginAtZero;
          delete ticks.suggestedMin;
        } else {
          delete ticks.min;
          delete ticks.max;
          ticks.beginAtZero = true;
          ticks.suggestedMin = 0;
        }
      });
    }

    this.chart.chart.update();
  }

  // Export
  exportCSV(): void {
    if (!this.chartData.labels.length) return;
    const n = new Date();
    const ts = `${n.getFullYear()}-${(n.getMonth()+1).toString().padStart(2,'0')}-${n.getDate().toString().padStart(2,'0')}_${n.getHours().toString().padStart(2,'0')}-${n.getMinutes().toString().padStart(2,'0')}`;
    const bom = '\uFEFF';
    const header = 'Timestamp;Segnale;Descrizione;Valore;UdM';
    const rows: string[] = [];
    this.selectedSignals.forEach((sig, i) => {
      const name = this.displayName(sig.tagName);
      const desc = this.descriptionOrName(sig.tagName);
      const unit = this.getUnitForTag(sig.tagName);
      const data = this.chartData.datasets[i]?.data || [];
      for (let j = 0; j < this.chartData.labels.length; j++) {
        rows.push(`${this.chartData.labels[j]};${name};${desc};${data[j] ?? ''};${unit}`);
      }
    });
    const content = bom + header + '\n' + rows.join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `IO_live_${this.deviceName}_${ts}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  exportPNG(): void {
    if (this.chart?.chart) {
      const n = new Date();
      const ts = `${n.getFullYear()}-${(n.getMonth()+1).toString().padStart(2,'0')}-${n.getDate().toString().padStart(2,'0')}_${n.getHours().toString().padStart(2,'0')}-${n.getMinutes().toString().padStart(2,'0')}`;
      const link = document.createElement('a');
      link.download = `IO_live_${this.deviceName}_${ts}.png`;
      link.href = this.chart.chart.toBase64Image();
      link.click();
    }
  }

  // Persistenza selezione
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
            this.currentValues = valid.map(() => 0);
            this.rebuildChart();
            return;
          }
        }
      }
    } catch (errorReadingStorage) {
      console.error('[IoCustomLiveChart] loadSelection — Errore lettura localStorage chiave=' + this.getStorageKey(), errorReadingStorage);
      // Storage corrotto: lo ripulisco così la prossima volta riparte pulito
      localStorage.removeItem(this.getStorageKey());
    }
    // Default: una riga vuota — l'utente sceglie il segnale dal dropdown
    this.selectedSignals = [{ tagName: null as any, color: this.COLORS[0] }];
    this.currentValues = [0];
    this.rebuildChart();
  }

  private saveSelection(): void {
    try {
      // Salva solo i segnali con tagName valorizzato
      const tags = this.selectedSignals.map(s => s.tagName).filter(t => !!t);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(tags));
    } catch (errorWritingStorage) {
      console.error('[IoCustomLiveChart] saveSelection — Errore scrittura localStorage chiave=' + this.getStorageKey(), errorWritingStorage);
    }
  }
}