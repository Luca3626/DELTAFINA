import { TagsClient } from 'src/app/tags/tags-client';

// I sili sono quattro (S1..S4) e condividono questo modello: i motori e le valvole
// della zona stanno in MotorList/ValveList, qui ci sono i tag del silo come impianto.
//   DB121 - TO_HMI : posizione della navetta di carico (NCS) e delle due X-Shuttle
//                    di linea che alimentano il silo
//   DB190 - VAR    : totalizzatore del tabacco entrato dagli slicer (INT16)
// Le X-Shuttle servono due sili per volta (S1,2 oppure S3,4), quindi lo stesso tag
// arriva a due modelli: sono riferimenti allo stesso TagsClient, non copie.
// I tag comuni ai quattro sili (hopper feeder pieni, totalizzatore del nastro
// pesatore) non appartengono a un singolo silo e stanno in SiloList.
export class SiloModel {

  public name: string;
  public description: string;

  // #region NAVETTA DI CARICO SILO (DB121 - TO_HMI, gruppo PE)
  public LS_NCS_FWD: TagsClient;              // NCS1_F12_FWD_PE / NCS2_F18_FWD_PE / NCS3_F23_FWD_PE / NCS4_F24_FED_PE
  public LS_NCS_MID: TagsClient;              // NCS1_F12_MID_PE / NCS2_F18_MID_PE / NCS3_F23_MID_PE / NCS4_F24_MID_PE
  public LS_NCS_REV: TagsClient;              // NCS1_F12_REV_PE / NCS2_F18_REV_PE / NCS3_F23_REV_PE / NCS4_F24_REV_PE
  // #endregion

  // #region X-SHUTTLE DI LINEA (DB121 - TO_HMI, gruppo PE) - condivise fra due sili
  public LS_XS_VIRGINIA_FWD: TagsClient;      // V12c_F05_FWD_PE (S1,2) / V11c_F03_FWD_PE (S3,4)
  public LS_XS_VIRGINIA_REV: TagsClient;      // V12c_F05_REV_PE (S1,2) / V11c_F03_REV_PE (S3,4)
  public LS_XS_BURLEY_FWD: TagsClient;        // B19c_F08_FWD_PE (S1,2) / B20c_F10_FWD_PE (S3,4)
  public LS_XS_BURLEY_REV: TagsClient;        // B19c_F08_REV_PE (S1,2) / B20c_F10_REV_PE (S3,4)
  // #endregion

  // #region VALORI DI PRODUZIONE (DB190 - VAR, INT16)
  public FDB_INFEED_TOTALIZER: TagsClient;    // V301 / V302 / V303 / V304   kg entrati dagli slicer
  // #endregion

  // #region SETPOINT DI RIEMPIMENTO (DB190 - VAR, INT16)
  public SET_FILL_TYPE: TagsClient;           // V1111 / V1112 / V1113 / V1114   tipo di riempimento del singolo silo
  public SET_FILL_TYPE_GLOBAL: TagsClient;    // V310   tipo di riempimento comune ai quattro sili.
                                              //        Lo assegna SiloList dopo aver costruito i sili: e' un
                                              //        riferimento allo stesso TagsClient, non una copia, e serve
                                              //        al silo per sapere se il proprio setpoint e' quello che
                                              //        comanda davvero (vedi FILL_TYPE_ACTIVE).
  // #endregion

  // I datablock arrivano come array dei soli tag usati, nell'ordine indicato sotto.
  constructor(name: string, description: string,
    ncsTags: TagsClient[] = [], xsTags: TagsClient[] = [],
    varTags: TagsClient[] = []) {

    this.name = name;
    this.description = description;

    this.LS_NCS_FWD = ncsTags[0];             // navetta in posizione forward
    this.LS_NCS_MID = ncsTags[1];             // navetta in posizione intermedia
    this.LS_NCS_REV = ncsTags[2];             // navetta in posizione reverse

    this.LS_XS_VIRGINIA_FWD = xsTags[0];      // X-Shuttle linea Virginia, forward
    this.LS_XS_VIRGINIA_REV = xsTags[1];      // X-Shuttle linea Virginia, reverse
    this.LS_XS_BURLEY_FWD = xsTags[2];        // X-Shuttle linea Burley, forward
    this.LS_XS_BURLEY_REV = xsTags[3];        // X-Shuttle linea Burley, reverse

    this.FDB_INFEED_TOTALIZER = varTags[0];   // totalizzatore infeed dagli slicer
    this.SET_FILL_TYPE = varTags[1];          // tipo di riempimento del singolo silo
  }

  // #region Stato della navetta di carico

  get SHUTTLE_FWD(): boolean {
    if (this.LS_NCS_FWD != null && this.LS_NCS_FWD.value)
      return true;
    return false;
  }

  get SHUTTLE_MID(): boolean {
    if (this.LS_NCS_MID != null && this.LS_NCS_MID.value)
      return true;
    return false;
  }

  get SHUTTLE_REV(): boolean {
    if (this.LS_NCS_REV != null && this.LS_NCS_REV.value)
      return true;
    return false;
  }

  // La navetta e' in una posizione nota quando uno dei tre finecorsa risponde:
  // in transito non ne risponde nessuno.
  get SHUTTLE_IN_POSITION(): boolean {
    if (this.SHUTTLE_FWD)
      return true;
    if (this.SHUTTLE_MID)
      return true;
    if (this.SHUTTLE_REV)
      return true;
    return false;
  }

  get SHUTTLE_POSITION_STR(): string {
    if (this.SHUTTLE_FWD)
      return "AVANTI";
    if (this.SHUTTLE_MID)
      return "INTERMEDIA";
    if (this.SHUTTLE_REV)
      return "INDIETRO";
    return "IN TRANSITO";
  }

  // #endregion

  // #region Stato delle X-Shuttle di linea

  get XS_VIRGINIA_FWD(): boolean {
    if (this.LS_XS_VIRGINIA_FWD != null && this.LS_XS_VIRGINIA_FWD.value)
      return true;
    return false;
  }

  get XS_VIRGINIA_REV(): boolean {
    if (this.LS_XS_VIRGINIA_REV != null && this.LS_XS_VIRGINIA_REV.value)
      return true;
    return false;
  }

  get XS_BURLEY_FWD(): boolean {
    if (this.LS_XS_BURLEY_FWD != null && this.LS_XS_BURLEY_FWD.value)
      return true;
    return false;
  }

  get XS_BURLEY_REV(): boolean {
    if (this.LS_XS_BURLEY_REV != null && this.LS_XS_BURLEY_REV.value)
      return true;
    return false;
  }

  // #endregion

  // #region Valori di produzione (letture)

  get INFEED_TOTALIZER() {
    if (this.FDB_INFEED_TOTALIZER == null)
      return null;
    return this.FDB_INFEED_TOTALIZER.value;
  }

  // #endregion

  // #region Tipo di riempimento del singolo silo (V1111..V1114)
  // Il setpoint del singolo silo vale solo quando il setpoint globale dei quattro
  // sili (SiloList.SET_FILL_TYPE_GLOBAL, V310) e' a zero: altrimenti comanda quello.

  get FILL_TYPE(): number {
    if (this.SET_FILL_TYPE == null)
      return null;
    const value = Number(this.SET_FILL_TYPE.value);
    return isFinite(value) ? value : null;
  }

  set FILL_TYPE(value: number) {
    if (this.SET_FILL_TYPE != null)
      this.SET_FILL_TYPE.value = value;
  }

  get FILL_TYPE_STR(): string {
    return SiloModel.fillTypeStr(this.FILL_TYPE);
  }

  // Tipo di riempimento che il PLC sta davvero applicando a questo silo: con il
  // setpoint globale (V310) a zero comanda il setpoint del singolo silo, altrimenti
  // comanda il globale e i V1111..V1114 restano quelli che sono, ignorati.
  get FILL_TYPE_ACTIVE(): number {
    const global = this.GLOBAL_FILL_TYPE;
    if (global != null && global > 0)
      return global;
    return this.FILL_TYPE;
  }

  get FILL_TYPE_ACTIVE_STR(): string {
    return SiloModel.fillTypeStr(this.FILL_TYPE_ACTIVE);
  }

  // Lettura del setpoint globale, null-safe come il resto: se SiloList non ha
  // ancora passato il riferimento a V310 vale il setpoint del singolo silo.
  private get GLOBAL_FILL_TYPE(): number {
    if (this.SET_FILL_TYPE_GLOBAL == null)
      return null;
    const value = Number(this.SET_FILL_TYPE_GLOBAL.value);
    return isFinite(value) ? value : null;
  }

  // Decodifica dei codici di riempimento, condivisa con il setpoint globale che usa
  // la stessa codifica. Il PLC tratta come 4/4 qualunque valore da 3 in su.
  static fillTypeStr(value: number): string {
    if (value == null)
      return "";
    if (value >= 3)
      return "4/4";
    switch (value) {
      case 1: return "1/4";
      case 2: return "2/4";
      default: return "";
    }
  }

  // #endregion


  get STATE_STR(): string {
    return this.SHUTTLE_POSITION_STR;
  }

}
