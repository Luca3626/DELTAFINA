import { TagsClient } from 'src/app/tags/tags-client';

// Lo slicer non e' un device delle utenze: i motori e le valvole della linea stanno
// in MotorList/ValveList. Questo modello raccoglie i tag dell'impianto slicer, che
// arrivano da due datablock diversi:
//   DB121 - TO_HMI : fotocellule (PE), finecorsa (LS) e avaria di sistema (AL)
//   DB190 - VAR    : valori di produzione (INT16 - pesi, flussi, contatori)
// Le due linee (Virginia e Burley) hanno lo stesso identico impianto e cambiano solo
// le sigle dei tag, quindi condividono questo modello: i nomi delle proprieta' sono
// neutri e il commento accanto riporta la sigla Virginia / Burley.
export class SlicerModel {

  public name: string;
  public description: string;

  // #region DATABLOCK ALLARMI (DB121 - TO_HMI, gruppo AL)
  public ALM_SYSTEM_FAILURE: TagsClient;      // VSL_System_AL_Flsr  / BSL_System_AL_Flsr   avaria impianto slicer (H28.1)
  // #endregion

  // #region DATABLOCK CONSENSO (DB121 - TO_HMI, gruppo CX)
  public CX_LINE_CONSENT: TagsClient;         // VSL_CX (DB121.dbx0.3) / BSL_CX (DB121.dbx0.4)  consenso di linea
  // #endregion

  // #region DATABLOCK FOTOCELLULE (DB121 - TO_HMI, gruppo PE)
  public PE_WEIGH_BELT: TagsClient;           // VSL_WBelt_PE        / BSL_WBelt_PE         balla in posizione sul nastro pesatore (B1)
  public PE_SLICER_BELT: TagsClient;          // VSL_SBelt_PE        / BSL_SBelt_PE         balla in posizione sul nastro slicer (B3.1)
  public PE_PUSHER_CLEAR: TagsClient;         // VSL_Pushr_PE_Clr    / BSL_Pushr_PE_Clr     percorso spintore libero (B3.2)
  public PE_SLICER_BELT_MEAS: TagsClient;     // VSL_SBelt_PE_Lg     / BSL_SBelt_PE_Lg      balla in posizione di misura (B3.3)
  public PE_ISC_CONV_1: TagsClient;           // VISC_V01_PE         / BISC_B03_PE          #1 conveyor
  public PE_ISC_CONV_2: TagsClient;           // VISC_V02_PE         / BISC_B04_PE          #2 conveyor
  public PE_ISC_CONV_3: TagsClient;           // VISC_V03_PE         / BISC_B05_PE          #3 conveyor
  public PE_ISC_INV_1: TagsClient;            // VISC_V04_PE         / BISC_B06_PE          nastro del ribaltatore
  public PE_ISC_CONV_4: TagsClient;           // VISC_V07_PE         / BISC_B09_PE          #4 conveyor
  public PE_ISC_CONV_5: TagsClient;           // VISC_V08_PE         / BISC_B10_PE          #5 conveyor
  public PE_ISC_INV_2: TagsClient;            // VISC_V06_PE         / BISC_B08_PE          nastro del ribaltatore
  // #endregion

  // #region DATABLOCK FINECORSA (DB121 - TO_HMI, gruppo LS)
  public LS_DOORS_INTERLOCK: TagsClient;      // VSL_System_LS_Drs   / BSL_System_LS_Drs    interblocco porte (K16A)
  public LS_PUSHER_UP: TagsClient;            // VSL_Pushr_LS_Up     / BSL_Pushr_LS_Up      spintore in posizione alta (S3.7)
  public LS_PUSHER_DOWN: TagsClient;          // VSL_Pushr_LS_Dwn    / BSL_Pushr_LS_Dwn     spintore in posizione bassa (S3.8)
  public LS_RETAINER_HOME: TagsClient;        // VSL_Retnr_LS_Home   / BSL_Retnr_LS_Home    ritentore a riposo (S5.4)
  public LS_RETAINER_REV: TagsClient;         // VSL_Retnr_LS_REV    / BSL_Retnr_LS_Rev     ritentore in posizione reverse (S5.5)
  public LS_RETAINER_UP: TagsClient;          // VSL_Retnr_LS_Up     / BSL_Retnr_LS_Up      ritentore in posizione alta (S5.6)
  public LS_RETAINER_DOWN: TagsClient;        // VSL_Retnr_LS_Dwn    / BSL_Retnr_LS_Dwn     ritentore in posizione bassa (S5.7)
  public LS_INVERTER_CCW: TagsClient;         // VISC_V05_LS_CounterClkws / BISC_B07_LS_CounterClkws  ribaltatore in posizione antioraria
  public LS_INVERTER_CW: TagsClient;          // VISC_V05_LS_Clkws        / BISC_B07_LS_Clkws         ribaltatore in posizione oraria
  // #endregion

  // #region DATABLOCK SELTTORE (DB121 - TO_HMI)
  public SELECTOR: TagsClient;
   // #endregion

  // #region DATABLOCK VALORI DI PRODUZIONE (DB190 - VAR, INT16)
  public SET_FLOW_RATE: TagsClient;           // V71   / V371    setpoint flusso (kg/h)
  public FDB_BELT_WEIGHT: TagsClient;         // V78   / V378    peso al nastro (kg)
  public FDB_TOTALIZER: TagsClient;           // V79   / V379    totalizzatore (kg)
  public FDB_BOX_COUNT: TagsClient;           // V90   / V390    numero casse
  public FDB_BOX_AVG_WEIGHT: TagsClient;      // V422  / V222    peso medio casse (kg)
  public FDB_FLOW_RATE: TagsClient;           // V427  / V227    flusso attuale (kg/h)
  public FDB_CUT_COUNT: TagsClient;           // V1100 / V1101   numero di tagli
  // #endregion

  // I datablock arrivano come array dei soli tag usati, nell'ordine indicato sotto.
  // Gli slot mancanti restano undefined (una linea puo' non avere un tag).
  constructor(name: string, description: string,
    almTags: TagsClient[] = [], peTags: TagsClient[] = [],
    lsTags: TagsClient[] = [], varTags: TagsClient[] = [],
    cxTags: TagsClient[] = []) {

    this.name = name;
    this.description = description;

    this.ALM_SYSTEM_FAILURE = almTags[0];     // avaria impianto slicer

    this.CX_LINE_CONSENT = cxTags[0];         // consenso di linea

    this.PE_WEIGH_BELT = peTags[0];           // nastro pesatore
    this.PE_SLICER_BELT = peTags[1];          // nastro slicer
    this.PE_PUSHER_CLEAR = peTags[2];         // percorso spintore libero
    this.PE_SLICER_BELT_MEAS = peTags[3];     // posizione di misura
    this.PE_ISC_CONV_1 = peTags[4];           // #1 conveyor
    this.PE_ISC_CONV_2 = peTags[5];           // #2 conveyor
    this.PE_ISC_CONV_3 = peTags[6];           // #3 conveyor
    this.PE_ISC_INV_1 = peTags[7];            // nastro ribaltatore
    this.PE_ISC_CONV_4 = peTags[8];           // #4 conveyor
    this.PE_ISC_CONV_5 = peTags[9];           // #5 conveyor
    this.PE_ISC_INV_2 = peTags[10];           // nastro ribaltatore

    this.LS_DOORS_INTERLOCK = lsTags[0];      // interblocco porte
    this.LS_PUSHER_UP = lsTags[1];            // spintore in alto
    this.LS_PUSHER_DOWN = lsTags[2];          // spintore in basso
    this.LS_RETAINER_HOME = lsTags[3];        // ritentore a riposo
    this.LS_RETAINER_REV = lsTags[4];         // ritentore in reverse
    this.LS_RETAINER_UP = lsTags[5];          // ritentore in alto
    this.LS_RETAINER_DOWN = lsTags[6];        // ritentore in basso
    this.LS_INVERTER_CCW = lsTags[7];         // ribaltatore antiorario
    this.LS_INVERTER_CW = lsTags[8];          // ribaltatore orario

    this.SET_FLOW_RATE = varTags[0];          // setpoint flusso
    this.FDB_BELT_WEIGHT = varTags[1];        // peso al nastro
    this.FDB_TOTALIZER = varTags[2];          // totalizzatore
    this.FDB_BOX_COUNT = varTags[3];          // numero casse
    this.FDB_BOX_AVG_WEIGHT = varTags[4];     // peso medio casse
    this.FDB_FLOW_RATE = varTags[5];          // flusso attuale
    this.FDB_CUT_COUNT = varTags[6];          // numero di tagli
    this.SELECTOR = varTags[7]                // Stato selettore fisico ON/OFF
  }

  // #region Stato fotocellule (balla in posizione)

  get BALE_ON_WEIGH_BELT(): boolean {
    if (this.PE_WEIGH_BELT != null && this.PE_WEIGH_BELT.value)
      return true;
    return false;
  }

  get BALE_ON_SLICER_BELT(): boolean {
    if (this.PE_SLICER_BELT != null && this.PE_SLICER_BELT.value)
      return true;
    return false;
  }

  get PUSHER_PATH_CLEAR(): boolean {
    if (this.PE_PUSHER_CLEAR != null && this.PE_PUSHER_CLEAR.value)
      return true;
    return false;
  }

  get BALE_IN_MEASURING_POS(): boolean {
    if (this.PE_SLICER_BELT_MEAS != null && this.PE_SLICER_BELT_MEAS.value)
      return true;
    return false;
  }

  get BALE_ON_CONV_1(): boolean {
    if (this.PE_ISC_CONV_1 != null && this.PE_ISC_CONV_1.value)
      return true;
    return false;
  }

  get BALE_ON_CONV_2(): boolean {
    if (this.PE_ISC_CONV_2 != null && this.PE_ISC_CONV_2.value)
      return true;
    return false;
  }

  get BALE_ON_CONV_3(): boolean {
    if (this.PE_ISC_CONV_3 != null && this.PE_ISC_CONV_3.value)
      return true;
    return false;
  }

  get BALE_ON_CONV_4(): boolean {
    if (this.PE_ISC_CONV_4 != null && this.PE_ISC_CONV_4.value)
      return true;
    return false;
  }

  get BALE_ON_CONV_5(): boolean {
    if (this.PE_ISC_CONV_5 != null && this.PE_ISC_CONV_5.value)
      return true;
    return false;
  }

  get BALE_ON_INV_1(): boolean {
    if (this.PE_ISC_INV_1 != null && this.PE_ISC_INV_1.value)
      return true;
    return false;
  }

  get BALE_ON_INV_2(): boolean {
    if (this.PE_ISC_INV_2 != null && this.PE_ISC_INV_2.value)
      return true;
    return false;
  }

  // #endregion

  // #region Stato finecorsa (spintore, ritentore, ribaltatore, porte)

  get PUSHER_UP(): boolean {
    if (this.LS_PUSHER_UP != null && this.LS_PUSHER_UP.value)
      return true;
    return false;
  }

  get PUSHER_DOWN(): boolean {
    if (this.LS_PUSHER_DOWN != null && this.LS_PUSHER_DOWN.value)
      return true;
    return false;
  }

  get RETAINER_HOME(): boolean {
    if (this.LS_RETAINER_HOME != null && this.LS_RETAINER_HOME.value)
      return true;
    return false;
  }

  get RETAINER_REV(): boolean {
    if (this.LS_RETAINER_REV != null && this.LS_RETAINER_REV.value)
      return true;
    return false;
  }

  get RETAINER_UP(): boolean {
    if (this.LS_RETAINER_UP != null && this.LS_RETAINER_UP.value)
      return true;
    return false;
  }

  get RETAINER_DOWN(): boolean {
    if (this.LS_RETAINER_DOWN != null && this.LS_RETAINER_DOWN.value)
      return true;
    return false;
  }

  get INVERTER_CW(): boolean {
    if (this.LS_INVERTER_CW != null && this.LS_INVERTER_CW.value)
      return true;
    return false;
  }

  get INVERTER_CCW(): boolean {
    if (this.LS_INVERTER_CCW != null && this.LS_INVERTER_CCW.value)
      return true;
    return false;
  }

  // Interblocco porte: bit dal PLC, riportato senza interpretazione.
  get DOORS_INTERLOCK(): boolean {
    if (this.LS_DOORS_INTERLOCK != null && this.LS_DOORS_INTERLOCK.value)
      return true;
    return false;
  }

  // #endregion

  // #region Consenso di linea

  // Consenso dato dal PLC alla linea slicer: true = consenso attivo (maschera verde
  // nel sinottico), false = consenso assente (maschera grigia).
  get LINE_CONSENT(): boolean {
    if (this.CX_LINE_CONSENT != null && this.CX_LINE_CONSENT.value)
      return true;
    return false;
  }

  // #endregion

  // #region Allarme

  get InAlarm(): boolean {
    if (this.ALM_SYSTEM_FAILURE != null && this.ALM_SYSTEM_FAILURE.value)
      return true;
    return false;
  }

  get STATE_STR(): string {
    if (this.InAlarm)
      return "AVARIA IMPIANTO";
    return "IMPIANTO OK";
  }

  // Stessa convenzione di motori e valvole: rosso in allarme, nero altrimenti.
  get LabelStyle(): string {
    if (this.InAlarm)
      return "fill:red;font-weight:bold;cursor:pointer";
    return "fill:black;font-weight:normal;cursor:pointer";
  }

  // #endregion

  // #region Valori di produzione
  // Sono letture, tranne il totalizzatore e il numero casse: quelli sono contatori di
  // linea che l'operatore azzera dalla finestra produzione, quindi hanno anche il setter.

  get BELT_WEIGHT() {
    if (this.FDB_BELT_WEIGHT == null)
      return null;
    return this.FDB_BELT_WEIGHT.value;
  }

  get TOTALIZER() {
    if (this.FDB_TOTALIZER == null)
      return null;
    return this.FDB_TOTALIZER.value;
  }

  set TOTALIZER(value) {
    if (this.FDB_TOTALIZER != null)
      this.FDB_TOTALIZER.value = value;
  }

  get BOX_COUNT() {
    if (this.FDB_BOX_COUNT == null)
      return null;
    return this.FDB_BOX_COUNT.value;
  }

  set BOX_COUNT(value) {
    if (this.FDB_BOX_COUNT != null)
      this.FDB_BOX_COUNT.value = value;
  }

  get BOX_AVG_WEIGHT() {
    if (this.FDB_BOX_AVG_WEIGHT == null)
      return null;
    return this.FDB_BOX_AVG_WEIGHT.value;
  }

  get FLOW_RATE() {
    if (this.FDB_FLOW_RATE == null)
      return null;
    return this.FDB_FLOW_RATE.value;
  }

  get CUT_COUNT() {
    if (this.FDB_CUT_COUNT == null)
      return null;
    return this.FDB_CUT_COUNT.value;
  }

  // Entrambe le linee hanno il conteggio casse: resta per nascondere il dato se un
  // domani una linea venisse costruita senza quel tag.
  get HAS_BOX_COUNT(): boolean {
    if (this.FDB_BOX_COUNT != null)
      return true;
    return false;
  }

  // #endregion

  // #region Scritture verso il PLC (setpoint di flusso; i contatori azzerabili stanno
  // fra i valori di produzione, accanto alla loro lettura)

  get FLOW_RATE_SETPOINT() {
    if (this.SET_FLOW_RATE == null)
      return null;
    return this.SET_FLOW_RATE.value;
  }

  set FLOW_RATE_SETPOINT(value) {
    if (this.SET_FLOW_RATE != null)
      this.SET_FLOW_RATE.value = value;
  }

  // #endregion

  //#region SELETTORE

  get SELETTORE(): boolean {
    if (this.SELECTOR != null && this.SELECTOR.value)
      return true;
    return false;
  }
  //#endregion

}
