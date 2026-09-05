import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { PidModel } from './pid.models';
import { TagsClient } from 'src/app/tags/tags-client';

export class PidList {

  pids: Array<PidModel> = new Array<PidModel>();

  // #region BURLEY DRYER
  public BRE_Coil_1: PidModel;  // BRE-#1HT - (drying zone 1 heating)     - HMI_PID_22
  public BRE_Coil_2: PidModel;  // BRE-#2HT - (drying zone 2 heating)     - HMI_PID_23
  public BRE_Coil_3: PidModel;  // BRE-#3HT - (drying zone 3 heating)     - HMI_PID_24
  public BRE_Coil_4: PidModel;  // BRE-#4HT - (drying zone 4 heating)     - HMI_PID_25
  public BRE_Coil_5: PidModel;  // BRE-#5HT - (drying zone 5 heating)     - HMI_PID_26
  public BRE_Louv_C: PidModel;  // BRE-CTMP - (cooling zone temperature)  - HMI_PID_27
  public BRE_Coil_O: PidModel;  // BRE-OTMP - (ordering zone temperature)
  public BRE_Steam: PidModel;   // BRE-STM  - (steam)
  public BRE_H2O: PidModel;     // BRE-H2O  - (water)
  // #endregion

  // #region FINAL DRYER
  public RE_Coil_1: PidModel;   // RE-#1HT  - (drying zone 1 heating)
  public RE_Coil_2: PidModel;   // RE-#2HT  - (drying zone 2 heating)
  public RE_Coil_3: PidModel;   // RE-#3HT  - (drying zone 3 heating)
  public RE_Louv_C: PidModel;   // RE-CTMP  - (cooling zone temperature)
  public RE_Coil_O: PidModel;   // RE-OTMP  - (ordering zone temperature)
  public RE_Steam: PidModel;    // RE-STM   - (steam)
  public RE_H2O: PidModel;      // RE-H2O   - (water)
  // #endregion

  // #region SILOS FILL - regolazione portata tabacco (VSD dei nastri)
  public BFD_VSD: PidModel;     // BFD-VSD  - (tobacco flow) - B46
  public S1_4_VSD: PidModel;    // S1-4-VSD - (tobacco flow) - F34
  // #endregion

  // #region SILOS DISCHARGE - vapore e acqua di BOC e VOC
  public VOC_STM: PidModel;     // VOC-STM  - (steam)
  public VOC_H2O: PidModel;     // VOC-H2O  - (water)
  public BOC_STM: PidModel;     // BOC-STM  - (steam)
  public BOC_H2O: PidModel;     // BOC-H2O  - (water)
  // #endregion

  // #region CASING
  public BCP_VSD:  PidModel;    // Burley Casing Pump  - C06 - BCP-VSD (pump speed)
  public CAP_VSD:  PidModel;    // Casing Pump         - C07 - CAP-VSD (pump speed)
  public BTFP_VSD: PidModel;    // Top Flavoring Pump  - C08 - BTFP-VSD (pump speed)

  public BCT1_HT: PidModel;     // Burley Casing Tank 1 (heating) - BCT1-HT (heating)
  public BCT2_HT: PidModel;     // Burley Casing Tank 2 (heating) - BCT2-HT (heating)
  public CAT3_HT: PidModel;     // Casing Tank 3 (heating)        - CAT3-HT (heating)
  public CAT4_HT: PidModel;     // Casing Tank 4 (heating)        - CAT4-HT (heating)

  public BCAC_HT: PidModel;     // BCAC-HT -  HMI_PID_20 - (heating)
  public BCAC_STM: PidModel;    // BCAC-STM - HMI_PID_21 - (heating)
  // #endregion

  // #region DCC
  public VDCC_HT: PidModel;     // VDCC-HT (heating) - HMI_PID_1 - (heating)
  public VDCC_STM: PidModel;    // VDCC-STM (steam)	 - HMI_PID_2 - (steam)
  public VDCC_H2O: PidModel;    // VDCC-H2O (water)	 - HMI_PID_3 - (water)
  public BDCC_HT: PidModel;     // BDCC-HT (heating) - HMI_PID_4 - (heating)
  public BDCC_STM: PidModel;    // BDCC-STM (steam)	 - HMI_PID_5 - (steam)
  public BDCC_H2O: PidModel;    // BDCC-H2O (water)	 - HMI_PID_6 - (water)
  // #endregion

  constructor() {

    let pidTags: TagsClient[];

    // #region BRE_Coil_1 - PID 22 - Riscaldamento zona 1
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_22_BRE_1HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_22_BRE_1HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_22_BRE_1HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_22_BRE_1HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_22_BRE_1HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_22_BRE_1HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_22_BRE_1HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_22_BRE_1HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_22_BRE_1HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_22_BRE_1HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_22_BRE_1HT_enMan;
    this.BRE_Coil_1 = new PidModel("BRE_Coil_1", "Burley Dryer - Riscaldamento zona 1", pidTags, "°C", "BRE_Air_1_TC"); this.pids.push(this.BRE_Coil_1);
    // #endregion

    // #region BRE_Coil_2 - PID 23 - Riscaldamento zona 2
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_23_BRE_2HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_23_BRE_2HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_23_BRE_2HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_23_BRE_2HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_23_BRE_2HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_23_BRE_2HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_23_BRE_2HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_23_BRE_2HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_23_BRE_2HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_23_BRE_2HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_23_BRE_2HT_enMan;
    this.BRE_Coil_2 = new PidModel("BRE_Coil_2", "Burley Dryer - Riscaldamento zona 2", pidTags, "°C", "BRE_Air_2_TC"); this.pids.push(this.BRE_Coil_2);
    // #endregion

    // #region BRE_Coil_3 - PID 24 - Riscaldamento zona 3
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_24_BRE_3HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_24_BRE_3HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_24_BRE_3HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_24_BRE_3HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_24_BRE_3HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_24_BRE_3HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_24_BRE_3HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_24_BRE_3HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_24_BRE_3HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_24_BRE_3HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_24_BRE_3HT_enMan;
    this.BRE_Coil_3 = new PidModel("BRE_Coil_3", "Burley Dryer - Riscaldamento zona 3", pidTags, "°C", "BRE_Air_3_TC"); this.pids.push(this.BRE_Coil_3);
    // #endregion

    // #region BRE_Coil_4 - PID 25 - Riscaldamento zona 4
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_25_BRE_4HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_25_BRE_4HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_25_BRE_4HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_25_BRE_4HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_25_BRE_4HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_25_BRE_4HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_25_BRE_4HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_25_BRE_4HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_25_BRE_4HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_25_BRE_4HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_25_BRE_4HT_enMan;
    this.BRE_Coil_4 = new PidModel("BRE_Coil_4", "Burley Dryer - Riscaldamento zona 4", pidTags, "°C", "BRE_Air_4_TC"); this.pids.push(this.BRE_Coil_4);
    // #endregion

    // #region BRE_Coil_5 - PID 26 - Riscaldamento zona 5
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_26_BRE_5HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_26_BRE_5HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_26_BRE_5HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_26_BRE_5HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_26_BRE_5HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_26_BRE_5HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_26_BRE_5HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_26_BRE_5HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_26_BRE_5HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_26_BRE_5HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_26_BRE_5HT_enMan;
    this.BRE_Coil_5 = new PidModel("BRE_Coil_5", "Burley Dryer - Riscaldamento zona 5", pidTags, "°C", "BRE_Air_5_TC"); this.pids.push(this.BRE_Coil_5);
    // #endregion

    // #region BRE_Louv_C - PID 27 - Temperatura zona raffreddamento
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_27_BRE_CTMP_enMan;
    this.BRE_Louv_C = new PidModel("BRE_Louv_C", "Burley Dryer - Temperatura zona raffreddamento", pidTags, "°C", "BRE_Air_C_TC"); this.pids.push(this.BRE_Louv_C);
    // #endregion

    // #region BRE_Coil_O - PID 36 - Temperatura uscita
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_36_BRE_OTMP_enMan;
    this.BRE_Coil_O = new PidModel("BRE_Coil_O", "Burley Dryer - Temperatura uscita", pidTags, "°C", "BRE_Air_O_TC"); this.pids.push(this.BRE_Coil_O);
    // #endregion

    // #region BRE_Steam - PID 28 - Vapore
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_28_BRE_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_28_BRE_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_28_BRE_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_28_BRE_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_28_BRE_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_28_BRE_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_28_BRE_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_28_BRE_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_28_BRE_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_28_BRE_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_28_BRE_STM_enMan;
    this.BRE_Steam = new PidModel("BRE_Steam", "Burley Dryer - Vapore", pidTags, "", "BRE_Steam_FM"); this.pids.push(this.BRE_Steam);
    // #endregion

    // #region BRE_H2O - PID 29 - Acqua (nessuna icona nel sinottico)
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_29_BRE_H2O_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_29_BRE_H2O_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_29_BRE_H2O_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_29_BRE_H2O_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_29_BRE_H2O_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_29_BRE_H2O_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_29_BRE_H2O_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_29_BRE_H2O_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_29_BRE_H2O_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_29_BRE_H2O_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_29_BRE_H2O_enMan;
    this.BRE_H2O = new PidModel("BRE_H2O", "Burley Dryer - Acqua", pidTags, "", "BRE_Water_FM"); this.pids.push(this.BRE_H2O);
    // #endregion

    // #region RE_Coil_1 - PID 30 - Riscaldamento zona 1
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_30_RE_1HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_30_RE_1HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_30_RE_1HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_30_RE_1HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_30_RE_1HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_30_RE_1HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_30_RE_1HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_30_RE_1HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_30_RE_1HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_30_RE_1HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_30_RE_1HT_enMan;
    this.RE_Coil_1 = new PidModel("RE_Coil_1", "Final Dryer - Riscaldamento zona 1", pidTags, "°C", "RE_Air_1_TC"); this.pids.push(this.RE_Coil_1);
    // #endregion

    // #region RE_Coil_2 - PID 31 - Riscaldamento zona 2
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_31_RE_2HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_31_RE_2HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_31_RE_2HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_31_RE_2HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_31_RE_2HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_31_RE_2HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_31_RE_2HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_31_RE_2HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_31_RE_2HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_31_RE_2HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_31_RE_2HT_enMan;
    this.RE_Coil_2 = new PidModel("RE_Coil_2", "Final Dryer - Riscaldamento zona 2", pidTags, "°C", "RE_Air_2_TC"); this.pids.push(this.RE_Coil_2);
    // #endregion

    // #region RE_Coil_3 - PID 32 - Riscaldamento zona 3
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_32_RE_3HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_32_RE_3HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_32_RE_3HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_32_RE_3HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_32_RE_3HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_32_RE_3HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_32_RE_3HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_32_RE_3HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_32_RE_3HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_32_RE_3HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_32_RE_3HT_enMan;
    this.RE_Coil_3 = new PidModel("RE_Coil_3", "Final Dryer - Riscaldamento zona 3", pidTags, "°C", "RE_Air_3_TC"); this.pids.push(this.RE_Coil_3);
    // #endregion

    // #region RE_Louv_C - PID 33 - Temperatura zona raffreddamento
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_33_RE_CTMP_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_33_RE_CTMP_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_33_RE_CTMP_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_33_RE_CTMP_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_33_RE_CTMP_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_33_RE_CTMP_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_33_RE_CTMP_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_33_RE_CTMP_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_33_RE_CTMP_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_33_RE_CTMP_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_33_RE_CTMP_enMan;
    this.RE_Louv_C = new PidModel("RE_Louv_C", "Final Dryer - Temperatura zona raffreddamento", pidTags, "°C", "RE_Air_C_TC"); this.pids.push(this.RE_Louv_C);
    // #endregion

    // #region RE_Coil_O - PID 37 - Temperatura uscita
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_37_RE_OTMP_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_37_RE_OTMP_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_37_RE_OTMP_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_37_RE_OTMP_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_37_RE_OTMP_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_37_RE_OTMP_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_37_RE_OTMP_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_37_RE_OTMP_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_37_RE_OTMP_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_37_RE_OTMP_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_37_RE_OTMP_enMan;
    this.RE_Coil_O = new PidModel("RE_Coil_O", "Final Dryer - Temperatura uscita", pidTags, "°C", "RE_Air_O_TC"); this.pids.push(this.RE_Coil_O);
    // #endregion

    // #region RE_Steam - PID 34 - Vapore
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_34_RE_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_34_RE_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_34_RE_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_34_RE_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_34_RE_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_34_RE_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_34_RE_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_34_RE_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_34_RE_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_34_RE_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_34_RE_STM_enMan;
    this.RE_Steam = new PidModel("RE_Steam", "Final Dryer - Vapore", pidTags, "", "RE_Steam_TC"); this.pids.push(this.RE_Steam);
    // #endregion

    // #region RE_H2O - PID 35 - Acqua (nessuna icona nel sinottico)
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_35_RE_H2O_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_35_RE_H2O_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_35_RE_H2O_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_35_RE_H2O_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_35_RE_H2O_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_35_RE_H2O_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_35_RE_H2O_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_35_RE_H2O_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_35_RE_H2O_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_35_RE_H2O_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_35_RE_H2O_enMan;
    this.RE_H2O = new PidModel("RE_H2O", "Final Dryer - Acqua", pidTags, "", "RE_Water_FM"); this.pids.push(this.RE_H2O);
    // #endregion

    // #region BFD_VSD - PID 11 - Portata tabacco nastro B46
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_11_BFD_VSD_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_11_BFD_VSD_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_11_BFD_VSD_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_11_BFD_VSD_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_11_BFD_VSD_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_11_BFD_VSD_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_11_BFD_VSD_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_11_BFD_VSD_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_11_BFD_VSD_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_11_BFD_VSD_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_11_BFD_VSD_enMan;
    this.BFD_VSD = new PidModel("BFD_VSD", "Silos Fill - Portata tabacco nastro B46", pidTags, "kg/h", "BWB_Tobacco_FM"); this.pids.push(this.BFD_VSD);
    // #endregion

    // #region S1_4_VSD - PID 12 - Portata tabacco nastro F34
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_12_S1_4_VSD_enMan;
    this.S1_4_VSD = new PidModel("S1_4_VSD", "Silos Fill - Portata tabacco nastro F34", pidTags, "kg/h", "BWB_Tobacco_FM"); this.pids.push(this.S1_4_VSD);
    // #endregion

    // #region VOC_STM - HMI_PID_7_VOC_STM
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_7_VOC_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_7_VOC_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_7_VOC_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_7_VOC_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_7_VOC_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_7_VOC_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_7_VOC_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_7_VOC_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_7_VOC_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_7_VOC_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_7_VOC_STM_enMan;
    this.VOC_STM = new PidModel("VOC_STM", "Silos Discharge - VOC - Vapore", pidTags, "", "VOC_Steam_FM"); this.pids.push(this.VOC_STM);
    // #endregion

    // #region VOC_H2O - HMI_PID_8_VOC_H2O
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_8_VOC_H2O_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_8_VOC_H2O_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_8_VOC_H2O_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_8_VOC_H2O_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_8_VOC_H2O_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_8_VOC_H2O_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_8_VOC_H2O_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_8_VOC_H2O_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_8_VOC_H2O_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_8_VOC_H2O_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_8_VOC_H2O_enMan;
    this.VOC_H2O = new PidModel("VOC_H2O", "Silos Discharge - VOC - Acqua", pidTags, "", "VOC_Water_FM"); this.pids.push(this.VOC_H2O);
    // #endregion

    // #region BOC_STM - HMI_PID_9_BOC_STM
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_9_BOC_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_9_BOC_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_9_BOC_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_9_BOC_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_9_BOC_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_9_BOC_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_9_BOC_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_9_BOC_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_9_BOC_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_9_BOC_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_9_BOC_STM_enMan;
    this.BOC_STM = new PidModel("BOC_STM", "Silos Discharge - BOC - Vapore", pidTags, "", "BOC_Steam_FM"); this.pids.push(this.BOC_STM);
    // #endregion

    // #region BOC_H2O - HMI_PID_10_BOC_H2O
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_10_BOC_H2O_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_10_BOC_H2O_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_10_BOC_H2O_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_10_BOC_H2O_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_10_BOC_H2O_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_10_BOC_H2O_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_10_BOC_H2O_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_10_BOC_H2O_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_10_BOC_H2O_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_10_BOC_H2O_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_10_BOC_H2O_enMan;
    this.BOC_H2O = new PidModel("BOC_H2O", "Silos Discharge - BOC - Acqua", pidTags, "", "BOC_Water_FM"); this.pids.push(this.BOC_H2O);
    // #endregion

    // #region BCT1_HT - PID 13 - Riscaldamento vasca BCT1
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_13_BCT1_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_13_BCT1_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_13_BCT1_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_13_BCT1_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_13_BCT1_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_13_BCT1_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_13_BCT1_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_13_BCT1_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_13_BCT1_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_13_BCT1_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_13_BCT1_HT_enMan;
    this.BCT1_HT = new PidModel("BCT1_HT", "Casing - Riscaldamento vasca BCT1", pidTags, "°C", "BCT1_CMix_TC"); this.pids.push(this.BCT1_HT);
    // #endregion

    // #region BCT2_HT - PID 14 - Riscaldamento vasca BCT2
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_14_BCT2_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_14_BCT2_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_14_BCT2_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_14_BCT2_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_14_BCT2_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_14_BCT2_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_14_BCT2_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_14_BCT2_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_14_BCT2_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_14_BCT2_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_14_BCT2_HT_enMan;
    this.BCT2_HT = new PidModel("BCT2_HT", "Casing - Riscaldamento vasca BCT2", pidTags, "°C", "BCT2_CMix_TC"); this.pids.push(this.BCT2_HT);
    // #endregion

    // #region CAT3_HT - PID 15 - Riscaldamento vasca CAT3
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_15_CAT3_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_15_CAT3_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_15_CAT3_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_15_CAT3_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_15_CAT3_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_15_CAT3_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_15_CAT3_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_15_CAT3_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_15_CAT3_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_15_CAT3_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_15_CAT3_HT_enMan;
    this.CAT3_HT = new PidModel("CAT3_HT", "Casing - Riscaldamento vasca CAT3", pidTags, "°C", "CT3_CMix_TC"); this.pids.push(this.CAT3_HT);
    // #endregion

    // #region CAT4_HT - PID 16 - Riscaldamento vasca CAT4
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_16_CAT4_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_16_CAT4_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_16_CAT4_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_16_CAT4_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_16_CAT4_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_16_CAT4_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_16_CAT4_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_16_CAT4_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_16_CAT4_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_16_CAT4_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_16_CAT4_HT_enMan;
    this.CAT4_HT = new PidModel("CAT4_HT", "Casing - Riscaldamento vasca CAT4", pidTags, "°C", "CT4_CMix_TC"); this.pids.push(this.CAT4_HT);
    // #endregion

    // #region BCP_VSD - PID 17 - Velocita' pompa Burley Casing (C06)
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_17_BCP_VSD_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_17_BCP_VSD_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_17_BCP_VSD_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_17_BCP_VSD_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_17_BCP_VSD_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_17_BCP_VSD_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_17_BCP_VSD_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_17_BCP_VSD_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_17_BCP_VSD_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_17_BCP_VSD_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_17_BCP_VSD_enMan;
    this.BCP_VSD = new PidModel("BCP_VSD", "Casing - Velocita' pompa Burley Casing (C06)", pidTags, "%", "BCAC_Casing_FM"); this.pids.push(this.BCP_VSD);
    // #endregion

    // #region CAP_VSD - PID 18 - Velocita' pompa Casing (C07)
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_18_CAP_VSD_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_18_CAP_VSD_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_18_CAP_VSD_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_18_CAP_VSD_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_18_CAP_VSD_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_18_CAP_VSD_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_18_CAP_VSD_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_18_CAP_VSD_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_18_CAP_VSD_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_18_CAP_VSD_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_18_CAP_VSD_enMan;
    this.CAP_VSD = new PidModel("CAP_VSD", "Casing - Velocita' pompa Casing (C07)", pidTags, "%", "CAC_Casing_FM"); this.pids.push(this.CAP_VSD);
    // #endregion

    // #region BTFP_VSD - PID 19 - Velocita' pompa Top Flavoring (C08)
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_19_BTFP_VSD_enMan;
    this.BTFP_VSD = new PidModel("BTFP_VSD", "Casing - Velocita' pompa Top Flavoring (C08)", pidTags, "%", "BTFC_Casing_FM"); this.pids.push(this.BTFP_VSD);
    // #endregion

    // #region BCAC_HT - PID 20 - Riscaldamento BCAC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_20_BCAC_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_20_BCAC_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_20_BCAC_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_20_BCAC_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_20_BCAC_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_20_BCAC_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_20_BCAC_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_20_BCAC_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_20_BCAC_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_20_BCAC_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_20_BCAC_HT_enMan;
    // Il foglio PIDs, alla colonna della descrizione, scrive BCT1_CMix_LC: e' un
    // refuso, BCT1_CMix_LC e' la AI[20]. Vale la colonna C, che dice AI[25], cioe'
    // BCAC_Air_TC (temperatura aria cappa), che e' anche l'unica che ha senso qui.
    this.BCAC_HT = new PidModel("BCAC_HT", "Casing Spray - Riscaldamento BCAC", pidTags, "°C", "BCAC_Air_TC"); this.pids.push(this.BCAC_HT);
    // #endregion

    // #region BCAC_STM - PID 21 - Vapore BCAC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_21_BCAC_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_21_BCAC_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_21_BCAC_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_21_BCAC_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_21_BCAC_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_21_BCAC_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_21_BCAC_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_21_BCAC_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_21_BCAC_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_21_BCAC_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_21_BCAC_STM_enMan;
    this.BCAC_STM = new PidModel("BCAC_STM", "Casing Spray - Vapore BCAC", pidTags, "Bar", "BCAC_Steam_PD"); this.pids.push(this.BCAC_STM);
    // #endregion

    // #region VDCC_HT - PID 1 - Riscaldamento aria di ricircolo VDCC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_1_VDCC_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_1_VDCC_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_1_VDCC_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_1_VDCC_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_1_VDCC_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_1_VDCC_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_1_VDCC_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_1_VDCC_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_1_VDCC_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_1_VDCC_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_1_VDCC_HT_enMan;
    this.VDCC_HT = new PidModel("VDCC_HT", "DCC Virginia - Riscaldamento aria", pidTags, "°C", "VDCC_Air_C_TC"); this.pids.push(this.VDCC_HT);
    // #endregion

    // #region VDCC_STM - PID 2 - Vapore di condizionamento VDCC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_2_VDCC_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_2_VDCC_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_2_VDCC_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_2_VDCC_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_2_VDCC_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_2_VDCC_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_2_VDCC_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_2_VDCC_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_2_VDCC_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_2_VDCC_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_2_VDCC_STM_enMan;
    this.VDCC_STM = new PidModel("VDCC_STM", "DCC Virginia - Vapore", pidTags, "", "VDCC_Steam_FM"); this.pids.push(this.VDCC_STM);
    // #endregion

    // #region VDCC_H2O - PID 3 - Acqua di condizionamento VDCC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_3_VDCC_H2O_enMan;
    this.VDCC_H2O = new PidModel("VDCC_H2O", "DCC Virginia - Acqua", pidTags, "", "VDCC_Water_FM"); this.pids.push(this.VDCC_H2O);
    // #endregion

    // #region BDCC_HT - PID 4 - Riscaldamento aria di ricircolo BDCC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_4_BDCC_HT_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_4_BDCC_HT_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_4_BDCC_HT_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_4_BDCC_HT_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_4_BDCC_HT_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_4_BDCC_HT_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_4_BDCC_HT_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_4_BDCC_HT_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_4_BDCC_HT_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_4_BDCC_HT_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_4_BDCC_HT_enMan;
    this.BDCC_HT = new PidModel("BDCC_HT", "DCC Burley - Riscaldamento aria", pidTags, "°C", "BDCC_Air_C_TC"); this.pids.push(this.BDCC_HT);
    // #endregion

    // #region BDCC_STM - PID 5 - Vapore di condizionamento BDCC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_5_BDCC_STM_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_5_BDCC_STM_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_5_BDCC_STM_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_5_BDCC_STM_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_5_BDCC_STM_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_5_BDCC_STM_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_5_BDCC_STM_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_5_BDCC_STM_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_5_BDCC_STM_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_5_BDCC_STM_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_5_BDCC_STM_enMan;
    this.BDCC_STM = new PidModel("BDCC_STM", "DCC Burley - Vapore", pidTags, "", "BDCC_Steam_FM"); this.pids.push(this.BDCC_STM);
    // #endregion

    // #region BDCC_H2O - PID 6 - Acqua di condizionamento BDCC
    pidTags = new Array(11);
    pidTags[0] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_PV;
    pidTags[1] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_SP;
    pidTags[2] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_OUT;
    pidTags[3] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_kP;
    pidTags[4] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_kD;
    pidTags[5] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_CycleT;
    pidTags[6] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_ManValue;
    pidTags[7] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_enable;
    pidTags[8] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_dirInv;
    pidTags[9] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_reset;
    pidTags[10] = SignalRService.tagList.HMI_PID_6_BDCC_H2O_enMan;
    this.BDCC_H2O = new PidModel("BDCC_H2O", "DCC Burley - Acqua", pidTags, "", "BDCC_Water_FM"); this.pids.push(this.BDCC_H2O);
    // #endregion


  }
}
