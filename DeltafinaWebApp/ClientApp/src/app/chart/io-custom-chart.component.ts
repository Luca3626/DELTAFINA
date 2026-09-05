import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../../app.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsClient, VAR_TYPE_Enum } from '../../tags/tags-client';
import { IoScaleRegistry } from '../shared/io-scale-registry.service';
import { DevicesService } from '../../services/devices.service';
import { BlockService } from '../../services/block.service';
import { IoSignalsService } from '../../services/io-signals.service';
import { HttpClient } from '@angular/common/http';

/**
 * Pagina "Personalizza Grafico" — grafico multiasse con selezione segnali da tutti i PLC.
 * Riusa i componenti io-historical-chart e io-live-chart già esistenti.
 */
@Component({
  selector: 'io-custom-chart',
  templateUrl: './io-custom-chart.component.html',
  styleUrls: ['./io-custom-chart.component.scss']
})
export class IoCustomChartComponent implements OnInit, OnDestroy, OnChanges {

  /** Se valorizzato, il componente fissa solo questo tag e nasconde la UI di selezione (usato dalla pagina dettaglio) */
  @Input() forcedTagName: string | null = null;

  // Tutti i tag analogici disponibili (da tutti i PLC)
  allAnalogTags: TagsClient[] = [];
  // Tag con normalizzazione attiva (visibili nel grafico live)
  analogTags: TagsClient[] = [];
  // Descrizioni per i tag
  ioDescriptions: Map<string, string> = new Map();
  // Mappa SignalType per ogni tagLogName ('AI'/'AO'/'DI'/'DO') — letta dalla tabella TagsToSave
  ioSignalTypes: Map<string, string> = new Map();
  // Versione per triggerare aggiornamento child
  userUnitsVersion: number = 0;

  isLoading: boolean = true;
  private refreshInterval: any;

  /** Tag forzato come array (per passarlo ai child come lockedTagNames) */
  get lockedTagNames(): string[] | null {
    return this.forcedTagName ? [this.forcedTagName] : null;
  }

  constructor(
    private appService: AppService,
    private devicesService: DevicesService,
    private blockService: BlockService,
    private ioSignalsService: IoSignalsService,
    private scaleRegistry: IoScaleRegistry,
    private http: HttpClient
  ) {
    this.appService.pageTitle = 'Personalizza Grafico';
  }

  async ngOnInit() {
    await this.loadAllAnalogSignals();
    this.refreshInterval = setInterval(() => this.refreshTags(), 1000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  }

  ngOnChanges(changes: SimpleChanges) {
    
    if (changes['forcedTagName'] && !changes['forcedTagName'].firstChange) {
      this.refreshTags();
    }
  }

  private async loadAllAnalogSignals() {
    this.isLoading = true;
    try {
      const portalFarmId = this.appService.portalFarm?.id;
      if (!portalFarmId) return;

      // Carica tutti i dispositivi I/O (PLC) abilitati
      const allDevices = await this.devicesService.getList(portalFarmId);
      const ioDevices = allDevices.filter(d =>
        (d.deviceType === 'IODevice' || d.deviceType === 'IO' || d.deviceType === 'IOGateway' || d.deviceType === 'PLC')
        && d.isEnabled
      );

      // Per ogni PLC, carica blocchi + normalizzazioni
      for (const device of ioDevices) {
        try {
          const blocks = await this.blockService.getTagsForIoDevice(device.id);
          for (const block of blocks) {
            if (block.variables && block.variables.length > 0) {
              const v = block.variables[0];
              if (v.tagLogName && v.description) {
                this.ioDescriptions.set(v.tagLogName, v.description);
              }
            }
          }

          // Carica normalizzazioni
          const normConfigs = await this.blockService.getNormalizationsForDevice(device.id);
          for (const nc of normConfigs) {
            const matchingBlock = blocks.find(b => b.variables && b.variables.length > 0 && b.variables[0].tagLogName === nc.tagLogName);
            if (matchingBlock) {
              nc.unit = matchingBlock.variables[0].unit || matchingBlock.unit || '';
            }
          }
          this.scaleRegistry.setLinearizationConfigs(normConfigs);
        } catch (err) {
          console.warn('[IoCustomChart] Errore caricamento device ' + device.name + ':', err);
        }
      }

      // Carica UserUnit overrides
      try {
        const list = await this.http.get<any[]>('/api/tags/descriptions').toPromise();
        if (list && Array.isArray(list)) {
          const overrides = new Map<string, any>();
          for (const item of list) {
            const hasOverride = item.userUnit || (item.userUnitConverterFactor && item.userUnitConverterFactor !== 1);
            if (hasOverride) {
              overrides.set(item.tagLogName, {
                userUnit: item.userUnit || item.unit || '',
                factor: item.userUnitConverterFactor || 1
              });
            }
          }
          this.scaleRegistry.setUserUnitOverrides(overrides);
          this.userUnitsVersion++;
        }
      } catch (err) {
        console.warn('[IoCustomChart] Errore caricamento override UdM:', err);
      }

      // Carica SignalType (AI/AO/DI/DO) da TagsToSave per riconoscere correttamente analogici vs digitali
      try {
        const [aiList, diList] = await Promise.all([
          this.ioSignalsService.getList('AI'),
          this.ioSignalsService.getList('DI')
        ]);
        for (const s of (aiList || [])) {
          if (s.tagLogName) this.ioSignalTypes.set(s.tagLogName, s.signalType || 'AI');
        }
        for (const s of (diList || [])) {
          if (s.tagLogName) this.ioSignalTypes.set(s.tagLogName, s.signalType || 'DI');
        }
        
        this.ioSignalTypes = new Map(this.ioSignalTypes);
      } catch (err) {
        console.warn('[IoCustomChart] Errore caricamento SignalType:', err);
      }

      // Aggiorna i tag
      this.refreshTags();
      this.ioDescriptions = new Map(this.ioDescriptions);
    } catch (err) {
      console.error('[IoCustomChart] Errore:', err);
    } finally {
      this.isLoading = false;
    }
  }

  private refreshTags() {
    // Solo i tag dei dispositivi I/O (PLC1, PLC2) — NON i multimetri
    const ioTagNames = new Set(this.ioDescriptions.keys());

    // Per il grafico STORICO + LIVE: digitali (DI/DO) + analogici (AI/AO) linearizzati
    // Riconosciamo il tipo dal campo SignalType della tabella TagsToSave (NON da VAR_TYPE_Enum.BIT
    // che è il tipo della variabile PLC, non  affidabile per dire "è digitale").
    const ioTags = SignalRService.tagList.list.filter(t =>
      ioTagNames.has(t.name)
      // Escludi tag interni di header/diagnostica (non sono segnali I/O reali)
      && !t.name.includes('N_Multimetri_Presenti')
    );

    const filteredTags = ioTags.filter(t => {
      const sigType = this.ioSignalTypes.get(t.name);
      // Digitali (DI / DO) — sempre inclusi, niente UdM
      if (sigType === 'DI' || sigType === 'DO') return true;
      // Analogici (AI / AO) — solo se hanno la normalizzazione configurata
      if (sigType === 'AI' || sigType === 'AO') {
        return this.scaleRegistry.getLinearizationConfig(t.name) != null;
      }
      // Fallback: SignalType assente nel DB  uso il tipo PLC
      if (t.type === VAR_TYPE_Enum.BIT) return true;
      return this.scaleRegistry.getLinearizationConfig(t.name) != null;
    });

    this.allAnalogTags = filteredTags;
    this.analogTags = filteredTags;
  }
}
