import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { AnalogModel } from './analog.models';
import { TagsClient } from 'src/app/tags/tags-client';

// Ingressi analogici del DB101 - HMI_AI, uno per ogni udtAI cablata in campo.
// Il nome della proprieta' e' quello del tag PLC senza il prefisso AI_<n>_: la
// posizione nell'array (AI[1], AI[6], ...) resta nel commento di ogni #region.
// Le AI di riserva (WX....) e le _AI_72.._AI_79 non sono qui: esistono nel
// datablock ma non hanno una sonda dietro.
export class AnalogList {

  analogs: Array<AnalogModel> = new Array<AnalogModel>();

  // #region VIRGINIA
  public VDCC_Steam_FM: AnalogModel;
  public VDCC_Water_FM: AnalogModel;
  public VDCC_Air_C_TC: AnalogModel;
  public VDCC_Moist_MM: AnalogModel;
  public VOC_Steam_FM: AnalogModel;
  public VOC_Water_FM: AnalogModel;
  public VSL_WBelt_LC: AnalogModel;
  public VSL_Pushr_LP: AnalogModel;
  public VSL_Retnr_LP: AnalogModel;
  // #endregion

  // #region BURLEY
  public BDCC_Steam_FM: AnalogModel;
  public BDCC_Water_FM: AnalogModel;
  public BDCC_Air_C_TC: AnalogModel;
  public BDCC_Moist_MM: AnalogModel;
  public BOC_Steam_FM: AnalogModel;
  public BOC_Water_FM: AnalogModel;
  public BSL_WBelt_LC: AnalogModel;
  public BSL_Pushr_LP: AnalogModel;
  public BSL_Retnr_LP: AnalogModel;
  // #endregion

  // #region CASING
  public BCT1_CMix_TC: AnalogModel;
  public BCT2_CMix_TC: AnalogModel;
  public CT3_CMix_TC: AnalogModel;
  public CT4_CMix_TC: AnalogModel;
  public BCT1_CMix_LC: AnalogModel;
  public BCT2_CMix_LC: AnalogModel;
  public CT3_CMix_LC: AnalogModel;
  public CT4_CMix_LC: AnalogModel;
  public BTFT5_CMix_LC: AnalogModel;
  public BCAC_Air_TC: AnalogModel;
  public BCAC_Casing_FM: AnalogModel;
  public BCAC_Steam_PD: AnalogModel;
  public BWB_Tobacco_FM: AnalogModel;
  public WB_Tobacco_FM: AnalogModel;
  public CAC_Casing_FM: AnalogModel;
  public BTFC_Casing_FM: AnalogModel;
  // #endregion

  // #region REDRYER
  // Le AI di temperatura, vapore e acqua dei due essiccatoi: sono i process value dei
  // loop PID del Burley Dryer e del Final Dryer (colonna C del foglio PIDs).
  public BRE_Air_1_TC: AnalogModel;
  public BRE_Air_2_TC: AnalogModel;
  public BRE_Air_3_TC: AnalogModel;
  public BRE_Air_4_TC: AnalogModel;
  public BRE_Air_5_TC: AnalogModel;
  public BRE_Air_C_TC: AnalogModel;
  public BRE_Air_O_TC: AnalogModel;
  public BRE_Steam_FM: AnalogModel;
  public BRE_Water_FM: AnalogModel;
  public RE_Air_1_TC: AnalogModel;
  public RE_Air_2_TC: AnalogModel;
  public RE_Air_3_TC: AnalogModel;
  public RE_Air_C_TC: AnalogModel;
  public RE_Air_O_TC: AnalogModel;
  public RE_Steam_TC: AnalogModel;
  public RE_Water_FM: AnalogModel;
  // #endregion

  constructor() {

    let aiTags: TagsClient[];

    //*******************************************************
    // #region VIRGINIA

    // Direct Conditioning Cylinder

    // #region VDCC_Steam_FM - AI[1] - Conditioning Steam - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_1_VDCC_Steam_FM_AlmWiring;
    this.VDCC_Steam_FM = new AnalogModel("VDCC_Steam_FM", "Direct Conditioning Cylinder", "Conditioning Steam", "Flow Rate", aiTags); this.analogs.push(this.VDCC_Steam_FM);
    // #endregion

    // #region VDCC_Water_FM - AI[2] - Conditioning Water - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_2_VDCC_Water_FM_AlmWiring;
    this.VDCC_Water_FM = new AnalogModel("VDCC_Water_FM", "Direct Conditioning Cylinder", "Conditioning Water", "Flow Rate", aiTags); this.analogs.push(this.VDCC_Water_FM);
    // #endregion

    // #region VDCC_Air_C_TC - AI[3] - Recirc. Air - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_3_VDCC_Air_C_TC_AlmWiring;
    this.VDCC_Air_C_TC = new AnalogModel("VDCC_Air_C_TC", "Direct Conditioning Cylinder", "Recirc. Air", "Temperature", aiTags); this.analogs.push(this.VDCC_Air_C_TC);
    // #endregion

    // #region VDCC_Moist_MM - AI[4] - Exiting Tobacco - % Moisture
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_4_VDCC_Moist_MM_AlmWiring;
    this.VDCC_Moist_MM = new AnalogModel("VDCC_Moist_MM", "Direct Conditioning Cylinder", "Exiting Tobacco", "% Moisture", aiTags); this.analogs.push(this.VDCC_Moist_MM);
    // #endregion

    // Ordering Cylinder

    // #region VOC_Steam_FM - AI[10] - Conditioning Steam - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_10_VOC_Steam_FM_AlmWiring;
    this.VOC_Steam_FM = new AnalogModel("VOC_Steam_FM", "Ordering Cylinder", "Conditioning Steam", "Flow Rate", aiTags); this.analogs.push(this.VOC_Steam_FM);
    // #endregion

    // #region VOC_Water_FM - AI[11] - Conditioning Water - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_11_VOC_Water_FM_AlmWiring;
    this.VOC_Water_FM = new AnalogModel("VOC_Water_FM", "Ordering Cylinder", "Conditioning Water", "Flow Rate", aiTags); this.analogs.push(this.VOC_Water_FM);
    // #endregion

    // Slicer

    // #region VSL_WBelt_LC - AI[56] - Weigh Belt - Load Cell (B4.1-4.4)
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_56_VSL_WBelt_LC_AlmWiring;
    this.VSL_WBelt_LC = new AnalogModel("VSL_WBelt_LC", "Slicer", "Weigh Belt", "Load Cell (B4.1-4.4)", aiTags); this.analogs.push(this.VSL_WBelt_LC);
    // #endregion

    // #region VSL_Pushr_LP - AI[57] - Bale Pusher - Linear Positioner (B30.1)
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_57_VSL_Pushr_LP_AlmWiring;
    this.VSL_Pushr_LP = new AnalogModel("VSL_Pushr_LP", "Pusher", "Bale Pusher", "Linear Positioner (B30.1)", aiTags); this.analogs.push(this.VSL_Pushr_LP);
    // #endregion

    // #region VSL_Retnr_LP - AI[58] - Bale Pusher - Linear Positioner (B30.2)
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_58_VSL_Retnr_LP_AlmWiring;
    this.VSL_Retnr_LP = new AnalogModel("VSL_Retnr_LP", "Retainer", "Bale Pusher", "Linear Positioner (B30.2)", aiTags); this.analogs.push(this.VSL_Retnr_LP);
    // #endregion

    // #endregion

    //*******************************************************
    // #region BURLEY

    // Direct Conditioning Cylinder

    // #region BDCC_Steam_FM - AI[6] - Conditioning Steam - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_6_BDCC_Steam_FM_AlmWiring;
    this.BDCC_Steam_FM = new AnalogModel("BDCC_Steam_FM", "Direct Conditioning Cylinder", "Conditioning Steam", "Flow Rate", aiTags); this.analogs.push(this.BDCC_Steam_FM);
    // #endregion

    // #region BDCC_Water_FM - AI[7] - Conditioning Water - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_7_BDCC_Water_FM_AlmWiring;
    this.BDCC_Water_FM = new AnalogModel("BDCC_Water_FM", "Direct Conditioning Cylinder", "Conditioning Water", "Flow Rate", aiTags); this.analogs.push(this.BDCC_Water_FM);
    // #endregion

    // #region BDCC_Air_C_TC - AI[8] - Recirc. Air - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_8_BDCC_Air_C_TC_AlmWiring;
    this.BDCC_Air_C_TC = new AnalogModel("BDCC_Air_C_TC", "Direct Conditioning Cylinder", "Recirc. Air", "Temperature", aiTags); this.analogs.push(this.BDCC_Air_C_TC);
    // #endregion

    // #region BDCC_Moist_MM - AI[9] - Exiting Tobacco - % Moisture
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_9_BDCC_Moist_MM_AlmWiring;
    this.BDCC_Moist_MM = new AnalogModel("BDCC_Moist_MM", "Direct Conditioning Cylinder", "Exiting Tobacco", "% Moisture", aiTags); this.analogs.push(this.BDCC_Moist_MM);
    // #endregion

    // Ordering Cylinder

    // #region BOC_Steam_FM - AI[12] - Conditioning Steam - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_12_BOC_Steam_FM_AlmWiring;
    this.BOC_Steam_FM = new AnalogModel("BOC_Steam_FM", "Ordering Cylinder", "Conditioning Steam", "Flow Rate", aiTags); this.analogs.push(this.BOC_Steam_FM);
    // #endregion

    // #region BOC_Water_FM - AI[13] - Conditioning Water - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_13_BOC_Water_FM_AlmWiring;
    this.BOC_Water_FM = new AnalogModel("BOC_Water_FM", "Ordering Cylinder", "Conditioning Water", "Flow Rate", aiTags); this.analogs.push(this.BOC_Water_FM);
    // #endregion

    // Slicer

    // #region BSL_WBelt_LC - AI[64] - Weigh Belt - Load Cell (B4.1-4.4)
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_64_BSL_WBelt_LC_AlmWiring;
    this.BSL_WBelt_LC = new AnalogModel("BSL_WBelt_LC", "Slicer", "Weigh Belt", "Load Cell (B4.1-4.4)", aiTags); this.analogs.push(this.BSL_WBelt_LC);
    // #endregion

    // #region BSL_Pushr_LP - AI[65] - Bale Pusher - Linear Positioner (B30.1)
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_65_BSL_Pushr_LP_AlmWiring;
    this.BSL_Pushr_LP = new AnalogModel("BSL_Pushr_LP", "Pusher", "Bale Pusher", "Linear Positioner (B30.1)", aiTags); this.analogs.push(this.BSL_Pushr_LP);
    // #endregion

    // #region BSL_Retnr_LP - AI[66] - Bale Pusher - Linear Positioner (B30.2)
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_66_BSL_Retnr_LP_AlmWiring;
    this.BSL_Retnr_LP = new AnalogModel("BSL_Retnr_LP", "Retainer", "Bale Pusher", "Linear Positioner (B30.2)", aiTags); this.analogs.push(this.BSL_Retnr_LP);
    // #endregion

    // #endregion

    //*******************************************************
    // #region CASING

    // Temperatura delle vasche

    // #region BCT1_CMix_TC - AI[16] - Casing Mixture - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_16_BCT1_CMix_TC_AlmWiring;
    this.BCT1_CMix_TC = new AnalogModel("BCT1_CMix_TC", "Burley Casing Tank", "Casing Mixture", "Temperature", aiTags); this.analogs.push(this.BCT1_CMix_TC);
    // #endregion

    // #region BCT2_CMix_TC - AI[17] - Casing Mixture - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_17_BCT2_CMix_TC_AlmWiring;
    this.BCT2_CMix_TC = new AnalogModel("BCT2_CMix_TC", "Burley Casing Tank", "Casing Mixture", "Temperature", aiTags); this.analogs.push(this.BCT2_CMix_TC);
    // #endregion

    // #region CT3_CMix_TC - AI[18] - Casing Mixture - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_18_CT3_CMix_TC_AlmWiring;
    this.CT3_CMix_TC = new AnalogModel("CT3_CMix_TC", "Casing Tank", "Casing Mixture", "Temperature", aiTags); this.analogs.push(this.CT3_CMix_TC);
    // #endregion

    // #region CT4_CMix_TC - AI[19] - Casing Mixture - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_19_CT4_CMix_TC_AlmWiring;
    this.CT4_CMix_TC = new AnalogModel("CT4_CMix_TC", "Casing Tank", "Casing Mixture", "Temperature", aiTags); this.analogs.push(this.CT4_CMix_TC);
    // #endregion

    // Livello delle vasche

    // #region BCT1_CMix_LC - AI[20] - Casing Mixture - Amount remaining
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_20_BCT1_CMix_LC_AlmWiring;
    this.BCT1_CMix_LC = new AnalogModel("BCT1_CMix_LC", "Burley Casing Tank", "Casing Mixture", "Amount remaining", aiTags); this.analogs.push(this.BCT1_CMix_LC);
    // #endregion

    // #region BCT2_CMix_LC - AI[21] - Casing Mixture - Amount remaining
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_21_BCT2_CMix_LC_AlmWiring;
    this.BCT2_CMix_LC = new AnalogModel("BCT2_CMix_LC", "Burley Casing Tank", "Casing Mixture", "Amount remaining", aiTags); this.analogs.push(this.BCT2_CMix_LC);
    // #endregion

    // #region CT3_CMix_LC - AI[22] - Casing Mixture - Amount remaining
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_22_CT3_CMix_LC_AlmWiring;
    this.CT3_CMix_LC = new AnalogModel("CT3_CMix_LC", "Casing Tank", "Casing Mixture", "Amount remaining", aiTags); this.analogs.push(this.CT3_CMix_LC);
    // #endregion

    // #region CT4_CMix_LC - AI[23] - Casing Mixture - Amount remaining
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_23_CT4_CMix_LC_AlmWiring;
    this.CT4_CMix_LC = new AnalogModel("CT4_CMix_LC", "Casing Tank", "Casing Mixture", "Amount remaining", aiTags); this.analogs.push(this.CT4_CMix_LC);
    // #endregion

    // #region BTFT5_CMix_LC - AI[24] - Casing Mixture - Amount remaining
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_24_BTFT5_CMix_LC_AlmWiring;
    this.BTFT5_CMix_LC = new AnalogModel("BTFT5_CMix_LC", "Top Flavoring Tank", "Casing Mixture", "Amount remaining", aiTags); this.analogs.push(this.BTFT5_CMix_LC);
    // #endregion

    // Cilindro di casing e nastro pesatore

    // #region BCAC_Air_TC - AI[25] - Hood Air - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_25_BCAC_Air_TC_AlmWiring;
    this.BCAC_Air_TC = new AnalogModel("BCAC_Air_TC", "Burley Casing Cylinder", "Hood Air", "Temperature", aiTags); this.analogs.push(this.BCAC_Air_TC);
    // #endregion

    // #region BCAC_Casing_FM - AI[26] - Casing Application - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_26_BCAC_Casing_FM_AlmWiring;
    this.BCAC_Casing_FM = new AnalogModel("BCAC_Casing_FM", "Burley Casing Cylinder", "Casing Application", "Flow Rate", aiTags); this.analogs.push(this.BCAC_Casing_FM);
    // #endregion

    // #region BCAC_Steam_PD - AI[27] - Cleaning Steam - Pressure
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_27_BCAC_Steam_PD_AlmWiring;
    this.BCAC_Steam_PD = new AnalogModel("BCAC_Steam_PD", "Burley Casing Cylinder", "Cleaning Steam", "Pressure", aiTags); this.analogs.push(this.BCAC_Steam_PD);
    // #endregion

    // #region BWB_Tobacco_FM - AI[28] - Tobacco Infeed - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_28_BWB_Tobacco_FM_AlmWiring;
    this.BWB_Tobacco_FM = new AnalogModel("BWB_Tobacco_FM", "Weigh Belt", "Tobacco Infeed", "Flow Rate", aiTags); this.analogs.push(this.BWB_Tobacco_FM);
    // #endregion

    // #region WB_Tobacco_FM - AI[14] - Tobacco Infeed - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_14_WB_Tobacco_FM_AlmWiring;
    this.WB_Tobacco_FM = new AnalogModel("WB_Tobacco_FM", "Weigh Belt", "Tobacco Infeed", "Flow Rate", aiTags); this.analogs.push(this.WB_Tobacco_FM);
    // #endregion

    // Cilindri di casing serviti dalle altre due pompe

    // #region CAC_Casing_FM - AI[15] - Casing Application - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_15_CAC_Casing_FM_AlmWiring;
    this.CAC_Casing_FM = new AnalogModel("CAC_Casing_FM", "Casing Cylinder", "Casing Application", "Flow Rate", aiTags); this.analogs.push(this.CAC_Casing_FM);
    // #endregion

    // #region BTFC_Casing_FM - AI[50] - Casing Application - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_50_BTFC_Casing_FM_AlmWiring;
    this.BTFC_Casing_FM = new AnalogModel("BTFC_Casing_FM", "Top Flavoring Cylinder", "Casing Application", "Flow Rate", aiTags); this.analogs.push(this.BTFC_Casing_FM);
    // #endregion

    // #endregion

    //*******************************************************
    // #region REDRYER

    // Burley Dryer

    // #region BRE_Air_1_TC - AI[32] - Recirc. Air Zone #1 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_32_BRE_Air_1_TC_AlmWiring;
    this.BRE_Air_1_TC = new AnalogModel("BRE_Air_1_TC", "Burley Dryer", "Recirc. Air Zone #1", "Temperature", aiTags); this.analogs.push(this.BRE_Air_1_TC);
    // #endregion

    // #region BRE_Air_2_TC - AI[33] - Recirc. Air Zone #2 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_33_BRE_Air_2_TC_AlmWiring;
    this.BRE_Air_2_TC = new AnalogModel("BRE_Air_2_TC", "Burley Dryer", "Recirc. Air Zone #2", "Temperature", aiTags); this.analogs.push(this.BRE_Air_2_TC);
    // #endregion

    // #region BRE_Air_3_TC - AI[34] - Recirc. Air Zone #3 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_34_BRE_Air_3_TC_AlmWiring;
    this.BRE_Air_3_TC = new AnalogModel("BRE_Air_3_TC", "Burley Dryer", "Recirc. Air Zone #3", "Temperature", aiTags); this.analogs.push(this.BRE_Air_3_TC);
    // #endregion

    // #region BRE_Air_4_TC - AI[35] - Recirc. Air Zone #4 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_35_BRE_Air_4_TC_AlmWiring;
    this.BRE_Air_4_TC = new AnalogModel("BRE_Air_4_TC", "Burley Dryer", "Recirc. Air Zone #4", "Temperature", aiTags); this.analogs.push(this.BRE_Air_4_TC);
    // #endregion

    // #region BRE_Air_5_TC - AI[36] - Recirc. Air Zone #5 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_36_BRE_Air_5_TC_AlmWiring;
    this.BRE_Air_5_TC = new AnalogModel("BRE_Air_5_TC", "Burley Dryer", "Recirc. Air Zone #5", "Temperature", aiTags); this.analogs.push(this.BRE_Air_5_TC);
    // #endregion

    // #region BRE_Air_C_TC - AI[37] - Recirc. Air Zone #C - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_37_BRE_Air_C_TC_AlmWiring;
    this.BRE_Air_C_TC = new AnalogModel("BRE_Air_C_TC", "Burley Dryer", "Recirc. Air Zone #C", "Temperature", aiTags); this.analogs.push(this.BRE_Air_C_TC);
    // #endregion

    // #region BRE_Air_O_TC - AI[38] - Recirc. Air Zone #O - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_38_BRE_Air_O_TC_AlmWiring;
    this.BRE_Air_O_TC = new AnalogModel("BRE_Air_O_TC", "Burley Dryer", "Recirc. Air Zone #O", "Temperature", aiTags); this.analogs.push(this.BRE_Air_O_TC);
    // #endregion

    // #region BRE_Steam_FM - AI[39] - Ordering Steam - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_39_BRE_Steam_FM_AlmWiring;
    this.BRE_Steam_FM = new AnalogModel("BRE_Steam_FM", "Burley Dryer", "Ordering Steam", "Flow Rate", aiTags); this.analogs.push(this.BRE_Steam_FM);
    // #endregion

    // #region BRE_Water_FM - AI[40] - Ordering Water - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_40_BRE_Water_FM_AlmWiring;
    this.BRE_Water_FM = new AnalogModel("BRE_Water_FM", "Burley Dryer", "Ordering Water", "Flow Rate", aiTags); this.analogs.push(this.BRE_Water_FM);
    // #endregion

    // Final Dryer

    // #region RE_Air_1_TC - AI[42] - Recirc. Air Zone #1 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_42_RE_Air_1_TC_AlmWiring;
    this.RE_Air_1_TC = new AnalogModel("RE_Air_1_TC", "Final Dryer", "Recirc. Air Zone #1", "Temperature", aiTags); this.analogs.push(this.RE_Air_1_TC);
    // #endregion

    // #region RE_Air_2_TC - AI[43] - Recirc. Air Zone #2 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_43_RE_Air_2_TC_AlmWiring;
    this.RE_Air_2_TC = new AnalogModel("RE_Air_2_TC", "Final Dryer", "Recirc. Air Zone #2", "Temperature", aiTags); this.analogs.push(this.RE_Air_2_TC);
    // #endregion

    // #region RE_Air_3_TC - AI[44] - Recirc. Air Zone #3 - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_44_RE_Air_3_TC_AlmWiring;
    this.RE_Air_3_TC = new AnalogModel("RE_Air_3_TC", "Final Dryer", "Recirc. Air Zone #3", "Temperature", aiTags); this.analogs.push(this.RE_Air_3_TC);
    // #endregion

    // #region RE_Air_C_TC - AI[45] - Recirc. Air Zone #C - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_45_RE_Air_C_TC_AlmWiring;
    this.RE_Air_C_TC = new AnalogModel("RE_Air_C_TC", "Final Dryer", "Recirc. Air Zone #C", "Temperature", aiTags); this.analogs.push(this.RE_Air_C_TC);
    // #endregion

    // #region RE_Air_O_TC - AI[46] - Recirc. Air Zone #O - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_46_RE_Air_O_TC_AlmWiring;
    this.RE_Air_O_TC = new AnalogModel("RE_Air_O_TC", "Final Dryer", "Recirc. Air Zone #O", "Temperature", aiTags); this.analogs.push(this.RE_Air_O_TC);
    // #endregion

    // #region RE_Steam_TC - AI[47] - Ordering Steam - Temperature
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_47_RE_Steam_TC_AlmWiring;
    this.RE_Steam_TC = new AnalogModel("RE_Steam_TC", "Final Dryer", "Ordering Steam", "Temperature", aiTags); this.analogs.push(this.RE_Steam_TC);
    // #endregion

    // #region RE_Water_FM - AI[48] - Ordering Water - Flow Rate
    aiTags = new Array(17);
    aiTags[0] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_X;
    aiTags[1] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_X0;
    aiTags[2] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_Y0;
    aiTags[3] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_X1;
    aiTags[4] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_Y1;
    aiTags[5] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_Y;
    aiTags[6] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_ManForceValue;
    aiTags[7] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_HH_Threshold;
    aiTags[8] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_H_Threshold;
    aiTags[9] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_L_Threshold;
    aiTags[10] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_LL_Threshold;
    aiTags[11] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_EnManValue;
    aiTags[12] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_HH;
    aiTags[13] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_H;
    aiTags[14] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_L;
    aiTags[15] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_LL;
    aiTags[16] = SignalRService.tagList.HMI_AI_48_RE_Water_FM_AlmWiring;
    this.RE_Water_FM = new AnalogModel("RE_Water_FM", "Final Dryer", "Ordering Water", "Flow Rate", aiTags); this.analogs.push(this.RE_Water_FM);
    // #endregion

    // #endregion

  }
}
