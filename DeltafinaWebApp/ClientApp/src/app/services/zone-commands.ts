import { SignalRService } from '../signalr-client/signalr.service';
import { TagsClient } from '../tags/tags-client';

// Comandi di zona dell'impianto (bit del DB120 - FROM_HMI).
//
// Ogni zona ha due toggle: State_off_ON (0 = stop, 1 = start) e Mode_mn_AUT
// (0 = manuale, 1 = automatico). La lista sta qui e non dentro un componente perche'
// la usano in tre: il popup "Comandi di zona" della dashboard, i comandi globali
// (global-cmd-plate, che ripete lo stesso comando su tutte le zone) e la dashboard
// stessa, che accende le aree del sinottico solo a zona avviata. Una lista sola evita
// che le tre viste comandino bit diversi - stesso criterio di settings/setup-settings.
//
// I feedback cumulativi (scatto termico, sezionatori, tutte le utenze in marcia) NON
// stanno qui: arrivano dal DB121 e li legge ZoneAlarmService, con la stessa chiave
// `zone` di questa lista.

// Una zona con i suoi due comandi.
//   zone       = chiave "X_Y" usata anche da ZoneAlarmService (1_0, 2_1, ...)
//   label      = come si chiama a video ("Zona 1.0")
//   text       = descrizione dello scambio dati
//   stateCode  = sigla XYCOM del bit di marcia (C1, C11, ...)
//   stateTag   = nome della property in TagsList; l'accesso e' per nome e non per
//                riferimento perche' la TagsList esiste solo dopo che SignalRService
//                l'ha costruita
//   modeCode   = sigla XYCOM del bit di modo, "" se non e' sullo scambio dati
//   modeTag    = nome della property in TagsList, "" se la zona non ha il modo
export interface ZoneCmdRow {
  zone: string;
  label: string;
  text: string;
  stateCode: string;
  stateTag: string;
  modeCode: string;
  modeTag: string;
}

export const ZONE_COMMANDS: ZoneCmdRow[] = [
  {
    zone: "1_0", label: "Zona 1.0", text: "Virginia Infeed to Silos",
    stateCode: "C1", stateTag: "FROM_HMI_Zn_1_0_State_off_ON",
    modeCode: "C2", modeTag: "FROM_HMI_Zn_1_0_Mode_mn_AUT"
  },
  {
    // Il modo della 2.0 non sta con gli altri sullo scambio dati (e' a DB120.dbx3.7,
    // fuori dalle prime 18 variabili) e non ha una sigla XYCOM sul foglio, ma il bit
    // esiste in TagsList ed e' quello che commutano gia' i comandi globali.
    zone: "2_0", label: "Zona 2.0", text: "Casing Room",
    stateCode: "C2001", stateTag: "FROM_HMI_Zn_2_0_State_off_ON",
    modeCode: "", modeTag: "FROM_HMI_Zn_2_0_Mode_mn_AUT"
  },
  {
    zone: "2_1", label: "Zona 2.1", text: "Burley Casing Line",
    stateCode: "C11", stateTag: "FROM_HMI_Zn_2_1_State_off_ON",
    modeCode: "C12", modeTag: "FROM_HMI_Zn_2_1_Mode_mn_AUT"
  },
  {
    zone: "2_2", label: "Zona 2.2", text: "Burley Dryer",
    stateCode: "C21", stateTag: "FROM_HMI_Zn_2_2_State_off_ON",
    modeCode: "C22", modeTag: "FROM_HMI_Zn_2_2_Mode_mn_AUT"
  },
  {
    zone: "2_3", label: "Zona 2.3", text: "Burley Silo Infeed",
    stateCode: "C31", stateTag: "FROM_HMI_Zn_2_3_State_off_ON",
    modeCode: "C32", modeTag: "FROM_HMI_Zn_2_3_Mode_mn_AUT"
  },
  {
    zone: "3_1", label: "Zona 3.1", text: "Silo Fill System",
    stateCode: "C41", stateTag: "FROM_HMI_Zn_3_1_State_off_ON",
    modeCode: "C42", modeTag: "FROM_HMI_Zn_3_1_Mode_mn_AUT"
  },
  {
    zone: "3_2", label: "Zona 3.2", text: "Silo Discharge Line",
    stateCode: "C51", stateTag: "FROM_HMI_Zn_3_2_State_off_ON",
    modeCode: "C52", modeTag: "FROM_HMI_Zn_3_2_Mode_mn_AUT"
  },
  {
    zone: "3_3", label: "Zona 3.3", text: "Final Dryer",
    stateCode: "C61", stateTag: "FROM_HMI_Zn_3_3_State_off_ON",
    modeCode: "C62", modeTag: "FROM_HMI_Zn_3_3_Mode_mn_AUT"
  },
  {
    zone: "3_4", label: "Zona 3.4", text: "Final",
    stateCode: "C134", stateTag: "FROM_HMI_Zn_3_4_State_off_ON",
    modeCode: "C132", modeTag: "FROM_HMI_Zn_3_4_Mode_mn_AUT"
  }
];


// Il tag di un comando, per nome. Null finche' SignalRService non ha costruito la
// TagsList, oppure se il bit non c'e' (zone senza modo).
export function zoneCmdTag(tagName: string): TagsClient {
  if (tagName == null || tagName == "") return null;
  const list: any = SignalRService.tagList;
  return list == null ? null : list[tagName];
}

// Il valore puo' arrivare come booleano o come stringa/numero: stesso criterio degli
// altri punti dell'app (isTrue della dashboard, isOn dei parametri).
export function isZoneCmdOn(tagName: string): boolean {
  const tag = zoneCmdTag(tagName);
  if (tag == null) return false;
  const value = tag.value;
  return value === true || value === 'true' || value === 1 || value === '1';
}

// La riga di una zona per chiave ("2_0"). Null se la zona non e' in lista.
export function zoneCmdByZone(zone: string): ZoneCmdRow {
  return ZONE_COMMANDS.filter(row => row.zone === zone)[0];
}
