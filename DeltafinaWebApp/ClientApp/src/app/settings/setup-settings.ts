// Parametri di setup dell'impianto (bit del DB120 - FROM_HMI).
//
// La lista sta qui e non dentro un componente perche' la usano in due: la pagina
// Parametri (IMPOSTAZIONI > Parametri), che li mostra tutti divisi per area, e il
// pannello "Configurazione percorsi e linee" disegnato sul sinottico della dashboard.
// Tenere una sola lista evita che le due viste comandino bit diversi.

import { SignalRService } from '../signalr-client/signalr.service';
import { TagsClient } from '../tags/tags-client';

// Un singolo bit di setup del DB120 (FROM_HMI).
//   code  = sigla del comando XYCOM riportata sullo scambio dati (C71, C2011, ...),
//           "" per i bit che sullo scambio dati una sigla non ce l'hanno ancora
//   tag   = nome della property in TagsList; l'accesso e' per nome e non per
//           riferimento perche' la TagsList esiste solo dopo che SignalRService
//           l'ha costruita
//   on/off = testo del badge ATTUALE nei due stati, secondo la semantica del bit
//   info  = usa il colore info invece di success (bit che scelgono una modalita',
//           non che abilitano qualcosa)
export interface SettingRow {
  code: string;
  tag: string;
  text: string;
  on: string;
  off: string;
  info?: boolean;
}

export interface SettingGroup {
  title: string;
  rows: SettingRow[];
}

// logPrefix finisce nel log parametri davanti alla sigla ("Setup C71: ...").
export interface SettingArea {
  tab: string;
  logPrefix: string;
  groups: SettingGroup[];
}

// L'ordine segue quello dei bit sullo scambio dati; unica eccezione il Burley
// Piking (C115, bit 5.6) messo accanto al Virginia Piking (C54) perche' sono la
// stessa funzione sulle due linee.
export const SETUP_AREAS: SettingArea[] = [
  {
    tab: "System setup",
    logPrefix: "Setup",
    groups: [
      {
        title: "Configurazione percorsi e linee",
        rows: [
          { code: "C71", tag: "FROM_HMI_Zn_2_1_SILO1_4_Zn_1_0", text: "Burley verso Silos tramite Virginia", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C72", tag: "FROM_HMI_Zn_2_3_Zn_4_0", text: "Burley verso Press dopo il Dryer", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C73", tag: "FROM_HMI_Zn_3_2_SILO3_4_Zn_2_1", text: "Silo #3 e #4 verso Burley", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C77", tag: "FROM_HMI_REM_VIRG_State_OFF_ON", text: "Remaining Virginia", on: "ON", off: "OFF" },
          { code: "C80", tag: "FROM_HMI_BRE_B93_B94_SILO1_4", text: "Burley verso Silos dopo il Separatore", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C90", tag: "FROM_HMI_Burley_final_Press", text: "Burley Dryer verso Press tramite il Final Belt del Final Dryer", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C142", tag: "FROM_HMI_BY_PAS_BOC_VOC", text: "By-pass VOC e BOC", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C111", tag: "FROM_HMI_Orientali1_State_OFF_ON", text: "Linea Orientali 1", on: "ON", off: "OFF" },
          { code: "C64", tag: "FROM_HMI_Orientali2_State_OFF_ON", text: "Linea Orientali 2", on: "ON", off: "OFF" },
          { code: "C54", tag: "FROM_HMI_Zn_1_0_V_PIKING_OFF_ON", text: "Virginia Piking", on: "ON", off: "OFF" },
          { code: "C115", tag: "FROM_HMI_Zn_2_1_BPIKING_off_ON", text: "Burley Piking", on: "ON", off: "OFF" },
          { code: "C114", tag: "FROM_HMI_BCAC_Spray_out_IN", text: "BCAC casing spray: ingresso / uscita", on: "IN", off: "OUT", info: true }
        ]
      },
      {
        title: "Modo di taglio slicer",
        rows: [
          { code: "C1500", tag: "FROM_HMI_VSL_PRG", text: "Virginia Slicer", on: "SINGLE", off: "CONT", info: true },
          { code: "C1000", tag: "FROM_HMI_BSL_PRG", text: "Burley Slicer", on: "SINGLE", off: "CONT", info: true }
        ]
      }
    ]
  },
  {
    tab: "Casing room",
    logPrefix: "Casing",
    groups: [
      {
        title: "Zona 2.0 - Casing Room",
        rows: [
          { code: "C2002", tag: "FROM_HMI_Zn_2_0_Mode_mn_AUT", text: "Modo di funzionamento della zona", on: "AUTO", off: "MAN", info: true }
        ]
      },
      {
        title: "Dosaggio acqua - impulso elettrovalvola",
        rows: [
          { code: "C2011", tag: "FROM_HMI_BCT1_H2O_XYCOM", text: "Burley Casing Tank #1", on: "ON", off: "OFF" },
          { code: "C2012", tag: "FROM_HMI_BCT2_H2O_XYCOM", text: "Burley Casing Tank #2", on: "ON", off: "OFF" },
          { code: "C2013", tag: "FROM_HMI_CAT3_H2O_XYCOM", text: "Casing Tank #3", on: "ON", off: "OFF" },
          { code: "C2014", tag: "FROM_HMI_CAT4_H2O_XYCOM", text: "Casing Tank #4", on: "ON", off: "OFF" },
          { code: "C2015", tag: "FROM_HMI_BTFT5_H2O_XYCOM", text: "Top Flavoring Tank #5", on: "ON", off: "OFF" }
        ]
      },
      {
        title: "Mandata tank verso pompa - elettrovalvola",
        rows: [
          { code: "C2021", tag: "FROM_HMI_BCT1_T1toP1_XYCOM", text: "Burley Casing Tank #1: tank #1 verso pompa #1", on: "ON", off: "OFF" },
          { code: "C2022", tag: "FROM_HMI_BCT2_T2toP1_XYCOM", text: "Burley Casing Tank #2: tank #2 verso pompa #1", on: "ON", off: "OFF" },
          { code: "C2023", tag: "FROM_HMI_CAT3_T3toP2_XYCOM", text: "Casing Tank #3: tank #3 verso pompa #2", on: "ON", off: "OFF" },
          { code: "C2024", tag: "FROM_HMI_CAT4_T4toP2_XYCOM", text: "Casing Tank #4: tank #4 verso pompa #2", on: "ON", off: "OFF" }
        ]
      },
      {
        // Elettrovalvole del casing sugli ugelli dei tre cilindri (DB120.dbx6.3..6.5).
        // Sono arrivate dopo l'ultima revisione dello scambio dati e non hanno una sigla
        // XYCOM sul foglio: il code resta vuoto, come il modo della zona 2.0 in
        // services/zone-commands. Il finecorsa di queste stesse valvole (X0289, X0274,
        // X0321) sta nella scheda "Valvole ugelli" del popup Casing Tanks.
        title: "Casing all'ugello del cilindro - elettrovalvola",
        rows: [
          { code: "", tag: "FROM_HMI_BCAC_Casng_SV_MERKER", text: "Burley Cylinder: valvola casing all'ugello", on: "ON", off: "OFF" },
          { code: "", tag: "FROM_HMI_CAC_Casng_SV_MERKER", text: "Casing Cylinder: valvola casing all'ugello", on: "ON", off: "OFF" },
          { code: "", tag: "FROM_HMI_BTFC_Casng_SV_MERKER", text: "Top Flavor Cylinder: valvola casing all'ugello", on: "ON", off: "OFF" }
        ]
      },
      {
        title: "Abilitazione loop di controllo pompe",
        rows: [
          { code: "C2031", tag: "FROM_HMI_BCP_offON_XYCOM", text: "Burley Casing Pump", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C2041", tag: "FROM_HMI_CAP_offON_XYCOM", text: "Casing Pump", on: "ABILITATO", off: "DISABILITATO" },
          { code: "C2051", tag: "FROM_HMI_BTFP_offON_XYCOM", text: "Top Flavoring Pump", on: "ABILITATO", off: "DISABILITATO" }
        ]
      }
    ]
  },
  {
    tab: "Controlli",
    logPrefix: "Controllo",
    groups: [
      {
        title: "Controllo presenza tabacco",
        rows: [
          { code: "C182", tag: "FROM_HMI_BOC_TobaccoPresence_Check", text: "Cilindro BOC", on: "ABILITATO", off: "NON ABILITATO" },
          { code: "C185", tag: "FROM_HMI_VOC_TobaccoPresence_Check", text: "Cilindro VOC", on: "ABILITATO", off: "NON ABILITATO" }
        ]
      }
    ]
  }
];

// Prima voce del System setup: e' il gruppo riportato sul sinottico della dashboard.
export const SETUP_AREA_SYSTEM: SettingArea = SETUP_AREAS[0];
export const SETUP_GROUP_PATHS: SettingGroup = SETUP_AREAS[0].groups[0];

// Seconda voce del System setup: il modo di taglio, una riga per slicer. Le due righe
// finiscono nella finestra produzione delle pagine Slicer (C1500 su Virginia, C1000 su
// Burley), sempre pescate per sigla cosi' il bit e' lo stesso della pagina Parametri.
export const SETUP_GROUP_SLICER: SettingGroup = SETUP_AREAS[0].groups[1];

export function settingByCode(group: SettingGroup, code: string): SettingRow {
  return group.rows.filter(row => row.code === code)[0];
}

// La TagsList viene costruita da SignalRService: finche' non c'e', la riga resta
// semplicemente spenta invece di far esplodere il template.
export function settingTag(row: SettingRow): TagsClient {
  const list: any = SignalRService.tagList;
  return list == null ? null : list[row.tag];
}

export function isSettingOn(row: SettingRow): boolean {
  const tag = settingTag(row);
  if (tag == null) return false;
  const value: any = tag.value;
  return value === true || value === 'true' || value === 1 || value === '1';
}

// Testo della colonna ATTUALE, secondo la semantica del singolo bit
export function settingStateTxt(row: SettingRow): string {
  return isSettingOn(row) ? row.on : row.off;
}
