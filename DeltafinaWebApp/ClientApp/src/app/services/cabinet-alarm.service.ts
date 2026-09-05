import { Injectable } from '@angular/core';
import { SignalRService } from '../signalr-client/signalr.service';

// Allarmi dei quadri elettrici (DB121 - TO_HMI): sono i bit che fanno lampeggiare i
// quadri sul sinottico Cabinets.
//
// Non c'e' un blocco dedicato ai quadri: ogni quadro ha un bit dentro la lista
// allarmi generale, gli stessi alm0xx della pagina Allarmi (vedi Alarms/Allarmi.cs).
//
//   C230 -> PLC_alm010 (DB121.dbx9.2)  pannello esterno virginia
//   C231 -> PLC_alm011 (DB121.dbx9.3)  pannello interno virginia
//   C232 -> PLC_alm012 (DB121.dbx9.4)  pannello esterno burley
//   C233 -> PLC_alm013 (DB121.dbx9.5)  pannello interno burley
//   C234 -> PLC_alm014 (DB121.dbx9.6)  pannello interno finale
//   C235 -> PLC_alm015 (DB121.dbx9.7)  pannello esterno finale
//   C123 -> PLC_alm033 (DB121.dbx12.1) ampliamento virginia
//   C124 -> PLC_alm034 (DB121.dbx12.2) ampliamento burley
//
// Stessa forma di ZoneAlarmService: metodi statici (i template dei sinottici li
// chiamano tramite una scorciatoia del componente) e tag presi per nome, perche' la
// TagsList esiste solo dopo che SignalRService l'ha costruita. Qui pero' la logica
// non e' invertita come quella del DAC: bit a 1 = quadro in allarme.

@Injectable()
export class CabinetAlarmService {

  constructor() { }

  // Nome del quadro nel disegno -> tag dell'allarme.
  private static readonly ALARM_TAG: { [cabinet: string]: string } = {
    "C230": "PLC_alm010",
    "C231": "PLC_alm011",
    "C232": "PLC_alm012",
    "C233": "PLC_alm013",
    "C234": "PLC_alm014",
    "C235": "PLC_alm015",
    "C123": "PLC_alm033",
    "C124": "PLC_alm034"
  };

  // Il valore puo' arrivare come booleano o come stringa/numero: stesso criterio
  // degli altri punti dell'app (isTrue della dashboard, isOn dei parametri).
  private static isTrue(value: any): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  private static tag(nome: string): any {
    const list: any = SignalRService.tagList;
    return list == null ? null : list[nome];
  }

  // Quadro in allarme. I quadri larghi sono disegnati con due immagini affiancate
  // (C232_1 / C232_2): il suffisso non fa parte del nome del quadro e si scarta,
  // cosi' le due meta' lampeggiano insieme.
  public static inAlarm(cabinet: string): boolean {
    if (cabinet == null) return false;
    const nomeTag = CabinetAlarmService.ALARM_TAG[cabinet.replace(/_[12]$/, "")];
    if (nomeTag == null) return false; // quadro senza allarme mappato
    const t = CabinetAlarmService.tag(nomeTag);
    return t == null ? false : CabinetAlarmService.isTrue(t.value);
  }

  // Almeno un quadro in allarme: e' quello che fa lampeggiare la voce "Cabinets"
  // nella barra laterale, anche quando si sta guardando un'altra pagina.
  public static anyAlarm(): boolean {
    for (const cabinet in CabinetAlarmService.ALARM_TAG) {
      if (CabinetAlarmService.inAlarm(cabinet)) return true;
    }
    return false;
  }

}
