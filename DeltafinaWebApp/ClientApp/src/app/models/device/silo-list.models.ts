import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { SiloModel } from './silo.models';
import { TagsClient } from 'src/app/tags/tags-client';

export class SiloList {

  silos: Array<SiloModel> = new Array<SiloModel>();

  // #region LISTA SILI
  public S1: SiloModel;
  public S2: SiloModel;
  public S3: SiloModel;
  public S4: SiloModel;
  // #endregion

  // #region IMPIANTO (DB121 e DB190 - tag comuni ai quattro sili, non di un singolo silo)
  public PE_FD2_HOPPER_FULL: TagsClient;      // FD2_V27_PE  {X0245} Hopper Feeder_Incline Belt_Hopper FULL
  public PE_FD1_HOPPER_FULL: TagsClient;      // FD1_B32_PE  {X0248} Hopper Feeder_Incline Belt_Hopper FULL
  public PE_BFD_HOPPER_FULL: TagsClient;      // BFD_B40_PE  {X0249} Bulk Feeder_Apron_Hopper FULL
  public FDB_WB_TOTALIZER: TagsClient;        // V500        totalizzatore nastro pesatore, kg (INT16)
  public FDB_WB_TOTALIZER_REAL: TagsClient;   // V503        totalizzatore nastro pesatore, prima word del REAL
  public SET_FILL_TYPE_GLOBAL: TagsClient;    // V310        tipo di riempimento comune ai quattro sili (INT16)
  // #endregion

  constructor() {

    let ncsTags: TagsClient[], xsTags: TagsClient[], varTags: TagsClient[];

    // #region S1 - navetta NCS1 (F12), X-Shuttle S1,2 (V12c/F05 e B19c/F08)
    ncsTags = new Array(3);
    ncsTags[0] = SignalRService.tagList.PLC_NCS1_F12_FWD_PE;                // {X0258} S1 Shuttle_Car_FORWARD Position
    ncsTags[1] = SignalRService.tagList.PLC_NCS1_F12_MID_PE;                // {X0259} S1 Shuttle_Car_MIDDLE Position
    ncsTags[2] = SignalRService.tagList.PLC_NCS1_F12_REV_PE;                // {X0260} S1 Shuttle_Car_REVERSE Position
    xsTags = new Array(4);
    xsTags[0] = SignalRService.tagList.PLC_V12c_F05_FWD_PE;                 // {X0252} S1,2 X-Shuttle_Car_FORWARD Position
    xsTags[1] = SignalRService.tagList.PLC_V12c_F05_REV_PE;                 // {X0253} S1,2 X-Shuttle_Car_REVERSE Position
    xsTags[2] = SignalRService.tagList.PLC_B19c_F08_FWD_PE;                 // {X0254} S1,2 X-Shuttle_Car_FORWARD Position
    xsTags[3] = SignalRService.tagList.PLC_B19c_F08_REV_PE;                 // {X0255} S1,2 X-Shuttle_Car_REVERSE Position
    varTags = new Array(2);
    varTags[0] = SignalRService.tagList.VAR_V301;                           // kg    totalizzatore infeed dagli slicer
    varTags[1] = SignalRService.tagList.VAR_V1111;                          //       tipo di riempimento del silo
    this.S1 = new SiloModel("S1", "Silo #1", ncsTags, xsTags, varTags); this.silos.push(this.S1);
    // #endregion

    // #region S2 - navetta NCS2 (F18), X-Shuttle S1,2 (V12c/F05 e B19c/F08)
    ncsTags = new Array(3);
    ncsTags[0] = SignalRService.tagList.PLC_NCS2_F18_FWD_PE;                // {X0261} S2 Shuttle_Car_FORWARD Position
    ncsTags[1] = SignalRService.tagList.PLC_NCS2_F18_MID_PE;                // {X0262} S2 Shuttle_Car_MIDDLE Position
    ncsTags[2] = SignalRService.tagList.PLC_NCS2_F18_REV_PE;                // {X0263} S2 Shuttle_Car_REVERSE Position
    xsTags = new Array(4);
    xsTags[0] = SignalRService.tagList.PLC_V12c_F05_FWD_PE;                 // {X0252} S1,2 X-Shuttle_Car_FORWARD Position
    xsTags[1] = SignalRService.tagList.PLC_V12c_F05_REV_PE;                 // {X0253} S1,2 X-Shuttle_Car_REVERSE Position
    xsTags[2] = SignalRService.tagList.PLC_B19c_F08_FWD_PE;                 // {X0254} S1,2 X-Shuttle_Car_FORWARD Position
    xsTags[3] = SignalRService.tagList.PLC_B19c_F08_REV_PE;                 // {X0255} S1,2 X-Shuttle_Car_REVERSE Position
    varTags = new Array(2);
    varTags[0] = SignalRService.tagList.VAR_V302;                           // kg    totalizzatore infeed dagli slicer
    varTags[1] = SignalRService.tagList.VAR_V1112;                          //       tipo di riempimento del silo
    this.S2 = new SiloModel("S2", "Silo #2", ncsTags, xsTags, varTags); this.silos.push(this.S2);
    // #endregion

    // #region S3 - navetta NCS3 (F23), X-Shuttle S3,4 (V11c/F03 e B20c/F10)
    ncsTags = new Array(3);
    ncsTags[0] = SignalRService.tagList.PLC_NCS3_F23_FWD_PE;                // {X0264} S3 Shuttle_Car_FORWARD Position
    ncsTags[1] = SignalRService.tagList.PLC_NCS3_F23_MID_PE;                // {X0265} S3 Shuttle_Car_MIDDLE Position
    ncsTags[2] = SignalRService.tagList.PLC_NCS3_F23_REV_PE;                // {X0266} S3 Shuttle_Car_REVERSE Position
    xsTags = new Array(4);
    xsTags[0] = SignalRService.tagList.PLC_V11c_F03_FWD_PE;                 // {X0250} S3,4 X-Shuttle_Car_FORWARD Position
    xsTags[1] = SignalRService.tagList.PLC_V11c_F03_REV_PE;                 // {X0251} S3,4 X-Shuttle_Car_REVERSE Position
    xsTags[2] = SignalRService.tagList.PLC_B20c_F10_FWD_PE;                 // {X0256} S3,4 X-Shuttle_Car_FORWARD Position
    xsTags[3] = SignalRService.tagList.PLC_B20c_F10_REV_PE;                 // {X0257} S3,4 X-Shuttle_Car_REVERSE Position
    varTags = new Array(2);
    varTags[0] = SignalRService.tagList.VAR_V303;                           // kg    totalizzatore infeed dagli slicer
    varTags[1] = SignalRService.tagList.VAR_V1113;                          //       tipo di riempimento del silo
    this.S3 = new SiloModel("S3", "Silo #3", ncsTags, xsTags, varTags); this.silos.push(this.S3);
    // #endregion

    // #region S4 - navetta NCS4 (F24), X-Shuttle S3,4 (V11c/F03 e B20c/F10)
    ncsTags = new Array(3);
    ncsTags[0] = SignalRService.tagList.PLC_NCS4_F24_FED_PE;                // {X0267} S4 Shuttle_Car_FORWARD Position (nel PLC e' FED, non FWD)
    ncsTags[1] = SignalRService.tagList.PLC_NCS4_F24_MID_PE;                // {X0268} S4 Shuttle_Car_MIDDLE Position
    ncsTags[2] = SignalRService.tagList.PLC_NCS4_F24_REV_PE;                // {X0269} S4 Shuttle_Car_REVERSE Position
    xsTags = new Array(4);
    xsTags[0] = SignalRService.tagList.PLC_V11c_F03_FWD_PE;                 // {X0250} S3,4 X-Shuttle_Car_FORWARD Position
    xsTags[1] = SignalRService.tagList.PLC_V11c_F03_REV_PE;                 // {X0251} S3,4 X-Shuttle_Car_REVERSE Position
    xsTags[2] = SignalRService.tagList.PLC_B20c_F10_FWD_PE;                 // {X0256} S3,4 X-Shuttle_Car_FORWARD Position
    xsTags[3] = SignalRService.tagList.PLC_B20c_F10_REV_PE;                 // {X0257} S3,4 X-Shuttle_Car_REVERSE Position
    varTags = new Array(2);
    varTags[0] = SignalRService.tagList.VAR_V304;                           // kg    totalizzatore infeed dagli slicer
    varTags[1] = SignalRService.tagList.VAR_V1114;                          //       tipo di riempimento del silo
    this.S4 = new SiloModel("S4", "Silo #4", ncsTags, xsTags, varTags); this.silos.push(this.S4);
    // #endregion

    // #region IMPIANTO - tag comuni ai quattro sili
    this.PE_FD2_HOPPER_FULL = SignalRService.tagList.PLC_FD2_V27_PE;        // {X0245} Hopper Feeder_Incline Belt_Hopper FULL
    this.PE_FD1_HOPPER_FULL = SignalRService.tagList.PLC_FD1_B32_PE;        // {X0248} Hopper Feeder_Incline Belt_Hopper FULL
    this.PE_BFD_HOPPER_FULL = SignalRService.tagList.PLC_BFD_B40_PE;        // {X0249} Bulk Feeder_Apron_Hopper FULL
    this.FDB_WB_TOTALIZER = SignalRService.tagList.VAR_V500;                // kg    totalizzatore nastro pesatore (INT16)
    this.FDB_WB_TOTALIZER_REAL = SignalRService.tagList.VAR_V503;           // kg    totalizzatore nastro pesatore (prima word del REAL)
    this.SET_FILL_TYPE_GLOBAL = SignalRService.tagList.VAR_V310;            //       tipo di riempimento comune ai quattro sili

    // V310 e' uno solo per tutti e quattro: ne passo il riferimento anche ai sili
    // (stesso TagsClient, non una copia) cosi' ogni silo sa da solo se a comandare
    // e' il proprio setpoint o quello globale - vedi SiloModel.FILL_TYPE_ACTIVE.
    this.silos.forEach(silo => silo.SET_FILL_TYPE_GLOBAL = this.SET_FILL_TYPE_GLOBAL);
    // #endregion

  }

  // #region Stato dei tag d'impianto (stesso stile null-safe dei modelli)

  get FD2_HOPPER_FULL(): boolean {
    if (this.PE_FD2_HOPPER_FULL != null && this.PE_FD2_HOPPER_FULL.value)
      return true;
    return false;
  }

  get FD1_HOPPER_FULL(): boolean {
    if (this.PE_FD1_HOPPER_FULL != null && this.PE_FD1_HOPPER_FULL.value)
      return true;
    return false;
  }

  get BFD_HOPPER_FULL(): boolean {
    if (this.PE_BFD_HOPPER_FULL != null && this.PE_BFD_HOPPER_FULL.value)
      return true;
    return false;
  }

  get WB_TOTALIZER() {
    if (this.FDB_WB_TOTALIZER == null)
      return null;
    return this.FDB_WB_TOTALIZER.value;
  }

  get WB_TOTALIZER_REAL() {
    if (this.FDB_WB_TOTALIZER_REAL == null)
      return null;
    return this.FDB_WB_TOTALIZER_REAL.value;
  }

  // #endregion

  // #region Tipo di riempimento globale dei quattro sili (V310)
  // 0 = ogni silo segue il proprio setpoint (V1111..V1114), 1 = 1/4, 2 = 2/4,
  // da 3 in su = 4/4: la codifica dei valori diversi da zero e' quella del singolo silo.

  get FILL_TYPE_GLOBAL(): number {
    if (this.SET_FILL_TYPE_GLOBAL == null)
      return null;
    const value = Number(this.SET_FILL_TYPE_GLOBAL.value);
    return isFinite(value) ? value : null;
  }

  set FILL_TYPE_GLOBAL(value: number) {
    if (this.SET_FILL_TYPE_GLOBAL != null)
      this.SET_FILL_TYPE_GLOBAL.value = value;
  }

  get FILL_TYPE_GLOBAL_STR(): string {
    if (this.FILL_TYPE_GLOBAL == null)
      return "";
    if (this.FILL_TYPE_GLOBAL == 0)
      return "Ogni silo il suo";
    return SiloModel.fillTypeStr(this.FILL_TYPE_GLOBAL);
  }

  // I setpoint dei singoli sili sono modificabili solo con il globale a zero.
  get FILL_TYPE_PER_SILO(): boolean {
    return this.FILL_TYPE_GLOBAL == 0;
  }

  // #endregion

}
