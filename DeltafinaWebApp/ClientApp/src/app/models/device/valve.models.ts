import { TagsClient } from 'src/app/tags/tags-client';


//   DB CMD    : comandi HMI -> PLC (Cmd1, Cmd2 se bistabile + riserve)
//   DB FILTER : bypass allarmi (openingAlmBypass, closingAlmBypass, incongruenceAlmBypass + riserve + filCUM)
//   DB STS    : stati digitali PLC -> HMI (opening, closing, opened, closed + riserve + almCUM)
//   DB ALM    : allarmi (openingAlarm, closingAlarm, Incongruence + riserve)
//   DB STATE  : stato macchina della valvola (INT16, codifica testuale)
export class ValveModel {
  public animal: string;
  public name: string;
  public nameTag: string;
  public description: string;

  // #region DATABLOCK ALLARMI (ALM)
  public ALM_OPENING: TagsClient;             // openingAlarm
  public ALM_CLOSING: TagsClient;             // closingAlarm
  public ALM_INCONGRUENCE: TagsClient;        // Incongruence
  // #endregion

  // #region DATABLOCK COMANDI (CMD)
  // Cmd1 e' un toggle, non un impulso: true = apri, false = chiudi. E' l'unico comando
  // che il popup scrive sulle valvole normali.
  public CMD_1: TagsClient;                   // command 1 (toggle apri/chiudi)
  // Cmd2 e' mappato su tutte le valvole ma si comanda solo sui martinetti idraulici,
  // dove sceglie il verso di corsa: true = su, false = giu'. Vedi IS_JACK.
  public CMD_2: TagsClient;                   // command 2 (toggle su/giu', solo martinetti)
  // #endregion

  // Martinetto idraulico: sono solo VDCC_V14_SV e BDCC_B16_SV. Il flag lo mette
  // ValveList, che e' il posto dove si sa quale valvola e' quale; il popup lo usa per
  // decidere se mostrare il secondo toggle (su/giu') e il pulsante di stop. Sulle
  // altre valvole il Cmd2 resta nel datablock ma dall'HMI non si tocca.
  public IS_JACK: boolean = false;

  // #region DATABLOCK FILTERS (bypass allarmi)
  public FILTER_OPENING_BYPASS: TagsClient;       // openingAlmBypass
  public FILTER_CLOSING_BYPASS: TagsClient;       // closingAlmBypass
  public FILTER_INCONGRUENCE_BYPASS: TagsClient;  // incongruenceAlmBypass
  public FILTER_CUM: TagsClient;                  // filCUM: almeno un filtro selezionato
  // #endregion

  // #region DATABLOCK STS (stati digitali)
  public STS_OPENING: TagsClient;             // opening (da command 1)
  public STS_CLOSING: TagsClient;             // closing (da command 2 se bistabile)
  public STS_OPENED: TagsClient;              // opened (da command 1)
  public STS_CLOSED: TagsClient;              // closed (da command 2 se bistabile)
  public STS_ALM_CUM: TagsClient;             // almCUM: cumulativo allarmi
  // #endregion

  // #region STATO (INT16)
  public STATE: TagsClient;
  // #endregion

  // I 4 datablock arrivano come array dei soli tag usati, nell'ordine dei bit PLC;
  // stateTag e' il tag INT16 di stato.
  constructor(name: string, description: string,
    almTags: TagsClient[] = [], cmdTags: TagsClient[] = [],
    filterTags: TagsClient[] = [], stsTags: TagsClient[] = [],
    stateTag: TagsClient = null, nameTag: string = null) {

    this.name = name;
    this.nameTag = nameTag == null ? name : nameTag;
    this.description = description;

    this.ALM_OPENING = almTags[0];            // bit .0 allarme apertura
    this.ALM_CLOSING = almTags[1];            // bit .1 allarme chiusura
    this.ALM_INCONGRUENCE = almTags[2];       // bit .2 allarme incongruenza

    this.CMD_1 = cmdTags[0];                  // bit .0 comando 1 (toggle)
    this.CMD_2 = cmdTags[1];                  // bit .1 comando 2 se bistabile (toggle)

    this.FILTER_OPENING_BYPASS = filterTags[0];       // bit .0 bypass allarme apertura
    this.FILTER_CLOSING_BYPASS = filterTags[1];       // bit .1 bypass allarme chiusura
    this.FILTER_INCONGRUENCE_BYPASS = filterTags[2];  // bit .2 bypass allarme incongruenza
    this.FILTER_CUM = filterTags[3];                  // bit .15 filCUM

    this.STS_OPENING = stsTags[0];            // bit .0 in apertura
    this.STS_CLOSING = stsTags[1];            // bit .1 in chiusura
    this.STS_OPENED = stsTags[2];             // bit .2 aperta
    this.STS_CLOSED = stsTags[3];             // bit .3 chiusa
    this.STS_ALM_CUM = stsTags[4];            // bit .15 cumulativo allarmi

    this.STATE = stateTag;
  }

  // #region Stato logico (null-safe, derivato dagli stati digitali STS)
  // Aperta: finecorsa/stato "opened" dal PLC.
  get IsOpen(): boolean {
    return this.STS_OPENED != null && !!this.STS_OPENED.value;
  }
  get IsClosed(): boolean {
    return this.STS_CLOSED != null && !!this.STS_CLOSED.value;
  }
  get IsOpening(): boolean {
    return this.STS_OPENING != null && !!this.STS_OPENING.value;
  }
  get IsClosing(): boolean {
    return this.STS_CLOSING != null && !!this.STS_CLOSING.value;
  }
  // In allarme: cumulativo allarmi dal datablock STS.
  get OUT_ALARM(): boolean {
    return this.STS_ALM_CUM != null && !!this.STS_ALM_CUM.value;
  }
  // Un bypass/filtro attivo: cumulativo filCUM o i singoli bypass.
  get HasBypass(): boolean {
    if (this.FILTER_CUM != null && this.FILTER_CUM.value) return true;
    if (this.FILTER_OPENING_BYPASS != null && this.FILTER_OPENING_BYPASS.value) return true;
    if (this.FILTER_CLOSING_BYPASS != null && this.FILTER_CLOSING_BYPASS.value) return true;
    if (this.FILTER_INCONGRUENCE_BYPASS != null && this.FILTER_INCONGRUENCE_BYPASS.value) return true;
    return false;
  }
  // #endregion

  // #region Alias comandi
  // Un toggle per funzione: Cmd1 apri/chiudi su tutte, Cmd2 su/giu' sui soli martinetti.
  get CMD_OPEN_CLOSE(): TagsClient { return this.CMD_1; }
  get CMD_UP_DOWN(): TagsClient { return this.IS_JACK ? this.CMD_2 : null; }
  // #endregion


  get STATE_STR(): string {
    if (this.STATE == null)
      return "";
    switch (this.STATE.value) {
      case 20:
        return "APERTA IN MANUALE POSIZIONE 1";
      case 21:
        return "APERTA IN AUTOMATICO POSIZIONE 1";
      case 22:
        return "APERTA IN SEMIAUTOMATICO";
      case 23:
        return "CHIUSA IN MANUALE";
      case 24:
        return "CHIUSA IN AUTOMATICO";
      case 25:
        return "CHIUSA IN SEMIAUTOMATICO";
      case 26:
        return "APERTURA JOG RIUSCITA";
      case 27:
        return "CHIUSURA JOG RIUSCITA";
      case 28:
        return "TENTATA APERTURA JOG";
      case 29:
        return "TENTATA CHIUSURA JOG";
      case 30:
        return "ATTESA APERTURA IN MANUALE";
      case 31:
        return "ATTESA APERTURA IN AUTOMATICO";
      case 32:
        return "ATTESA APERTURA IN SEMIAUTOMATICO";
      case 33:
        return "APRENDO IN MANUALE POSIZIONE 1";
      case 34:
        return "APRENDO IN MANUALE POSIZIONE 2";
      case 35:
        return "APRENDO IN AUTOMATICO POSIZIONE 1";
      case 36:
        return "APRENDO IN AUTOMATICO POSIZIONE 2";
      case 37:
        return "APERTA IN MANUALE POSIZIONE 2";
      case 38:
        return "APERTA IN AUTOMATICO POSIZIONE 2";
      case 50:
        return "DISPOSITIVO DI SICUREZZA";
      case 57:
        return "EXTRACORSA AVANTI";
      case 58:
        return "EXTRACORSA INDIETRO";
      case 66:
        return "DISPOSITIVO DI SICUREZZA LOCALE";
      case 80:
        return "ANOMALIA APERTURA";
      case 81:
        return "ANOMALIA CHIUSURA";
      case 82:
        return "ANOMALIA APERTURA CHIUSURA ON";
      case 83:
        return "ANOMALIA APERTURA CHIUSURA OFF";
      case 104:
        return "MODALITA' NON SELEZIONATA";
      case 105:
        return "NON ABILITATA";
      default:
        return "STATO VALVOLA " + this.STATE.value;
    }
  }

  // #region SVG (colore icona in base allo stato)
  // 0 = chiusa/riposo (blu), 1 = aperta (verde), 2 = in movimento (giallo), 3 = allarme (rosso)
  private get GfxState(): number {
    if (this.OUT_ALARM) return 3;
    if (this.IsOpen) return 1;
    if (this.IsOpening || this.IsClosing) return 2;
    return 0;
  }

  // Colore dell'etichetta in base alla modalita' descritta da STATE_STR:
  // arancio = manuale/semiautomatico/jog, blu = automatico,
  // nero = modalita' non selezionata o non abilitata, rosso = allarme.
  get LabelStyle(): string {
    if (this.STATE == null)
      return "fill:black;font-weight:normal;cursor:pointer";
    switch (+this.STATE.value) {
      //manuale, semiautomatico e jog
      case 20:  // APERTA IN MANUALE POSIZIONE 1
      case 22:  // APERTA IN SEMIAUTOMATICO
      case 23:  // CHIUSA IN MANUALE
      case 25:  // CHIUSA IN SEMIAUTOMATICO
      case 26:  // APERTURA JOG RIUSCITA
      case 27:  // CHIUSURA JOG RIUSCITA
      case 28:  // TENTATA APERTURA JOG
      case 29:  // TENTATA CHIUSURA JOG
      case 30:  // ATTESA APERTURA IN MANUALE
      case 32:  // ATTESA APERTURA IN SEMIAUTOMATICO
      case 33:  // APRENDO IN MANUALE POSIZIONE 1
      case 34:  // APRENDO IN MANUALE POSIZIONE 2
      case 37:  // APERTA IN MANUALE POSIZIONE 2
        return "fill:darkorange;font-weight:bold;cursor:pointer";

      //altro
      case 104: // MODALITA' NON SELEZIONATA
      case 105: // NON ABILITATA
        return "fill:black;font-weight:normal;cursor:pointer";

      //Automatico
      case 21:  // APERTA IN AUTOMATICO POSIZIONE 1
      case 24:  // CHIUSA IN AUTOMATICO
      case 31:  // ATTESA APERTURA IN AUTOMATICO
      case 35:  // APRENDO IN AUTOMATICO POSIZIONE 1
      case 36:  // APRENDO IN AUTOMATICO POSIZIONE 2
      case 38:  // APERTA IN AUTOMATICO POSIZIONE 2
        return "fill:blue;font-weight:normal;cursor:pointer";

      //allarmi e anomalie
      case 50:  // DISPOSITIVO DI SICUREZZA
      case 57:  // EXTRACORSA AVANTI
      case 58:  // EXTRACORSA INDIETRO
      case 66:  // DISPOSITIVO DI SICUREZZA LOCALE
      case 80:  // ANOMALIA APERTURA
      case 81:  // ANOMALIA CHIUSURA
      case 82:  // ANOMALIA APERTURA CHIUSURA ON
      case 83:  // ANOMALIA APERTURA CHIUSURA OFF
        return "fill:red;font-weight:bold;cursor:pointer";

      default:
        return "fill:red;font-weight:bold;cursor:pointer";
    }
  }

  private svg2w(withAlarm: boolean): string {
    const base = "../../assets/svg/groov/valve_3d_common2_nopipe_";
    switch (withAlarm ? this.GfxState : (this.GfxState === 3 ? 0 : this.GfxState)) {
      case 1: return base + "green.svg";
      case 2: return base + "yellow.svg";
      case 3: return base + "red.svg";
      default: return base + "blue.svg";
    }
  }
  get SVG_2W_SIMPLE(): string { return this.svg2w(false); }
  get SVG_2W_SIMPLE_ALM(): string { return this.svg2w(true); }

  private svg3w(withAlarm: boolean): string {
    const base = "../../assets/svg/groov/valve_3d_3way1_nopipe_";
    switch (withAlarm ? this.GfxState : (this.GfxState === 3 ? 0 : this.GfxState)) {
      case 1:
      case 2: return base + "green.svg";
      case 3: return base + "red.svg";
      default: return base + "blue.svg";
    }
  }
  get SVG_3W_SIMPLE(): string { return this.svg3w(false); }
  get SVG_3W_SIMPLE_ALM(): string { return this.svg3w(true); }

  // Valvola solenoide (stile redryer): chiusa/movimento = base (blu), aperta = verde, allarme = rosso.
  private svgSolenoid(withAlarm: boolean): string {
    const base = "../../assets/svg/groov/solenoidvalve";
    switch (withAlarm ? this.GfxState : (this.GfxState === 3 ? 0 : this.GfxState)) {
      case 1: return base + "_green.svg";
      case 3: return base + "_red.svg";
      default: return base + ".svg";
    }
  }
  get SVG_SOLENOID(): string { return this.svgSolenoid(false); }
  get SVG_SOLENOID_ALM(): string { return this.svgSolenoid(true); }
  // #endregion
}
