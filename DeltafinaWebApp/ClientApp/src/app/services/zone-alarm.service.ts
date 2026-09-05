import { Injectable } from '@angular/core';
import { SignalRService } from '../signalr-client/signalr.service';

// Allarmi e feedback cumulativi delle zone di impianto (DB121 - TO_HMI).
//
// Da non confondere con ZoneService, che parla di tutt'altro: quello legge le zone
// del database via HTTP (ricette, ACOOL, UTA), questo legge i bit del PLC.
//
// E' il PLC a fare l'OR degli allarmi delle utenze della zona e a pubblicare tre bit:
//   Zn_X_Y_MOL_nok   cumulativo scatto termico   -> ALLARME quando vale 1
//   Zn_X_Y_DAC_ok    tutti i sezionatori chiusi  -> ALLARME quando vale 0 (logica invertita)
//   Zn_X_Y_All_ON    tutte le utenze in marcia   -> feedback di stato, non un allarme
//
// Le zone con i tre bit sono 1_0, 2_1, 2_2, 2_3, 3_1, 3_2, 3_3, 3_4. Due eccezioni:
//   - zona 2_0 (Casing Room): esiste il solo DAC_ok, niente MOL_nok e niente All_ON
//   - zona 3_1 (Silo Fill): l'All_ON e' per silo (S1..S4), non uno solo per la zona
//
// Ai bit di zona si aggiungono i cinque mCC*_SS_ok: la tensione dei quadri MCC
// (v=Virginia, b=Burley, f=Final, c=Casing, d=Dryers). Ogni quadro serve una o due
// zone (mappa MCC_BY_ZONE in fondo); anche qui logica invertita, il bit a 0 e' allarme.
//
// I metodi sono statici come in HelpService e DeviceService: servono ai template dei
// sinottici, che li chiamano tramite una scorciatoia del componente, e non c'e' stato
// da iniettare. I tag si prendono per nome e non per riferimento perche' la TagsList
// esiste solo dopo che SignalRService l'ha costruita.
//
// ATTENZIONE alla logica invertita del DAC: i tag BIT nascono a false (vedi il
// costruttore di TagsClient), quindi finche' non arriva la prima lettura il bit
// DAC_ok vale false e la zona risulterebbe in allarme. Qui il caso e' coperto solo
// quando la TagsList non c'e' ancora; se il PLC e' spento o il DB121 non e'
// pubblicato, il badge "sezionatore aperto" resta acceso: in quel caso conviene
// legarlo anche allo stato del PLC (AlarmService.plcStateOk).

@Injectable()
export class ZoneAlarmService {

  constructor() { }

  // Il valore puo' arrivare come booleano o come stringa/numero: stesso criterio
  // degli altri punti dell'app (isTrue della dashboard, isOn dei parametri).
  private static isTrue(value: any): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  private static tag(nome: string): any {
    const list: any = SignalRService.tagList;
    return list == null ? null : list[nome];
  }

  // Scatto termico cumulativo della zona: il bit a 1 e' allarme.
  public static molAlarm(zona: string): boolean {
    const t = ZoneAlarmService.tag('PLC_Zn_' + zona + '_MOL_nok');
    return t == null ? false : ZoneAlarmService.isTrue(t.value);
  }

  // Sezionatori della zona: il bit a 0 e' allarme. Se il tag non c'e' (zone senza
  // quel bit) non si accende niente, invece di segnalare un allarme inesistente.
  public static dacAlarm(zona: string): boolean {
    const t = ZoneAlarmService.tag('PLC_Zn_' + zona + '_DAC_ok');
    return t == null ? false : !ZoneAlarmService.isTrue(t.value);
  }

  // Zona in allarme: una delle due condizioni.
  public static inAlarm(zona: string): boolean {
    return ZoneAlarmService.molAlarm(zona) || ZoneAlarmService.dacAlarm(zona);
  }

  // Tutte le utenze della zona in marcia.
  public static allOn(zona: string): boolean {
    const t = ZoneAlarmService.tag('PLC_Zn_' + zona + '_All_ON');
    return t == null ? false : ZoneAlarmService.isTrue(t.value);
  }

  // Zona 3.1 (Silo Fill): un All_ON per silo, numerati da 1 a 4.
  public static siloAllOn(silo: number): boolean {
    const t = ZoneAlarmService.tag('PLC_Zn_3_1_S' + silo + '_All_ON');
    return t == null ? false : ZoneAlarmService.isTrue(t.value);
  }

  // Quadri MCC serviti da ogni zona, dalla colonna DESCRIZIONE del DB121 (X276, X283,
  // X284, X295, X325). Le zone 3_2 e 3_4 sul foglio non hanno un quadro attribuito:
  // niente chiave, cosi' il badge non si accende mai - stesso criterio del DAC assente.
  // La 3_3 ne ha due (Final e Dryers): l'allarme scatta se almeno uno e' senza tensione.
  private static readonly MCC_BY_ZONE: { [zona: string]: string[] } = {
    '1_0': ['PLC_mCCv_SS_ok'],
    '2_0': ['PLC_mCCc_SS_ok'],
    '2_1': ['PLC_mCCb_SS_ok'],
    '2_2': ['PLC_mCCd_SS_ok'],
    '2_3': ['PLC_mCCb_SS_ok'],
    '3_1': ['PLC_mCCf_SS_ok'],
    '3_3': ['PLC_mCCf_SS_ok', 'PLC_mCCd_SS_ok']
  };

  // Quadro MCC della zona senza tensione: il bit a 0 e' allarme, come il DAC.
  public static mccAlarm(zona: string): boolean {
    const nomi = ZoneAlarmService.MCC_BY_ZONE[zona];
    if (nomi == null) return false;
    for (const nome of nomi) {
      const t = ZoneAlarmService.tag(nome);
      if (t != null && !ZoneAlarmService.isTrue(t.value)) return true;
    }
    return false;
  }

}
