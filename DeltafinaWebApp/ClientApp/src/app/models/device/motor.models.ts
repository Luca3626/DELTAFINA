import { TagsClient } from 'src/app/tags/tags-client';

// Ogni motore ha 4 datablock da 16 bit + lo stato INT16:
//   DB103 - CMD    : comandi HMI -> PLC (ManAut, ManCmdFwd, ManCmdRev + riserve)
//   DB104 - FILTER : bypass allarmi (BypassDAC + riserve + filCUM)
//   DB105 - STS    : stati digitali PLC -> HMI (outFwd/outRev, stsFwd/stsRev, limFwd/limRev + riserve + almCUM)
//   DB106 - ALM    : allarmi (almMOL, almMAC, almDAC, almDRV + riserve)
//   DB107 - STATE  : stato macchina a stati del motore (INT16)
// I motori sotto inverter hanno in piu' un blocco udt_VFD da 44 byte:
//   DB122 - VFD    : riferimenti, misure elettriche e codici fault/warning dell'inverter
// I bit di riserva dei datablock non vengono letti dall'HMI: gli array passati al
// costruttore contengono solo i tag realmente usati, nell'ordine indicato sotto.
export class MotorModel {
  public animal: string;
  public name: string;
  public description: string;

  // #region DATABLOCK ALLARMI (DB106 - ALM)
  public ALM_MOL: TagsClient;                 // allarme scatto termico
  public ALM_MAC: TagsClient;                 // allarme mancata risposta
  public ALM_DAC: TagsClient;                 // allarme sezionatore aperto
  public ALM_DRV: TagsClient;                 // allarme drive
  // #endregion

  // #region DATABLOCK COMANDI (DB103 - CMD)
  public CMD_MAN_AUT: TagsClient;             // man=0, AUT=1 (toggle)
  public CMD_MAN_FWD: TagsClient;             // comando manuale forward (toggle)
  public CMD_MAN_REV: TagsClient;             // comando manuale reverse (toggle)
  // #endregion

  // #region DATABLOCK FILTERS (DB104 - bypass allarmi)
  public FILTER_BYPASS_DAC: TagsClient;       // bypass stato sezionatore (interruttore locale, toggle)
  public FILTER_CUM: TagsClient;              // filCUM: almeno un filtro selezionato
  // #endregion

  // #region DATABLOCK STS (DB105 - stati digitali)
  public STS_OUT_FWD: TagsClient;             // comando forward attivo (uscita PLC)
  public STS_OUT_REV: TagsClient;             // comando reverse attivo (uscita PLC)
  public STS_FWD: TagsClient;                 // stato in marcia forward
  public STS_REV: TagsClient;                 // stato in marcia reverse
  public STS_LIM_FWD: TagsClient;             // in posizione forward (finecorsa)
  public STS_LIM_REV: TagsClient;             // in posizione reverse (finecorsa)
  public STS_ALM_CUM: TagsClient;             // almCUM: cumulativo allarmi
  // #endregion

  // #region STATO (DB107 - INT16)
  public STATE: TagsClient;
  // #endregion

  // #region DATABLOCK INVERTER (DB122 - VFD)
  // Solo i motori sotto inverter hanno questo blocco: per gli altri i tag restano
  // undefined (vfdTags non viene passato al costruttore) e HAS_VFD e' false.
  // I dati scrivibili del blocco sono i due riferimenti (manuale e automatico):
  // misure elettriche e codici di diagnostica sono di sola lettura.
  public VFD_manRef: TagsClient;              // riferimento manuale (%) - REAL
  public VFD_autRef: TagsClient;              // riferimento automatico (%) - REAL
  public VFD_actRef: TagsClient;              // riferimento attuale (%) - REAL, quello seguito dall'inverter
  public VFD_actVelPerc: TagsClient;          // velocita' attuale (%) - REAL
  public VFD_actCurrent: TagsClient;          // corrente attuale (A) - REAL
  public VFD_actPower: TagsClient;            // potenza attuale (kW) - REAL
  public VFD_energy: TagsClient;              // energia totalizzata (kWh) - REAL
  public VFD_actFault: TagsClient;            // codice fault - INT16 (0 = nessun fault)
  public VFD_actWarning: TagsClient;          // codice warning - INT16 (0 = nessun warning)
  // #endregion

  public Shadow: boolean = false;

  public FWD_TEXT: string = "FWD";
  public REV_TEXT: string = "REV";
  public INVERT_REV_FWD: boolean = false;

  // vfdTags e' in coda (dopo stateTag, come il DB122 e' in coda ai datablock del motore)
  // cosi' i motori non sotto inverter continuano a costruirsi senza passarlo.
  constructor(name: string, description: string,
    almTags: TagsClient[] = [], cmdTags: TagsClient[] = [],
    filterTags: TagsClient[] = [], stsTags: TagsClient[] = [],
    stateTag: TagsClient = null, vfdTags: TagsClient[] = []) {

    this.name = name;
    this.description = description;

    this.ALM_MOL = almTags[0];              // bit .0 allarme scatto termico
    this.ALM_MAC = almTags[1];              // bit .1 allarme mancata risposta
    this.ALM_DAC = almTags[2];              // bit .2 allarme sezionatore aperto
    this.ALM_DRV = almTags[3];              // bit .3 allarme drive

    this.CMD_MAN_AUT = cmdTags[0];          // bit .0 man=0, AUT=1 (toggle)
    this.CMD_MAN_FWD = cmdTags[1];          // bit .1 comando manuale forward (toggle)
    this.CMD_MAN_REV = cmdTags[2];          // bit .2 comando manuale reverse (toggle)

    this.FILTER_BYPASS_DAC = filterTags[0]; // bit .0 bypass stato sezionatore
    this.FILTER_CUM = filterTags[1];        // bit .15 filCUM

    this.STS_OUT_FWD = stsTags[0];          // bit .0 comando forward
    this.STS_OUT_REV = stsTags[1];          // bit .1 comando reverse
    this.STS_FWD = stsTags[2];              // bit .2 in marcia forward
    this.STS_REV = stsTags[3];              // bit .3 in marcia reverse
    this.STS_LIM_FWD = stsTags[4];          // bit .4 in posizione forward
    this.STS_LIM_REV = stsTags[5];          // bit .5 in posizione reverse
    this.STS_ALM_CUM = stsTags[6];          // bit .15 cumulativo allarmi

    this.STATE = stateTag;

    this.VFD_manRef = vfdTags[0];           // REAL byte 0  riferimento manuale (%)
    this.VFD_autRef = vfdTags[1];           // REAL byte 4  riferimento automatico (%)
    this.VFD_actRef = vfdTags[2];           // REAL byte 8  riferimento attuale (%)
    this.VFD_actVelPerc = vfdTags[3];       // REAL byte 12 velocita' attuale (%)
    this.VFD_actCurrent = vfdTags[4];       // REAL byte 16 corrente attuale (A)
    this.VFD_actPower = vfdTags[5];         // REAL byte 20 potenza attuale (kW)
    this.VFD_energy = vfdTags[6];           // REAL byte 24 energia (kWh)
    this.VFD_actFault = vfdTags[7];         // INT  byte 36 codice fault
    this.VFD_actWarning = vfdTags[8];       // INT  byte 38 codice warning
  }

  // #region Alias di compatibilita' verso i vecchi nomi usati dalle pagine
  get FDB_FORWARD(): TagsClient { return this.STS_FWD; }
  get FDB_REVERSE(): TagsClient { return this.STS_REV; }
  get FDB_LIMIT_FORWARD(): TagsClient { return this.STS_LIM_FWD; }
  get FDB_LIMIT_REVERSE(): TagsClient { return this.STS_LIM_REV; }
  get ALM_THERMAL_BLOCK(): TagsClient { return this.ALM_MOL; }
  get ALM_BREAKER(): TagsClient { return this.ALM_DAC; }
  get ALM_FAULT_DEVICE(): TagsClient { return this.ALM_DRV; }
  get CMD_STARTFWD(): TagsClient { return this.CMD_MAN_FWD; }
  get CMD_STARTREV(): TagsClient { return this.CMD_MAN_REV; }
  // #endregion

  // Comandi manuali: ManCmdFwd/ManCmdRev sono toggle (true = marcia, false = stop).
  public set CMD_START_FORWARD(value) {
    if (this.CMD_MAN_REV != null)
      this.CMD_MAN_REV.value = false;
    if (this.CMD_MAN_FWD != null)
      this.CMD_MAN_FWD.value = true;
  }

  public set CMD_START_REVERSE(value) {
    if (this.CMD_MAN_FWD != null)
      this.CMD_MAN_FWD.value = false;
    if (this.CMD_MAN_REV != null)
      this.CMD_MAN_REV.value = true;
  }

  public STOP_MANUAL(): void {
    if (this.CMD_MAN_FWD != null)
      this.CMD_MAN_FWD.value = false;
    if (this.CMD_MAN_REV != null)
      this.CMD_MAN_REV.value = false;
  }

  //get SET_HOURLY_MAINTENANCE_THRESHOLD() {
  //  if (this.SET_MAINTENANCE_THRESHOLD == null)
  //    return null;
  //  return this.SET_MAINTENANCE_THRESHOLD.value;
  //}

  //set SET_HOURLY_MAINTENANCE_THRESHOLD(value) {
  //  if (this.SET_MAINTENANCE_THRESHOLD != null)
  //    this.SET_MAINTENANCE_THRESHOLD.value = value;
  //}

  get STATE_STR(): string {
    if (this.STATE == null)
      return "";
    switch (this.STATE.value) {
      case 0:
        return "FERMO IN MANUALE";
      case 1:
        return "FERMO IN AUTOMATICO";
      case 2:
        return "FERMO IN SEMIAUTOMATICO";
      case 3:
        return "ATTESA START IN MANUALE";
      case 4:
        return "ATTESA START IN AUTOMATICO";
      case 5:
        return "ATTESA START IN SEMIAUTOMATICO";
      case 6:
        return "AVVIAMENTO JOG RIUSCITO";
      case 7:
        return "AVVIAMENTO JOG REV RIUSCITO";
      case 8:
        return "TENTATO AVVIAMENTO JOG";
      case 9:
        return "TENTATO AVVIAMENTO JOG REV";
      case 10:
        return "AVVIATO IN MANUALE";
      case 11:
        return "AVVIATO IN AUTOMATICO";
      case 12:
        return "AVVIATO IN SEMIAUTOMATICO";
      case 13:
        return "AVVIATO IN MANUALE REV";
      case 14:
        return "AVVIATO IN AUTOMATICO REV";
      case 15:
        return "AVVIATO IN SEMIAUTOMATICO REV";
      case 16:
        return "AVVIANDO IN MANUALE AVANTI";
      case 17:
        return "AVVIANDO IN MANUALE INDIETRO";
      case 18:
        return "AVVIANDO IN AUTOMATICO AVANTI";
      case 19:
        return "AVVIANDO IN AUTOMATICO INDIETRO";
      case 20:
        return "FERMANDO IN MANUALE AVANTI";
      case 21:
        return "FERMANDO IN MANUALE INDIETRO";
      case 22:
        return "FERMANDO IN AUTOMATICO AVANTI";
      case 23:
        return "FERMANDO IN AUTOMATICO INDIETRO";
      case 50:
        return "DISPOSITIVO DI SICUREZZA";
      case 51:
        return "BLOCCO TERMICO";
      case 52:
        return "SEZIONATORE APERTO";
      case 53:
        return "MANCATA LETTURA POSIZIONE";
      case 54:
        return "TROPPO PIENO IN";
      case 55:
        return "TROPPO PIENO OUT";
      case 56:
        return "CONTROLLO GIRI";
      case 57:
        return "ANTISBANDAMENTO SUPERIORE SX";
      case 58:
        return "ANTISBANDAMENTO INFERIORE SX";
      case 59:
        return "FAULT INVERTER";
      case 60:
        return "MANCATA RISPOSTA CONTATTORE FWD";
      case 61:
        return "MANCATA RISPOSTA CONTATTORE REV";
      case 62:
        return "CONTATTORE BLOCCATO FWD";
      case 63:
        return "CONTATTORE BLOCCATO REV";
      case 64:
        return "ANTISBANDAMENTO SUPERIORE DX";
      case 65:
        return "ANTISBANDAMENTO INFERIORE DX";
      case 66:
        return "DISPOSITIVO DI SICUREZZA LOCALE";
      case 67:
        return "BLOCCO TERMICO ELETTROVENTOLA";
      case 68:
        return "MANCATA RISPOSTA CONTATTORE ELETTROVENTOLA";
      case 103:
        return "FERMO IN MANUALE";
      case 104:
        return "MODALITA' NON SELEZIONATA";
      case 105:
        return "NON ABILITATO";
      case 107:
        return "FERMO IN LOCALE";
      case 108:
        return "TENTATIVO AVVIAMENTO IN LOCALE";
      case 109:
        return "TENTATIVO AVVIAMENTO IN LOCALE REV";
      case 110:
        return "AVVIATO IN LOCALE";
      case 111:
        return "AVVIATO IN LOCALE REV";
      case 112:
        return "FERMO IN MANUALE DA REMOTO";
      case 113:
        return "TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO";
      case 114:
        return "TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO REV";
      case 115:
        return "AVVIATO IN MANUALE DA REMOTO";
      case 116:
        return "AVVIATO IN MANUALE DA REMOTO REV";
      case 117:
        return "ATTESA START IN AUTOMATICO DA REMOTO";
      case 118:
        return "FERMO IN AUTOMATICO DA REMOTO";
      case 119:
        return "TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO";
      case 120:
        return "TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO REV";
      case 121:
        return "AVVIATO IN AUTOMATICO DA REMOTO";
      case 122:
        return "AVVIATO IN AUTOMATICO DA REMOTO REV";
      default:
        return "STATO " + this.STATE.value;
    }
  }

  // Colore dell'etichetta in base alla modalita' descritta da STATE_STR:
  // arancio = manuale/semiautomatico/locale, blu = automatico,
  // nero = modalita' non selezionata o non abilitato, rosso = allarme.
  get LabelStyle(): string {
    if (this.STATE == null)
      return "fill:black;font-weight:normal;cursor:pointer";
    switch (+this.STATE.value) {
      //manuale, semiautomatico, jog e locale
      case 0:   // FERMO IN MANUALE
      case 2:   // FERMO IN SEMIAUTOMATICO
      case 3:   // ATTESA START IN MANUALE
      case 5:   // ATTESA START IN SEMIAUTOMATICO
      case 6:   // AVVIAMENTO JOG RIUSCITO
      case 7:   // AVVIAMENTO JOG REV RIUSCITO
      case 8:   // TENTATO AVVIAMENTO JOG
      case 9:   // TENTATO AVVIAMENTO JOG REV
      case 10:  // AVVIATO IN MANUALE
      case 12:  // AVVIATO IN SEMIAUTOMATICO
      case 13:  // AVVIATO IN MANUALE REV
      case 15:  // AVVIATO IN SEMIAUTOMATICO REV
      case 16:  // AVVIANDO IN MANUALE AVANTI
      case 17:  // AVVIANDO IN MANUALE INDIETRO
      case 20:  // FERMANDO IN MANUALE AVANTI
      case 21:  // FERMANDO IN MANUALE INDIETRO

      case 103: // FERMO IN MANUALE
      case 107: // FERMO IN LOCALE
      case 108: // TENTATIVO AVVIAMENTO IN LOCALE
      case 109: // TENTATIVO AVVIAMENTO IN LOCALE REV
      case 110: // AVVIATO IN LOCALE
      case 111: // AVVIATO IN LOCALE REV
      case 112: // FERMO IN MANUALE DA REMOTO
      case 113: // TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO
      case 114: // TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO REV
      case 115: // AVVIATO IN MANUALE DA REMOTO
      case 116: // AVVIATO IN MANUALE DA REMOTO REV
        return "fill:darkorange;font-weight:bold;cursor:pointer";

      //altro
      case 104: // MODALITA' NON SELEZIONATA
      case 105: // NON ABILITATO
        return "fill:black;font-weight:normal;cursor:pointer";

      //Automatico
      case 1:   // FERMO IN AUTOMATICO
      case 4:   // ATTESA START IN AUTOMATICO
      case 11:  // AVVIATO IN AUTOMATICO
      case 14:  // AVVIATO IN AUTOMATICO REV
      case 18:  // AVVIANDO IN AUTOMATICO AVANTI
      case 19:  // AVVIANDO IN AUTOMATICO INDIETRO
      case 22:  // FERMANDO IN AUTOMATICO AVANTI
      case 23:  // FERMANDO IN AUTOMATICO INDIETRO

      case 117: // ATTESA START IN AUTOMATICO DA REMOTO
      case 118: // FERMO IN AUTOMATICO DA REMOTO
      case 119: // TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO
      case 120: // TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO REV
      case 121: // AVVIATO IN AUTOMATICO DA REMOTO
      case 122: // AVVIATO IN AUTOMATICO DA REMOTO REV
        return "fill:blue;font-weight:normal;cursor:pointer";

      //allarmi (50..68)
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
        return "fill:red;font-weight:bold;cursor:pointer";

      default:
        return "fill:red;font-weight:bold;cursor:pointer";
    }
  }

  // Un bypass/filtro attivo: nel nuovo scambio dati il PLC espone direttamente
  // il cumulativo filCUM; in alternativa vale il singolo BypassDAC.
  get HasBypass(): boolean {
    if (this.FILTER_CUM != null && this.FILTER_CUM.value)
      return true;
    if (this.FILTER_BYPASS_DAC != null && this.FILTER_BYPASS_DAC.value)
      return true;
    return false;
  }

  // In marcia: dedotto dalla macchina a stati del PLC (vedi STATE_STR).
  // Sono "in marcia" anche le fasi transitorie di avviamento e di arresto.
  get RUNNING(): boolean {
    if (this.STATE == null)
      return false;
    switch (+this.STATE.value) {
      //fermo
      case 0:   // FERMO IN MANUALE
      case 1:   // FERMO IN AUTOMATICO
      case 2:   // FERMO IN SEMIAUTOMATICO
      case 3:   // ATTESA START IN MANUALE
      case 4:   // ATTESA START IN AUTOMATICO
      case 5:   // ATTESA START IN SEMIAUTOMATICO

      case 103: // FERMO IN MANUALE
      case 104: // MODALITA' NON SELEZIONATA
      case 105: // NON ABILITATO
      case 107: // FERMO IN LOCALE
      case 112: // FERMO IN MANUALE DA REMOTO
      case 117: // ATTESA START IN AUTOMATICO DA REMOTO
      case 118: // FERMO IN AUTOMATICO DA REMOTO
        return false;

      //in marcia (avviato, in avviamento o in arresto)
      case 6:   // AVVIAMENTO JOG RIUSCITO
      case 7:   // AVVIAMENTO JOG REV RIUSCITO
      case 8:   // TENTATO AVVIAMENTO JOG
      case 9:   // TENTATO AVVIAMENTO JOG REV
      case 10:  // AVVIATO IN MANUALE
      case 11:  // AVVIATO IN AUTOMATICO
      case 12:  // AVVIATO IN SEMIAUTOMATICO
      case 13:  // AVVIATO IN MANUALE REV
      case 14:  // AVVIATO IN AUTOMATICO REV
      case 15:  // AVVIATO IN SEMIAUTOMATICO REV
      case 16:  // AVVIANDO IN MANUALE AVANTI
      case 17:  // AVVIANDO IN MANUALE INDIETRO
      case 18:  // AVVIANDO IN AUTOMATICO AVANTI
      case 19:  // AVVIANDO IN AUTOMATICO INDIETRO
      case 20:  // FERMANDO IN MANUALE AVANTI
      case 21:  // FERMANDO IN MANUALE INDIETRO
      case 22:  // FERMANDO IN AUTOMATICO AVANTI
      case 23:  // FERMANDO IN AUTOMATICO INDIETRO

      case 108: // TENTATIVO AVVIAMENTO IN LOCALE
      case 109: // TENTATIVO AVVIAMENTO IN LOCALE REV
      case 110: // AVVIATO IN LOCALE
      case 111: // AVVIATO IN LOCALE REV
      case 113: // TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO
      case 114: // TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO REV
      case 115: // AVVIATO IN MANUALE DA REMOTO
      case 116: // AVVIATO IN MANUALE DA REMOTO REV
      case 119: // TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO
      case 120: // TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO REV
      case 121: // AVVIATO IN AUTOMATICO DA REMOTO
      case 122: // AVVIATO IN AUTOMATICO DA REMOTO REV
        return true;

      //allarmi (50..68): il motore e' fermo
      default:
        return false;
    }
  }

  // In allarme: dedotto dalla macchina a stati del PLC (codici 50..68).
  get OUT_ALARM(): boolean {
    if (this.STATE == null)
      return false;
    switch (+this.STATE.value) {
      case 50:  // DISPOSITIVO DI SICUREZZA
      case 51:  // BLOCCO TERMICO
      case 52:  // SEZIONATORE APERTO
      case 53:  // MANCATA LETTURA POSIZIONE
      case 54:  // TROPPO PIENO IN
      case 55:  // TROPPO PIENO OUT
      case 56:  // CONTROLLO GIRI
      case 57:  // ANTISBANDAMENTO SUPERIORE SX
      case 58:  // ANTISBANDAMENTO INFERIORE SX
      case 59:  // FAULT INVERTER
      case 60:  // MANCATA RISPOSTA CONTATTORE FWD
      case 61:  // MANCATA RISPOSTA CONTATTORE REV
      case 62:  // CONTATTORE BLOCCATO FWD
      case 63:  // CONTATTORE BLOCCATO REV
      case 64:  // ANTISBANDAMENTO SUPERIORE DX
      case 65:  // ANTISBANDAMENTO INFERIORE DX
      case 66:  // DISPOSITIVO DI SICUREZZA LOCALE
      case 67:  // BLOCCO TERMICO ELETTROVENTOLA
      case 68:  // MANCATA RISPOSTA CONTATTORE ELETTROVENTOLA
        return true;

      default:
        return false;
    }
  }

  // #region INVERTER (DB122 - VFD)

  // Vero solo per i motori sotto inverter: il popup usa questo per mostrare la tab Inverter.
  get HAS_VFD(): boolean {
    return this.VFD_manRef != null;
  }

  // I tag sono undefined prima della prima lettura SignalR: i valori vanno letti null-safe.
  private static vfdNum(tag: TagsClient): number {
    if (tag == null)
      return 0;
    const value = Number(tag.value);
    return isFinite(value) ? value : 0;
  }

  get VFD_MANUAL_REF(): number { return MotorModel.vfdNum(this.VFD_manRef); }        // %
  get VFD_AUTO_REF(): number { return MotorModel.vfdNum(this.VFD_autRef); }          // %
  get VFD_ACTUAL_REF(): number { return MotorModel.vfdNum(this.VFD_actRef); }        // %
  get VFD_ACTUAL_SPEED(): number { return MotorModel.vfdNum(this.VFD_actVelPerc); }  // %
  get VFD_ACTUAL_CURRENT(): number { return MotorModel.vfdNum(this.VFD_actCurrent); }// A
  get VFD_ACTUAL_POWER(): number { return MotorModel.vfdNum(this.VFD_actPower); }    // kW
  get VFD_ENERGY(): number { return MotorModel.vfdNum(this.VFD_energy); }            // kWh
  get VFD_FAULT_CODE(): number { return MotorModel.vfdNum(this.VFD_actFault); }
  get VFD_WARNING_CODE(): number { return MotorModel.vfdNum(this.VFD_actWarning); }

  // I due riferimenti sono percentuali (0 - 100) e sono entrambi scrivibili.
  set VFD_MANUAL_REF(value: number) {
    if (this.VFD_manRef != null)
      this.VFD_manRef.value = value;
  }

  set VFD_AUTO_REF(value: number) {
    if (this.VFD_autRef != null)
      this.VFD_autRef.value = value;
  }

  get VFD_HAS_FAULT(): boolean {
    return this.VFD_FAULT_CODE != 0;
  }

  get VFD_HAS_WARNING(): boolean {
    return this.VFD_WARNING_CODE != 0;
  }

  get VFD_STATE_STR(): string {
    if (this.VFD_HAS_FAULT)
      return "FAULT " + this.VFD_FAULT_CODE;
    if (this.VFD_HAS_WARNING)
      return "WARNING " + this.VFD_WARNING_CODE;
    return "NESSUNA SEGNALAZIONE";
  }

  // Colore della segnalazione: rosso = fault, arancio = warning, grigio = a posto.
  get VFD_StateColor(): string {
    if (this.VFD_HAS_FAULT)
      return "red";
    if (this.VFD_HAS_WARNING)
      return "orange";
    return "gray";
  }

  // #endregion

  // #region SVG (colore icona in base allo stato)
  // Stato grafico: 0 = fermo (blu), 1 = marcia in automatico (verde),
  // 2 = marcia in manuale/semiautomatico/locale (giallo), 3 = allarme.
  // Il 3 diventa rosso nei getter _ALM e blu negli altri, cosi' l'<animate> lampeggia.
  // La classificazione e' quella di FORNO2 e VEBAD (identica nelle due applicazioni):
  // dipende SOLO dalla parola di stato del PLC, mai dai bit di comando.
  private get GfxState(): number {
    if (this.STATE == null)
      return 0;
    switch (+this.STATE.value) {
      //fermo, in attesa, in avviamento/arresto, non abilitato
      case 0:   // FERMO IN MANUALE
      case 1:   // FERMO IN AUTOMATICO
      case 2:   // FERMO IN SEMIAUTOMATICO
      case 3:   // ATTESA START IN MANUALE
      case 4:   // ATTESA START IN AUTOMATICO
      case 5:   // ATTESA START IN SEMIAUTOMATICO
      case 16:  // AVVIANDO IN MANUALE AVANTI
      case 17:  // AVVIANDO IN MANUALE INDIETRO
      case 18:  // AVVIANDO IN AUTOMATICO AVANTI
      case 19:  // AVVIANDO IN AUTOMATICO INDIETRO
      case 20:  // FERMANDO IN MANUALE AVANTI
      case 21:  // FERMANDO IN MANUALE INDIETRO
      case 22:  // FERMANDO IN AUTOMATICO AVANTI
      case 23:  // FERMANDO IN AUTOMATICO INDIETRO

      case 103: // FERMO IN MANUALE
      case 104: // MODALITA' NON SELEZIONATA
      case 105: // NON ABILITATO
      case 107: // FERMO IN LOCALE
      case 112: // FERMO IN MANUALE DA REMOTO
      case 117: // ATTESA START IN AUTOMATICO DA REMOTO
      case 118: // FERMO IN AUTOMATICO DA REMOTO
        return 0;

      //in marcia in automatico (il jog e' verde come in FORNO2/VEBAD)
      case 6:   // AVVIAMENTO JOG RIUSCITO
      case 7:   // AVVIAMENTO JOG REV RIUSCITO
      case 8:   // TENTATO AVVIAMENTO JOG
      case 9:   // TENTATO AVVIAMENTO JOG REV
      case 11:  // AVVIATO IN AUTOMATICO
      case 14:  // AVVIATO IN AUTOMATICO REV

      case 119: // TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO
      case 120: // TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO REV
      case 121: // AVVIATO IN AUTOMATICO DA REMOTO
      case 122: // AVVIATO IN AUTOMATICO DA REMOTO REV
        return 1;

      //in marcia in manuale, semiautomatico, locale o manuale da remoto
      case 10:  // AVVIATO IN MANUALE
      case 12:  // AVVIATO IN SEMIAUTOMATICO
      case 13:  // AVVIATO IN MANUALE REV
      case 15:  // AVVIATO IN SEMIAUTOMATICO REV

      case 108: // TENTATIVO AVVIAMENTO IN LOCALE
      case 109: // TENTATIVO AVVIAMENTO IN LOCALE REV
      case 110: // AVVIATO IN LOCALE
      case 111: // AVVIATO IN LOCALE REV
      case 113: // TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO
      case 114: // TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO REV
      case 115: // AVVIATO IN MANUALE DA REMOTO
      case 116: // AVVIATO IN MANUALE DA REMOTO REV
        return 2;

      //come in FORNO2/VEBAD: giallo se in marcia, altrimenti allarme
      case 70:
        return this.RUNNING ? 2 : 3;

      //allarmi (50..68) e stati non previsti
      default:
        return 3;
    }
  }

  private svgByState(prefix: string, withAlarm: boolean): string {
    const base = "../../assets/svg/groov/";
    switch (withAlarm ? this.GfxState : (this.GfxState == 3 ? 0 : this.GfxState)) {
      case 1:
        return base + prefix + "_green.svg";
      case 2:
        return base + prefix + "_yellow.svg";
      case 3:
        return base + prefix + "_red.svg";
      default:
        return base + prefix + (prefix == "mixer1" ? "_blu.svg" : "_blue.svg");
    }
  }

  get SVG_PUMP(): string { return this.svgByState("pump1", false); }
  get SVG_PUMP_ALM(): string { return this.svgByState("pump1", true); }
  get SVG_MIXER(): string { return this.svgByState("mixer1", false); }
  get SVG_MIXER_ALM(): string { return this.svgByState("mixer1", true); }
  get SVG_BLOWER(): string { return this.svgByState("blower", false); }
  get SVG_BLOWER_ALM(): string { return this.svgByState("blower", true); }
  get SVG_MOTOR_BASE(): string { return this.svgByState("motor2_base", false); }
  get SVG_MOTOR_BASE_ALM(): string { return this.svgByState("motor2_base", true); }

  // Cappa di aspirazione (F68 del Final Dryer, B79 del Burley Dryer): al posto
  // dell'icona del ventilatore c'e' un disegno suo, che sta in assets/svg/custom.
  // Stessa classificazione di svgByState, solo che i file non seguono lo schema
  // <prefisso>_<colore>.svg di svg/groov e il fermo si chiama _off e non _blue.
  // Come per gli altri device il getter senza allarme torna il disegno di fermo anche
  // a stato 3: e' quello che fa lampeggiare l'<animate>, che negli altri stati resta
  // fermo perche' i due getter tornano lo stesso file.
  private svgHood(withAlarm: boolean): string {
    const base = "../../assets/svg/custom/cappa_aspirazione_";
    switch (withAlarm ? this.GfxState : (this.GfxState == 3 ? 0 : this.GfxState)) {
      case 1:   // marcia in automatico
        return base + "green.svg";
      case 2:   // marcia in manuale / semiautomatico / locale
        return base + "yellow.svg";
      case 3:   // allarme
        return base + "alarm.svg";
      default:  // fermo
        return base + "off.svg";
    }
  }

  get SVG_HOOD(): string { return this.svgHood(false); }
  get SVG_HOOD_ALM(): string { return this.svgHood(true); }

  // Icone disegnate per la pagina DCC. Qui il colore sta in mezzo al nome
  // (motor2_<colore>_DCC.svg), quindi svgByState non va bene.
  private svgDcc(withAlarm: boolean): string {
    const base = "../../assets/svg/groov/motor2_";
    switch (withAlarm ? this.GfxState : (this.GfxState == 3 ? 0 : this.GfxState)) {
      case 1:
        return base + "green_DCC.svg";
      case 2:
        return base + "yellow_DCC.svg";
      case 3:
        return base + "red_DCC.svg";
      default:
        return base + "blue_DCC.svg";
    }
  }
  get SVG_MOTOR_DCC(): string { return this.svgDcc(false); }
  get SVG_MOTOR_DCC_ALM(): string { return this.svgDcc(true); }

  get SVG_MOTOR(): string {
    if (this.Shadow && this.GfxState == 0)
      return "../../assets/svg/groov/motor2_shadow_blue.svg";
    if (this.Shadow && this.GfxState == 1)
      return "../../assets/svg/groov/motor2_shadow_green.svg";
    return this.svgByState("motor2", false);
  }

  get SVG_MOTOR_ALM(): string {
    if (this.Shadow) {
      switch (this.GfxState) {
        case 3:
          return "../../assets/svg/groov/motor2_shadow_red.svg";
        case 1:
          return "../../assets/svg/groov/motor2_shadow_green.svg";
        case 2:
          return "../../assets/svg/groov/motor2_yellow.svg";
        default:
          return "../../assets/svg/groov/motor2_shadow_blue.svg";
      }
    }
    return this.svgByState("motor2", true);
  }
  // #endregion SVG

}
