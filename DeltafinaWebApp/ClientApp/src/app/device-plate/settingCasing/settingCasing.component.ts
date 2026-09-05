import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { TagsList } from '../../tags/tags-list';
import { SignalRService } from '../../signalr-client/signalr.service';
import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SiloList } from '../../models/device/silo-list.models';
import { TagsClient } from '../../tags/tags-client';
import { SettingRow, SettingGroup, SettingArea, SETUP_AREAS } from '../../settings/setup-settings';

// Righe delle tabelle del popup Casing Tanks. Il tag si indica per nome e non per
// riferimento perche' la TagsList esiste solo dopo che SignalRService l'ha costruita:
// e' la stessa scelta delle righe di setup-settings.

// Valore numerico scrivibile (setpoint, preset): code = sigla sullo scambio dati.
interface ValueRow {
  code: string;
  tag: string;
  text: string;
  unit: string;
}

// Temporizzatore: il preset sta sul DB186 (tcp) e il conteggio residuo sul DB189
// (tcc) allo stesso indice, quindi per trovarli entrambi basta l'indice.
interface TimerRow {
  index: number;
  text: string;
}

// Totalizzatore di un misuratore di portata: un REAL spalmato su due word
// consecutive del DB190, la prima e' la parte alta.
interface TotalizerRow {
  code: string;
  tagHigh: string;
  tagLow: string;
  text: string;
}

@Component({
  selector: 'settingCasing',
  templateUrl: './settingCasing.component.html',
  styleUrls: ['settingCasing.css'],
})

export class SettingCasingComponent implements OnInit {

  // #region SILOS FILL - tipo di riempimento (DB190: V310 globale, V1111..V1114 per silo)
  // Valori scelti nelle combobox, scritti sul PLC dai pulsanti di conferma.
  newFillTypeGlobal: number;
  newFillType: number[] = [];   // indicizzato come siloList.silos (S1..S4)
  // #endregion

  // #region CASING TANKS - righe delle tabelle del popup

  // I bit di comando del DB120 non si ridichiarano qui: stanno gia' nella lista condivisa di
  // setup-settings, che li mostra anche nella pagina Parametri. Il popup riusa quei
  // gruppi, cosi' le due viste comandano per forza gli stessi bit. Li prendo una volta
  // sola all'apertura invece che a ogni giro di change detection: la lista e' statica.
  gruppoDosaggioAcqua: SettingGroup;   // C2011..C2015
  gruppoMandataTank: SettingGroup;     // C2021..C2024
  gruppoLoopPompe: SettingGroup;       // C2031, C2041, C2051
  gruppoCasingUgelli: SettingGroup;    // elettrovalvole casing agli ugelli (DB120.dbx6.3..6.5)
  logPrefixCasing: string = "Casing";

  // Setpoint acqua nei tank (DB123 - INT FROM_HMI).
  readonly CASING_H2O_SETPOINTS: ValueRow[] = [
    { code: "V321", tag: "FROM_HMIBTC1_H2O_SP", text: "Burley Casing Tank #1", unit: "kg" },
    { code: "V322", tag: "FROM_HMIBTC2_H2O_SP", text: "Burley Casing Tank #2", unit: "kg" },
    { code: "V323", tag: "FROM_HMICAT3_H2O_SP", text: "Casing Tank #3", unit: "kg" },
    { code: "V324", tag: "FROM_HMICAT4_H2O_SP", text: "Casing Tank #4", unit: "kg" },
    { code: "V325", tag: "FROM_HMIBTFT5_H2O_SP", text: "Top Flavoring Tank #5", unit: "kg" }
  ];
  newH2OSetpoint: number[] = [];   // indicizzato come CASING_H2O_SETPOINTS

  // Finecorsa delle valvole selettrici tank -> pompa (DB121 - TO_HMI): sola lettura.
  // I nomi dei tank seguono quelli gia' usati in setup-settings e sul sinottico
  // (Casing Tank #3 e #4), non la descrizione dello scambio dati che li chiama Burley.
  readonly CASING_SELECTOR_LS: SettingRow[] = [
    { code: "X0291", tag: "PLC_BCT1_T1_P1_LS", text: "Burley Casing Tank #1: valvola selettrice", on: "APERTA", off: "CHIUSA" },
    { code: "X0292", tag: "PLC_BCT2_T2_P1_LS", text: "Burley Casing Tank #2: valvola selettrice", on: "APERTA", off: "CHIUSA" },
    { code: "X0293", tag: "PLC_CAT3_T3_P2_LS", text: "Casing Tank #3: valvola selettrice", on: "APERTA", off: "CHIUSA" },
    { code: "X0294", tag: "PLC_CAT4_T4_P2_LS", text: "Casing Tank #4: valvola selettrice", on: "APERTA", off: "CHIUSA" }
  ];

  // Finecorsa delle valvole sugli ugelli dei cilindri (DB121 - TO_HMI): sola lettura.
  // Per X0327 lo scambio dati non riporta nessuna descrizione: resta il solo nome del
  // segnale finche' non arriva quella buona.
  readonly CASING_NOZZLE_LS: SettingRow[] = [
    { code: "X0274", tag: "PLC_CAC_Casng_LS", text: "Casing Cylinder: valvola casing all'ugello", on: "APERTA", off: "CHIUSA" },
    { code: "X0275", tag: "PLC_CAC_Stm_LS", text: "Casing Cylinder: valvola vapore all'ugello", on: "APERTA", off: "CHIUSA" },
    { code: "X0289", tag: "PLC_BCAC_Casng_LS", text: "Burley Cylinder: valvola casing all'ugello", on: "APERTA", off: "CHIUSA" },
    { code: "X0290", tag: "PLC_BCAC_Stm_LS", text: "Burley Cylinder: valvola vapore all'ugello", on: "APERTA", off: "CHIUSA" },
    { code: "X0321", tag: "PLC_BTFC_Casng_LS", text: "Top Flavor Cylinder: valvola casing all'ugello", on: "APERTA", off: "CHIUSA" },
    { code: "X0327", tag: "PLC_BTFC_Flow_LS", text: "Top Flavor Cylinder: BTFC_Flow_LS", on: "ATTIVO", off: "NON ATTIVO" }
  ];

  // Temporizzatori: preset sul DB186 (tcp) e conteggio residuo sul DB189 (tcc).
  readonly CASING_TIMERS: TimerRow[] = [
    { index: 36, text: "Apertura valvola casing BCAC" },
    { index: 37, text: "Chiusura valvola di atomizzazione BCAC" },
    { index: 38, text: "Avvio pompa acqua BDCC (B20)" },
    { index: 39, text: "Arresto pompa acqua BDCC (B20)" },
    { index: 40, text: "Avvio pompa acqua VDCC (V18)" },
    { index: 43, text: "Arresto pompa acqua VDCC (V18)" },
    { index: 44, text: "Avvio pompa acqua BOC (B30)" },
    { index: 45, text: "Arresto pompa acqua BOC (B30)" },
    { index: 50, text: "Avvio pompa acqua VOC (V25)" },
    { index: 60, text: "Arresto pompa acqua VOC (V25)" }
  ];
  newTimerPreset: number[] = [];   // indicizzato come CASING_TIMERS

  // Totalizzatori dei misuratori di portata delle pompe casing (DB190).
  readonly CASING_TOTALIZERS: TotalizerRow[] = [
    { code: "V336", tagHigh: "VAR_V336", tagLow: "VAR_V337", text: "Casing Pompa P1 (Burley Casing Pump)" },
    { code: "V338", tagHigh: "VAR_V338", tagLow: "VAR_V339", text: "Casing Pompa P2 (Casing Pump)" },
    { code: "V343", tagHigh: "VAR_V343", tagLow: "VAR_V344", text: "Casing Pompa P3 (Top Flavoring Pump)" }
  ];

  // #endregion


  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<SettingCasingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.initFillTypes();
    this.initCasing();
  }

  // Le combobox partono dal valore gia' scritto sul PLC: cosi' l'operatore vede la
  // selezione corrente e un OK dato senza scegliere nulla non manda un valore vuoto.
  private initFillTypes(): void {
    if (this.siloList == null) return;
    this.newFillTypeGlobal = this.siloList.FILL_TYPE_GLOBAL;
    this.siloList.silos.forEach((silo, i) => this.newFillType[i] = silo.FILL_TYPE);
  }

  // Gruppi di bit di comando presi dall'area "Casing room" di setup-settings, saltando il
  // gruppo dei comandi di zona (start/stop e man/auto), che la pagina Casing Tanks ha
  // gia' nel menu "Comandi" della testata. I gruppi si cercano per sigla e non per
  // titolo, cosi' un ritocco al testo non svuota una scheda; le elettrovalvole agli
  // ugelli, che una sigla non ce l'hanno, si cercano dal suffisso del tag. Come per le
  // combobox dei silos, i campi "NUOVO" partono dal valore gia' scritto sul PLC.
  private initCasing(): void {
    var area: SettingArea = SETUP_AREAS.filter(a => a.tab == "Casing room")[0];
    if (area == null) return;

    this.logPrefixCasing = area.logPrefix;
    var gruppiBit: SettingGroup[] = area.groups.filter(g => g.rows.every(r => r.tag.indexOf("_XYCOM") > 0 || r.tag.indexOf("_MERKER") > 0));
    this.gruppoDosaggioAcqua = gruppiBit.filter(g => g.rows[0].code.indexOf("C201") == 0)[0];
    this.gruppoMandataTank = gruppiBit.filter(g => g.rows[0].code.indexOf("C202") == 0)[0];
    this.gruppoLoopPompe = gruppiBit.filter(g => g.rows[0].code.indexOf("C203") == 0)[0];
    this.gruppoCasingUgelli = gruppiBit.filter(g => g.rows.every(r => r.tag.indexOf("_MERKER") > 0))[0];

    this.CASING_H2O_SETPOINTS.forEach((row, i) => this.newH2OSetpoint[i] = this.valueOf(row.tag));
    this.CASING_TIMERS.forEach((row, i) => this.newTimerPreset[i] = this.valueOf("TIMERS_tcp_" + row.index));
  }

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  get siloList(): SiloList {
    return DeviceService.siloList;
  }


  // #region SILOS FILL - tipo di riempimento (log del cambio parametro, poi scrittura sul PLC)

  onFillTypeGlobalConfirm(): void {
    if (this.newFillTypeGlobal == null) return;
    try { this.userService.logParameterTagValues("SILOS FILL: setpoint tipo di riempimento globale silos", this.siloList.SET_FILL_TYPE_GLOBAL, this.newFillTypeGlobal, "", this.appService.user); } catch (e) { }
    this.siloList.FILL_TYPE_GLOBAL = this.newFillTypeGlobal;
  }

  // Il setpoint del singolo silo lo prende in carico il PLC solo con il globale a zero.
  onFillTypeConfirm(index: number): void {
    var silo = this.siloList.silos[index];
    if (silo == null || this.newFillType[index] == null) return;
    try { this.userService.logParameterTagValues("SILOS FILL: setpoint tipo di riempimento " + silo.description, silo.SET_FILL_TYPE, this.newFillType[index], "", this.appService.user); } catch (e) { }
    silo.FILL_TYPE = this.newFillType[index];
  }

  // #endregion

  // #region CASING TANKS - lettura e scrittura
  // Stesse pratiche degli altri popup e della pagina Parametri: il tag si cerca per
  // nome sulla TagsList, il valore nuovo si logga con logParameterTagValues e solo
  // dopo si scrive sul tag.

  // Finche' SignalRService non ha costruito la TagsList la riga resta semplicemente
  // spenta, invece di far esplodere il binding del template.
  private tag(name: string): TagsClient {
    const list: any = SignalRService.tagList;
    return list == null ? null : list[name];
  }

  valueOf(name: string): any {
    var tag = this.tag(name);
    return tag == null ? null : tag.value;
  }

  isTrue(value: any): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  isOn(row: SettingRow): boolean {
    var tag = this.tag(row.tag);
    return tag == null ? false : this.isTrue(tag.value);
  }

  // Testo della colonna ATTUALE in base alla semantica del singolo bit.
  stateTxt(row: SettingRow): string {
    return this.isOn(row) ? row.on : row.off;
  }

  // Bit di comando XYCOM (DB120).
  onCasingToggle(row: SettingRow, newValue: any): void {
    var tag = this.tag(row.tag);
    if (tag == null) return; // bit non (ancora) presente in TagsList

    var value: boolean = this.isTrue(newValue);
    var description: string = this.logPrefixCasing + (row.code ? " " + row.code : "") + ": " + row.text;

    try { this.userService.logParameterTagValues(description, tag, value ? row.on : row.off, "", this.appService.user); } catch (e) { }

    tag.value = value;
  }

  // Setpoint acqua in tank (DB123).
  onH2OSetpointConfirm(index: number): void {
    var row = this.CASING_H2O_SETPOINTS[index];
    var tag = this.tag(row.tag);
    if (tag == null || this.newH2OSetpoint[index] == null) return;

    try { this.userService.logParameterTagValues("CASING TANKS " + row.code + ": setpoint acqua " + row.text, tag, this.newH2OSetpoint[index], row.unit, this.appService.user); } catch (e) { }

    tag.value = this.newH2OSetpoint[index];
  }

  // Preset dei temporizzatori (DB186). Il PLC li tiene in decimi di secondo: qui si
  // scrive il numero cosi' com'e', senza conversioni, per non introdurre
  // arrotondamenti su un tempo di impianto; i secondi si mostrano solo come promemoria.
  onTimerPresetConfirm(index: number): void {
    var row = this.CASING_TIMERS[index];
    var tag = this.tag("TIMERS_tcp_" + row.index);
    if (tag == null || this.newTimerPreset[index] == null) return;

    try { this.userService.logParameterTagValues("CASING TANKS tcp[" + row.index + "]: " + row.text, tag, this.newTimerPreset[index], "0,1 s", this.appService.user); } catch (e) { }

    tag.value = this.newTimerPreset[index];
  }

  seconds(value: any): string {
    return value == null ? "" : (Number(value) / 10).toFixed(1);
  }

  // Totalizzatori (DB190): il valore e' un REAL spalmato su due word consecutive.
  totalizer(row: TotalizerRow): number {
    return HelpService.realFromWords(this.valueOf(row.tagHigh), this.valueOf(row.tagLow));
  }

  // #endregion

  onNoClick(): void {
    this.dialogRef.close();
  }
}
