import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient, VAR_TYPE_Enum, IO_Enum } from 'src/app/tags/tags-client';
import { MotorModel } from './motor.models';

export class MotorList {

  motors: Array<MotorModel> = new Array<MotorModel>();

  // #region LISTA MOTORI BURLEY DRYER
  public B28: MotorModel;
  public B52: MotorModel;
  public B53: MotorModel;
  public B54: MotorModel;
  public B55: MotorModel;
  public B56: MotorModel;
  public B57: MotorModel;
  public B58: MotorModel;
  public B59: MotorModel;
  public B60: MotorModel;
  public B61: MotorModel;
  public B62: MotorModel;
  public B63: MotorModel;
  public B64: MotorModel;
  public B65: MotorModel;
  public B66: MotorModel;
  public B67: MotorModel;
  public B68: MotorModel;
  public B69: MotorModel;
  public B70: MotorModel;
  public B71: MotorModel;
  public B72: MotorModel;
  public B73: MotorModel;
  public B74: MotorModel;
  public B75: MotorModel;
  public B76: MotorModel;
  public B77: MotorModel;
  public B78: MotorModel;
  public B79: MotorModel;
  public B80: MotorModel;
  public B81: MotorModel;
  public B82: MotorModel;
  // #endregion

  // #region LISTA MOTORI FINAL DRYER
  public F47: MotorModel;
  public F48: MotorModel;
  public F49: MotorModel;
  public F50: MotorModel;
  public F51: MotorModel;
  public F52: MotorModel;
  public F53: MotorModel;
  public F54: MotorModel;
  public F55: MotorModel;
  public F56: MotorModel;
  public F57: MotorModel;
  public F58: MotorModel;
  public F59: MotorModel;
  public F60: MotorModel;
  public F61: MotorModel;
  public F62: MotorModel;
  public F63: MotorModel;
  public F64: MotorModel;
  public F65: MotorModel;
  public F66: MotorModel;
  public F67: MotorModel;
  public F68: MotorModel;
  public F69: MotorModel;
  public F70: MotorModel;
  public F71: MotorModel;
  public F72: MotorModel;
  // #endregion

  // #region LISTA MOTORI CASING
  public C01: MotorModel;
  public C02: MotorModel;
  public C03: MotorModel;
  public C04: MotorModel;
  public C05: MotorModel;
  public C06: MotorModel;
  public C07: MotorModel;
  public C08: MotorModel;
  public B46: MotorModel;
  public B47: MotorModel;
  public B48: MotorModel;
  public B49: MotorModel;
  public F37: MotorModel;
  public F38: MotorModel;
  public B84: MotorModel;
  public B86: MotorModel;
  public F34: MotorModel;
  // #endregion

  // #region LISTA MOTORI ZONA 1.0
  public V10: MotorModel;
  public V11: MotorModel;
  public V12: MotorModel;
  public V13: MotorModel;
  public V13a: MotorModel; 
  public V14: MotorModel;
  public V14a: MotorModel;
  public V15: MotorModel;
  public V16: MotorModel;
  public V17: MotorModel;
  public V18: MotorModel;
  public V18A: MotorModel;
  public V19: MotorModel;
  public V20: MotorModel;
  public V21: MotorModel;
  public V23: MotorModel;
  public V23S: MotorModel;
  public V23D: MotorModel;
  public V24: MotorModel;
  public V25: MotorModel;
  public V26: MotorModel;
  public V26A: MotorModel;
  public V27: MotorModel;
  public V28: MotorModel;
  public V29: MotorModel;
  public V30: MotorModel;
  public V31: MotorModel;
  public V32: MotorModel;
  public V33: MotorModel;
  public V34: MotorModel;
  public V35: MotorModel;
  public V36: MotorModel;
  public V37: MotorModel;
  public V38: MotorModel;
  public V39: MotorModel;
  public V40: MotorModel;
  public V41: MotorModel;
  public V42: MotorModel;
  public V43: MotorModel;
  public V44: MotorModel;
  public V45: MotorModel;
  public V46: MotorModel;
  public V47: MotorModel;
  public V48: MotorModel;
  public V49: MotorModel;
  public VB: MotorModel;
  public VC: MotorModel;
  public VC1: MotorModel;
  public VC2: MotorModel;
  public VC3: MotorModel;
  public VD: MotorModel;
  public VE: MotorModel;
  public VF: MotorModel;
  public V22: MotorModel;
  public V23B: MotorModel;
  // #endregion

  // #region LISTA MOTORI ZONA 3.4
  public F73: MotorModel;
  public F74: MotorModel;
  public F75: MotorModel;
  public F76: MotorModel;
  public F77: MotorModel;
  public F78: MotorModel;
  public F79: MotorModel;
  public F72SX: MotorModel;
  public F72DX: MotorModel;
  // #endregion

  // #region LISTA MOTORI ZONA 2.3-3.4
  public B83: MotorModel;
  public B85: MotorModel;
  public B87: MotorModel;
  public B89: MotorModel;
  public B90: MotorModel;
  public B91: MotorModel;
  public B92: MotorModel;
  public B95: MotorModel;
  public B87DX: MotorModel;
  // #endregion

  // #region LISTA MOTORI SLICER VIRGINIA
  public V01: MotorModel;
  public V02: MotorModel;
  public V03: MotorModel;
  public V04_06: MotorModel;
  public V05: MotorModel;
  public V07: MotorModel;
  public V08: MotorModel;
  public V09: MotorModel;
  public V09_SPINTORE: MotorModel;
  public V09_BLADE: MotorModel;
  // #endregion

  // #region LISTA MOTORI SLICER BURLEY
  public B03: MotorModel;
  public B04: MotorModel;
  public B05: MotorModel;
  public B06_08: MotorModel;
  public B07: MotorModel;
  public B09: MotorModel;
  public B10: MotorModel;
  public B11: MotorModel;
  public B11_SPINTORE: MotorModel;
  public B11_BLADE: MotorModel;

  // #endregion

  public B12: MotorModel;

  // #region LISTA MOTORI ZONA 2.1
  public B01: MotorModel;
  public B1A: MotorModel;
  public B02: MotorModel;

  public B13: MotorModel;
  public B14: MotorModel;
  public B15: MotorModel;
  public B16a: MotorModel;
  public B17: MotorModel;
  public B18: MotorModel;
  public B19: MotorModel;
  public B20: MotorModel;
  public B21: MotorModel;
  public B22: MotorModel;
  public B23: MotorModel;
  public B24: MotorModel;
  public B25: MotorModel;
  public B26: MotorModel;
  public B27: MotorModel;
  public B29: MotorModel;
  public B30: MotorModel;
  public B31: MotorModel;
  public B31A: MotorModel;
  public B32: MotorModel;
  public B33: MotorModel;
  public B34: MotorModel;
  public B35: MotorModel;
  public B36: MotorModel;
  public B37: MotorModel;
  public B38: MotorModel;
  public B39: MotorModel;
  public B40: MotorModel;
  public B41: MotorModel;
  public B42: MotorModel;
  public B43: MotorModel;
  public B45: MotorModel;
  public B50: MotorModel;
  public B51: MotorModel;
  public B93: MotorModel;
  public B94: MotorModel;
  public BA: MotorModel;
  public BB: MotorModel;
  public BC: MotorModel;
  public BC1: MotorModel;
  public BC2: MotorModel;
  public BC3: MotorModel;
  public BC4: MotorModel;
  public BC5: MotorModel;
  public BD: MotorModel;
  public BE: MotorModel;
  // #endregion

  // #region LISTA MOTORI ZONA 3.1
  public F12: MotorModel;
  public F13: MotorModel;
  public F14: MotorModel;
  public F17: MotorModel;
  public F18: MotorModel;
  public F19: MotorModel;
  public F22: MotorModel;
  public F23: MotorModel;
  public F24: MotorModel;
  public F27: MotorModel;
  public F28: MotorModel;
  public F29: MotorModel;
  public F01: MotorModel;
  public F02: MotorModel;
  public F03: MotorModel;
  public F04: MotorModel;
  public F05: MotorModel;
  public F06: MotorModel;
  public F07: MotorModel;
  public F08: MotorModel;
  public F09: MotorModel;
  public F10: MotorModel;
  public F11: MotorModel;
  public F15: MotorModel;
  public F16: MotorModel;
  public F20: MotorModel;
  public F21: MotorModel;
  public F25: MotorModel;
  public F26: MotorModel;
  public F30: MotorModel;
  // #endregion

  // #region LISTA MOTORI ZONA 3.2
  public F36A: MotorModel;
  public F41: MotorModel;
  public F42: MotorModel;
  public F31: MotorModel;
  public F32: MotorModel;
  public F33: MotorModel;
  public F35: MotorModel;
  public F39: MotorModel;
  public F40: MotorModel;
  public F36: MotorModel;
  public F43: MotorModel;
  public F44: MotorModel;
  public F45: MotorModel;
  public F46: MotorModel;
  // #endregion


  constructor() {

    let almTags: TagsClient[], cmdTags: TagsClient[], filterTags: TagsClient[], stsTags: TagsClient[], vfdTags: TagsClient[];

    //*******************************************************
    // #region BURLEY DRYER

    // #region B28 - Driver
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B28_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B28_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B28_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B28_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B28_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B28_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B28_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B28_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B28_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B28_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B28_STS_outRev;
    stsTags[2] = SignalRService.tagList.B28_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B28_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B28_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B28_STS_limRev;
    stsTags[6] = SignalRService.tagList.B28_STS_almCUM;
    this.B28 = new MotorModel("B28", "Driver", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B28_STATE); this.motors.push(this.B28);
    // #endregion

    // #region B52 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B52_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B52_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B52_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B52_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B52_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B52_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B52_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B52_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B52_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B52_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B52_STS_outRev;
    stsTags[2] = SignalRService.tagList.B52_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B52_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B52_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B52_STS_limRev;
    stsTags[6] = SignalRService.tagList.B52_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B52_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B52_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B52_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B52_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B52_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B52_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B52_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B52_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B52_actWarning;
    this.B52 = new MotorModel("B52", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B52_STATE, vfdTags); this.motors.push(this.B52);
    // #endregion

    // #region B53 - Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B53_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B53_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B53_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B53_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B53_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B53_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B53_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B53_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B53_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B53_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B53_STS_outRev;
    stsTags[2] = SignalRService.tagList.B53_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B53_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B53_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B53_STS_limRev;
    stsTags[6] = SignalRService.tagList.B53_STS_almCUM;
    this.B53 = new MotorModel("B53", "Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B53_STATE); this.motors.push(this.B53);
    // #endregion

    // #region B54 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B54_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B54_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B54_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B54_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B54_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B54_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B54_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B54_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B54_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B54_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B54_STS_outRev;
    stsTags[2] = SignalRService.tagList.B54_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B54_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B54_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B54_STS_limRev;
    stsTags[6] = SignalRService.tagList.B54_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B54_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B54_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B54_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B54_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B54_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B54_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B54_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B54_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B54_actWarning;
    this.B54 = new MotorModel("B54", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B54_STATE, vfdTags); this.motors.push(this.B54);
    // #endregion

    // #region B55 - Hold Down Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B55_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B55_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B55_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B55_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B55_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B55_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B55_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B55_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B55_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B55_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B55_STS_outRev;
    stsTags[2] = SignalRService.tagList.B55_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B55_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B55_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B55_STS_limRev;
    stsTags[6] = SignalRService.tagList.B55_STS_almCUM;
    this.B55 = new MotorModel("B55", "Hold Down Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B55_STATE); this.motors.push(this.B55);
    // #endregion

    // #region B56 - Brush
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B56_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B56_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B56_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B56_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B56_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B56_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B56_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B56_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B56_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B56_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B56_STS_outRev;
    stsTags[2] = SignalRService.tagList.B56_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B56_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B56_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B56_STS_limRev;
    stsTags[6] = SignalRService.tagList.B56_STS_almCUM;
    this.B56 = new MotorModel("B56", "Brush", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B56_STATE); this.motors.push(this.B56);
    // #endregion

    // #region B57 - #1a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B57_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B57_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B57_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B57_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B57_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B57_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B57_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B57_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B57_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B57_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B57_STS_outRev;
    stsTags[2] = SignalRService.tagList.B57_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B57_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B57_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B57_STS_limRev;
    stsTags[6] = SignalRService.tagList.B57_STS_almCUM;
    this.B57 = new MotorModel("B57", "#1a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B57_STATE); this.motors.push(this.B57);
    // #endregion

    // #region B58 - #1b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B58_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B58_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B58_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B58_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B58_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B58_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B58_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B58_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B58_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B58_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B58_STS_outRev;
    stsTags[2] = SignalRService.tagList.B58_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B58_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B58_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B58_STS_limRev;
    stsTags[6] = SignalRService.tagList.B58_STS_almCUM;
    this.B58 = new MotorModel("B58", "#1b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B58_STATE); this.motors.push(this.B58);
    // #endregion

    // #region B59 - #2a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B59_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B59_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B59_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B59_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B59_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B59_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B59_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B59_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B59_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B59_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B59_STS_outRev;
    stsTags[2] = SignalRService.tagList.B59_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B59_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B59_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B59_STS_limRev;
    stsTags[6] = SignalRService.tagList.B59_STS_almCUM;
    this.B59 = new MotorModel("B59", "#2a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B59_STATE); this.motors.push(this.B59);
    // #endregion

    // #region B60 - #2b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B60_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B60_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B60_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B60_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B60_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B60_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B60_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B60_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B60_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B60_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B60_STS_outRev;
    stsTags[2] = SignalRService.tagList.B60_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B60_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B60_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B60_STS_limRev;
    stsTags[6] = SignalRService.tagList.B60_STS_almCUM;
    this.B60 = new MotorModel("B60", "#2b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B60_STATE); this.motors.push(this.B60);
    // #endregion

    // #region B61 - #3a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B61_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B61_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B61_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B61_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B61_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B61_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B61_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B61_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B61_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B61_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B61_STS_outRev;
    stsTags[2] = SignalRService.tagList.B61_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B61_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B61_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B61_STS_limRev;
    stsTags[6] = SignalRService.tagList.B61_STS_almCUM;
    this.B61 = new MotorModel("B61", "#3a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B61_STATE); this.motors.push(this.B61);
    // #endregion

    // #region B62 - #3b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B62_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B62_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B62_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B62_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B62_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B62_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B62_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B62_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B62_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B62_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B62_STS_outRev;
    stsTags[2] = SignalRService.tagList.B62_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B62_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B62_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B62_STS_limRev;
    stsTags[6] = SignalRService.tagList.B62_STS_almCUM;
    this.B62 = new MotorModel("B62", "#3b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B62_STATE); this.motors.push(this.B62);
    // #endregion

    // #region B63 - #4a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B63_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B63_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B63_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B63_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B63_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B63_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B63_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B63_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B63_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B63_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B63_STS_outRev;
    stsTags[2] = SignalRService.tagList.B63_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B63_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B63_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B63_STS_limRev;
    stsTags[6] = SignalRService.tagList.B63_STS_almCUM;
    this.B63 = new MotorModel("B63", "#4a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B63_STATE); this.motors.push(this.B63);
    // #endregion

    // #region B64 - #4b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B64_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B64_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B64_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B64_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B64_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B64_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B64_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B64_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B64_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B64_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B64_STS_outRev;
    stsTags[2] = SignalRService.tagList.B64_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B64_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B64_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B64_STS_limRev;
    stsTags[6] = SignalRService.tagList.B64_STS_almCUM;
    this.B64 = new MotorModel("B64", "#4b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B64_STATE); this.motors.push(this.B64);
    // #endregion

    // #region B65 - #5a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B65_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B65_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B65_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B65_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B65_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B65_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B65_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B65_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B65_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B65_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B65_STS_outRev;
    stsTags[2] = SignalRService.tagList.B65_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B65_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B65_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B65_STS_limRev;
    stsTags[6] = SignalRService.tagList.B65_STS_almCUM;
    this.B65 = new MotorModel("B65", "#5a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B65_STATE); this.motors.push(this.B65);
    // #endregion

    // #region B66 - #5b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B66_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B66_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B66_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B66_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B66_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B66_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B66_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B66_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B66_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B66_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B66_STS_outRev;
    stsTags[2] = SignalRService.tagList.B66_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B66_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B66_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B66_STS_limRev;
    stsTags[6] = SignalRService.tagList.B66_STS_almCUM;
    this.B66 = new MotorModel("B66", "#5b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B66_STATE); this.motors.push(this.B66);
    // #endregion

    // #region B67 - Cooler Fan A
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B67_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B67_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B67_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B67_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B67_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B67_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B67_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B67_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B67_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B67_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B67_STS_outRev;
    stsTags[2] = SignalRService.tagList.B67_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B67_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B67_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B67_STS_limRev;
    stsTags[6] = SignalRService.tagList.B67_STS_almCUM;
    this.B67 = new MotorModel("B67", "Cooler Fan A", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B67_STATE); this.motors.push(this.B67);
    // #endregion

    // #region B68 - Cooler Fan B
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B68_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B68_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B68_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B68_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B68_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B68_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B68_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B68_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B68_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B68_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B68_STS_outRev;
    stsTags[2] = SignalRService.tagList.B68_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B68_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B68_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B68_STS_limRev;
    stsTags[6] = SignalRService.tagList.B68_STS_almCUM;
    this.B68 = new MotorModel("B68", "Cooler Fan B", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B68_STATE); this.motors.push(this.B68);
    // #endregion

    // #region B69 - Ordering Fan A
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B69_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B69_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B69_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B69_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B69_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B69_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B69_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B69_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B69_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B69_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B69_STS_outRev;
    stsTags[2] = SignalRService.tagList.B69_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B69_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B69_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B69_STS_limRev;
    stsTags[6] = SignalRService.tagList.B69_STS_almCUM;
    this.B69 = new MotorModel("B69", "Ordering Fan A", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B69_STATE); this.motors.push(this.B69);
    // #endregion

    // #region B70 - Ordering Fan B
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B70_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B70_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B70_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B70_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B70_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B70_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B70_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B70_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B70_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B70_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B70_STS_outRev;
    stsTags[2] = SignalRService.tagList.B70_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B70_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B70_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B70_STS_limRev;
    stsTags[6] = SignalRService.tagList.B70_STS_almCUM;
    this.B70 = new MotorModel("B70", "Ordering Fan B", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B70_STATE); this.motors.push(this.B70);
    // #endregion

    // #region B71 - Ordering Fan C
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B71_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B71_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B71_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B71_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B71_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B71_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B71_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B71_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B71_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B71_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B71_STS_outRev;
    stsTags[2] = SignalRService.tagList.B71_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B71_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B71_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B71_STS_limRev;
    stsTags[6] = SignalRService.tagList.B71_STS_almCUM;
    this.B71 = new MotorModel("B71", "Ordering Fan C", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B71_STATE); this.motors.push(this.B71);
    // #endregion

    // #region B72 - Ordering Fan D
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B72_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B72_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B72_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B72_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B72_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B72_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B72_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B72_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B72_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B72_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B72_STS_outRev;
    stsTags[2] = SignalRService.tagList.B72_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B72_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B72_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B72_STS_limRev;
    stsTags[6] = SignalRService.tagList.B72_STS_almCUM;
    this.B72 = new MotorModel("B72", "Ordering Fan D", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B72_STATE); this.motors.push(this.B72);
    // #endregion

    // #region B73 - Ordering Fan E
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B73_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B73_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B73_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B73_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B73_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B73_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B73_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B73_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B73_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B73_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B73_STS_outRev;
    stsTags[2] = SignalRService.tagList.B73_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B73_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B73_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B73_STS_limRev;
    stsTags[6] = SignalRService.tagList.B73_STS_almCUM;
    this.B73 = new MotorModel("B73", "Ordering Fan E", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B73_STATE); this.motors.push(this.B73);
    // #endregion

    // #region B74 - Ordering Fan F
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B74_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B74_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B74_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B74_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B74_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B74_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B74_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B74_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B74_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B74_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B74_STS_outRev;
    stsTags[2] = SignalRService.tagList.B74_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B74_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B74_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B74_STS_limRev;
    stsTags[6] = SignalRService.tagList.B74_STS_almCUM;
    this.B74 = new MotorModel("B74", "Ordering Fan F", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B74_STATE); this.motors.push(this.B74);
    // #endregion

    // #region B75 - Ordering Fan G
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B75_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B75_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B75_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B75_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B75_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B75_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B75_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B75_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B75_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B75_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B75_STS_outRev;
    stsTags[2] = SignalRService.tagList.B75_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B75_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B75_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B75_STS_limRev;
    stsTags[6] = SignalRService.tagList.B75_STS_almCUM;
    this.B75 = new MotorModel("B75", "Ordering Fan G", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B75_STATE); this.motors.push(this.B75);
    // #endregion

    // #region B76 - Ordering Fan H
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B76_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B76_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B76_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B76_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B76_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B76_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B76_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B76_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B76_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B76_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B76_STS_outRev;
    stsTags[2] = SignalRService.tagList.B76_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B76_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B76_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B76_STS_limRev;
    stsTags[6] = SignalRService.tagList.B76_STS_almCUM;
    this.B76 = new MotorModel("B76", "Ordering Fan H", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B76_STATE); this.motors.push(this.B76);
    // #endregion

    // #region B77 - Heat Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B77_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B77_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B77_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B77_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B77_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B77_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B77_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B77_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B77_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B77_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B77_STS_outRev;
    stsTags[2] = SignalRService.tagList.B77_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B77_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B77_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B77_STS_limRev;
    stsTags[6] = SignalRService.tagList.B77_STS_almCUM;
    this.B77 = new MotorModel("B77", "Heat Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B77_STATE); this.motors.push(this.B77);
    // #endregion

    // #region B78 - Cooler Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B78_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B78_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B78_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B78_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B78_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B78_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B78_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B78_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B78_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B78_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B78_STS_outRev;
    stsTags[2] = SignalRService.tagList.B78_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B78_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B78_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B78_STS_limRev;
    stsTags[6] = SignalRService.tagList.B78_STS_almCUM;
    this.B78 = new MotorModel("B78", "Cooler Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B78_STATE); this.motors.push(this.B78);
    // #endregion

    // #region B79 - Ordering Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B79_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B79_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B79_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B79_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B79_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B79_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B79_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B79_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B79_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B79_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B79_STS_outRev;
    stsTags[2] = SignalRService.tagList.B79_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B79_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B79_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B79_STS_limRev;
    stsTags[6] = SignalRService.tagList.B79_STS_almCUM;
    this.B79 = new MotorModel("B79", "Ordering Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B79_STATE); this.motors.push(this.B79);
    // #endregion

    // #region B80 - Exit Hood Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B80_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B80_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B80_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B80_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B80_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B80_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B80_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B80_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B80_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B80_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B80_STS_outRev;
    stsTags[2] = SignalRService.tagList.B80_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B80_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B80_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B80_STS_limRev;
    stsTags[6] = SignalRService.tagList.B80_STS_almCUM;
    this.B80 = new MotorModel("B80", "Exit Hood Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B80_STATE); this.motors.push(this.B80);
    // #endregion

    // #region B81 - Water Pump
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B81_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B81_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B81_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B81_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B81_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B81_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B81_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B81_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B81_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B81_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B81_STS_outRev;
    stsTags[2] = SignalRService.tagList.B81_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B81_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B81_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B81_STS_limRev;
    stsTags[6] = SignalRService.tagList.B81_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B81_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B81_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B81_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B81_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B81_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B81_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B81_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B81_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B81_actWarning;
    this.B81 = new MotorModel("B81", "Water Pump", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B81_STATE, vfdTags); this.motors.push(this.B81);
    // #endregion

    // #region B82 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B82_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B82_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B82_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B82_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B82_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B82_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B82_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B82_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B82_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B82_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B82_STS_outRev;
    stsTags[2] = SignalRService.tagList.B82_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B82_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B82_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B82_STS_limRev;
    stsTags[6] = SignalRService.tagList.B82_STS_almCUM;
    this.B82 = new MotorModel("B82", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B82_STATE); this.motors.push(this.B82);
    // #endregion
    // #endregion

    //*******************************************************
    // #region FINAL DRYER

    // #region F47 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F47_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F47_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F47_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F47_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F47_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F47_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F47_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F47_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F47_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F47_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F47_STS_outRev;
    stsTags[2] = SignalRService.tagList.F47_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F47_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F47_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F47_STS_limRev;
    stsTags[6] = SignalRService.tagList.F47_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F47_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F47_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F47_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F47_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F47_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F47_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F47_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F47_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F47_actWarning;
    this.F47 = new MotorModel("F47", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F47_STATE, vfdTags); this.motors.push(this.F47);
    // #endregion

    // #region F48 - Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F48_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F48_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F48_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F48_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F48_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F48_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F48_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F48_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F48_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F48_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F48_STS_outRev;
    stsTags[2] = SignalRService.tagList.F48_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F48_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F48_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F48_STS_limRev;
    stsTags[6] = SignalRService.tagList.F48_STS_almCUM;
    this.F48 = new MotorModel("F48", "Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F48_STATE); this.motors.push(this.F48);
    // #endregion

    // #region F49 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F49_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F49_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F49_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F49_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F49_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F49_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F49_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F49_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F49_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F49_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F49_STS_outRev;
    stsTags[2] = SignalRService.tagList.F49_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F49_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F49_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F49_STS_limRev;
    stsTags[6] = SignalRService.tagList.F49_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F49_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F49_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F49_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F49_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F49_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F49_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F49_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F49_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F49_actWarning;
    this.F49 = new MotorModel("F49", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F49_STATE, vfdTags); this.motors.push(this.F49);
    // #endregion

    // #region F50 - Hold Down Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F50_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F50_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F50_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F50_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F50_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F50_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F50_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F50_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F50_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F50_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F50_STS_outRev;
    stsTags[2] = SignalRService.tagList.F50_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F50_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F50_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F50_STS_limRev;
    stsTags[6] = SignalRService.tagList.F50_STS_almCUM;
    this.F50 = new MotorModel("F50", "Hold Down Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F50_STATE); this.motors.push(this.F50);
    // #endregion

    // #region F51 - Brush
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F51_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F51_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F51_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F51_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F51_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F51_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F51_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F51_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F51_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F51_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F51_STS_outRev;
    stsTags[2] = SignalRService.tagList.F51_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F51_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F51_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F51_STS_limRev;
    stsTags[6] = SignalRService.tagList.F51_STS_almCUM;
    this.F51 = new MotorModel("F51", "Brush", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F51_STATE); this.motors.push(this.F51);
    // #endregion

    // #region F52 - #1a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F52_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F52_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F52_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F52_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F52_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F52_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F52_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F52_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F52_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F52_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F52_STS_outRev;
    stsTags[2] = SignalRService.tagList.F52_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F52_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F52_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F52_STS_limRev;
    stsTags[6] = SignalRService.tagList.F52_STS_almCUM;
    this.F52 = new MotorModel("F52", "#1a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F52_STATE); this.motors.push(this.F52);
    // #endregion

    // #region F53 - #1b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F53_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F53_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F53_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F53_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F53_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F53_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F53_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F53_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F53_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F53_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F53_STS_outRev;
    stsTags[2] = SignalRService.tagList.F53_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F53_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F53_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F53_STS_limRev;
    stsTags[6] = SignalRService.tagList.F53_STS_almCUM;
    this.F53 = new MotorModel("F53", "#1b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F53_STATE); this.motors.push(this.F53);
    // #endregion

    // #region F54 - #2a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F54_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F54_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F54_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F54_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F54_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F54_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F54_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F54_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F54_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F54_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F54_STS_outRev;
    stsTags[2] = SignalRService.tagList.F54_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F54_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F54_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F54_STS_limRev;
    stsTags[6] = SignalRService.tagList.F54_STS_almCUM;
    this.F54 = new MotorModel("F54", "#2a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F54_STATE); this.motors.push(this.F54);
    // #endregion

    // #region F55 - #2b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F55_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F55_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F55_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F55_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F55_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F55_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F55_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F55_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F55_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F55_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F55_STS_outRev;
    stsTags[2] = SignalRService.tagList.F55_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F55_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F55_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F55_STS_limRev;
    stsTags[6] = SignalRService.tagList.F55_STS_almCUM;
    this.F55 = new MotorModel("F55", "#2b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F55_STATE); this.motors.push(this.F55);
    // #endregion

    // #region F56 - #3a Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F56_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F56_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F56_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F56_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F56_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F56_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F56_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F56_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F56_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F56_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F56_STS_outRev;
    stsTags[2] = SignalRService.tagList.F56_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F56_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F56_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F56_STS_limRev;
    stsTags[6] = SignalRService.tagList.F56_STS_almCUM;
    this.F56 = new MotorModel("F56", "#3a Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F56_STATE); this.motors.push(this.F56);
    // #endregion

    // #region F57 - #3b Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F57_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F57_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F57_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F57_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F57_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F57_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F57_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F57_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F57_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F57_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F57_STS_outRev;
    stsTags[2] = SignalRService.tagList.F57_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F57_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F57_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F57_STS_limRev;
    stsTags[6] = SignalRService.tagList.F57_STS_almCUM;
    this.F57 = new MotorModel("F57", "#3b Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F57_STATE); this.motors.push(this.F57);
    // #endregion

    // #region F58 - Cooler Fan A
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F58_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F58_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F58_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F58_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F58_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F58_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F58_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F58_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F58_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F58_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F58_STS_outRev;
    stsTags[2] = SignalRService.tagList.F58_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F58_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F58_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F58_STS_limRev;
    stsTags[6] = SignalRService.tagList.F58_STS_almCUM;
    this.F58 = new MotorModel("F58", "Cooler Fan A", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F58_STATE); this.motors.push(this.F58);
    // #endregion

    // #region F59 - Cooler Fan B
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F59_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F59_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F59_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F59_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F59_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F59_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F59_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F59_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F59_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F59_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F59_STS_outRev;
    stsTags[2] = SignalRService.tagList.F59_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F59_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F59_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F59_STS_limRev;
    stsTags[6] = SignalRService.tagList.F59_STS_almCUM;
    this.F59 = new MotorModel("F59", "Cooler Fan B", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F59_STATE); this.motors.push(this.F59);
    // #endregion

    // #region F60 - Ordering Fan A
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F60_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F60_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F60_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F60_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F60_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F60_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F60_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F60_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F60_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F60_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F60_STS_outRev;
    stsTags[2] = SignalRService.tagList.F60_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F60_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F60_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F60_STS_limRev;
    stsTags[6] = SignalRService.tagList.F60_STS_almCUM;
    this.F60 = new MotorModel("F60", "Ordering Fan A", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F60_STATE); this.motors.push(this.F60);
    // #endregion

    // #region F61 - Ordering Fan B
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F61_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F61_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F61_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F61_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F61_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F61_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F61_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F61_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F61_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F61_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F61_STS_outRev;
    stsTags[2] = SignalRService.tagList.F61_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F61_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F61_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F61_STS_limRev;
    stsTags[6] = SignalRService.tagList.F61_STS_almCUM;
    this.F61 = new MotorModel("F61", "Ordering Fan B", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F61_STATE); this.motors.push(this.F61);
    // #endregion

    // #region F62 - Ordering Fan C
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F62_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F62_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F62_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F62_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F62_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F62_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F62_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F62_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F62_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F62_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F62_STS_outRev;
    stsTags[2] = SignalRService.tagList.F62_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F62_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F62_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F62_STS_limRev;
    stsTags[6] = SignalRService.tagList.F62_STS_almCUM;
    this.F62 = new MotorModel("F62", "Ordering Fan C", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F62_STATE); this.motors.push(this.F62);
    // #endregion

    // #region F63 - Ordering Fan D
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F63_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F63_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F63_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F63_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F63_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F63_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F63_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F63_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F63_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F63_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F63_STS_outRev;
    stsTags[2] = SignalRService.tagList.F63_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F63_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F63_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F63_STS_limRev;
    stsTags[6] = SignalRService.tagList.F63_STS_almCUM;
    this.F63 = new MotorModel("F63", "Ordering Fan D", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F63_STATE); this.motors.push(this.F63);
    // #endregion

    // #region F64 - Ordering Fan E
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F64_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F64_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F64_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F64_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F64_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F64_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F64_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F64_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F64_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F64_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F64_STS_outRev;
    stsTags[2] = SignalRService.tagList.F64_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F64_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F64_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F64_STS_limRev;
    stsTags[6] = SignalRService.tagList.F64_STS_almCUM;
    this.F64 = new MotorModel("F64", "Ordering Fan E", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F64_STATE); this.motors.push(this.F64);
    // #endregion

    // #region F65 - Ordering Fan F
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F65_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F65_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F65_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F65_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F65_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F65_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F65_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F65_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F65_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F65_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F65_STS_outRev;
    stsTags[2] = SignalRService.tagList.F65_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F65_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F65_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F65_STS_limRev;
    stsTags[6] = SignalRService.tagList.F65_STS_almCUM;
    this.F65 = new MotorModel("F65", "Ordering Fan F", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F65_STATE); this.motors.push(this.F65);
    // #endregion

    // #region F66 - Heat Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F66_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F66_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F66_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F66_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F66_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F66_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F66_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F66_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F66_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F66_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F66_STS_outRev;
    stsTags[2] = SignalRService.tagList.F66_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F66_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F66_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F66_STS_limRev;
    stsTags[6] = SignalRService.tagList.F66_STS_almCUM;
    this.F66 = new MotorModel("F66", "Heat Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F66_STATE); this.motors.push(this.F66);
    // #endregion

    // #region F67 - Cooler Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F67_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F67_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F67_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F67_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F67_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F67_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F67_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F67_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F67_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F67_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F67_STS_outRev;
    stsTags[2] = SignalRService.tagList.F67_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F67_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F67_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F67_STS_limRev;
    stsTags[6] = SignalRService.tagList.F67_STS_almCUM;
    this.F67 = new MotorModel("F67", "Cooler Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F67_STATE); this.motors.push(this.F67);
    // #endregion

    // #region F68 - Ordering Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F68_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F68_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F68_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F68_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F68_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F68_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F68_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F68_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F68_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F68_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F68_STS_outRev;
    stsTags[2] = SignalRService.tagList.F68_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F68_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F68_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F68_STS_limRev;
    stsTags[6] = SignalRService.tagList.F68_STS_almCUM;
    this.F68 = new MotorModel("F68", "Ordering Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F68_STATE); this.motors.push(this.F68);
    // #endregion

    // #region F69 - Exit Hood Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F69_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F69_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F69_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F69_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F69_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F69_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F69_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F69_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F69_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F69_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F69_STS_outRev;
    stsTags[2] = SignalRService.tagList.F69_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F69_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F69_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F69_STS_limRev;
    stsTags[6] = SignalRService.tagList.F69_STS_almCUM;
    this.F69 = new MotorModel("F69", "Exit Hood Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F69_STATE); this.motors.push(this.F69);
    // #endregion

    // #region F70 - Water Pump
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F70_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F70_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F70_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F70_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F70_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F70_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F70_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F70_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F70_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F70_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F70_STS_outRev;
    stsTags[2] = SignalRService.tagList.F70_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F70_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F70_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F70_STS_limRev;
    stsTags[6] = SignalRService.tagList.F70_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F70_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F70_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F70_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F70_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F70_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F70_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F70_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F70_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F70_actWarning;
    this.F70 = new MotorModel("F70", "Water Pump", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F70_STATE, vfdTags); this.motors.push(this.F70);
    // #endregion

    // #region F71 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F71_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F71_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F71_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F71_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F71_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F71_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F71_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F71_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F71_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F71_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F71_STS_outRev;
    stsTags[2] = SignalRService.tagList.F71_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F71_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F71_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F71_STS_limRev;
    stsTags[6] = SignalRService.tagList.F71_STS_almCUM;
    this.F71 = new MotorModel("F71", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F71_STATE); this.motors.push(this.F71);
    // #endregion

    // #region F72 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F72_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F72_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F72_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F72_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F72_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F72_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F72_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F72_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F72_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F72_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F72_STS_outRev;
    stsTags[2] = SignalRService.tagList.F72_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F72_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F72_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F72_STS_limRev;
    stsTags[6] = SignalRService.tagList.F72_STS_almCUM;
    this.F72 = new MotorModel("F72", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F72_STATE); this.motors.push(this.F72);
    // #endregion
    // #endregion

    //*******************************************************
    // #region LISTA MOTORI ZONA 1.0

    // #region V10 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V10_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V10_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V10_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V10_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V10_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V10_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V10_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V10_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V10_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V10_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V10_STS_outRev;
    stsTags[2] = SignalRService.tagList.V10_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V10_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V10_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V10_STS_limRev;
    stsTags[6] = SignalRService.tagList.V10_STS_almCUM;
    this.V10 = new MotorModel("V10", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V10_STATE); this.motors.push(this.V10);
    // #endregion

    // #region V11 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V11_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V11_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V11_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V11_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V11_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V11_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V11_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V11_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V11_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V11_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V11_STS_outRev;
    stsTags[2] = SignalRService.tagList.V11_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V11_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V11_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V11_STS_limRev;
    stsTags[6] = SignalRService.tagList.V11_STS_almCUM;
    this.V11 = new MotorModel("V11", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V11_STATE); this.motors.push(this.V11);
    // #endregion

    // #region V12 - Drive
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V12_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V12_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V12_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V12_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V12_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V12_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V12_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V12_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V12_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V12_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V12_STS_outRev;
    stsTags[2] = SignalRService.tagList.V12_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V12_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V12_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V12_STS_limRev;
    stsTags[6] = SignalRService.tagList.V12_STS_almCUM;
    this.V12 = new MotorModel("V12", "Drive", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V12_STATE); this.motors.push(this.V12);
    // #endregion

    // #region V13 - Drum
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V13_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V13_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V13_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V13_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V13_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V13_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V13_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V13_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V13_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V13_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V13_STS_outRev;
    stsTags[2] = SignalRService.tagList.V13_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V13_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V13_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V13_STS_limRev;
    stsTags[6] = SignalRService.tagList.V13_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V13_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V13_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V13_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V13_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V13_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V13_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V13_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V13_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V13_actWarning;
    this.V13 = new MotorModel("V13", "Drum", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V13_STATE, vfdTags); this.motors.push(this.V13);
    // #endregion

    // #region V13a - Inclination
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V13a_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V13a_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V13a_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V13a_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V13a_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V13a_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V13a_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V13a_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V13a_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V13a_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V13a_STS_outRev;
    stsTags[2] = SignalRService.tagList.V13a_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V13a_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V13a_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V13a_STS_limRev;
    stsTags[6] = SignalRService.tagList.V13a_STS_almCUM;
    this.V13a = new MotorModel("V13a", "Inclination", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V13a_STATE); this.motors.push(this.V13a);
    // #endregion

    // #region V14a - Drum
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V14a_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V14a_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V14a_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V14a_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V14a_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V14a_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V14a_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V14a_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V14a_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V14a_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V14a_STS_outRev;
    stsTags[2] = SignalRService.tagList.V14a_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V14a_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V14a_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V14a_STS_limRev;
    stsTags[6] = SignalRService.tagList.V14a_STS_almCUM;
    this.V14a = new MotorModel("V14a", "Belt Tensioner", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V14a_STATE); this.motors.push(this.V14a);
    // #endregion

    // #region V15 - Recirc/Coil Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V15_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V15_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V15_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V15_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V15_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V15_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V15_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V15_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V15_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V15_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V15_STS_outRev;
    stsTags[2] = SignalRService.tagList.V15_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V15_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V15_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V15_STS_limRev;
    stsTags[6] = SignalRService.tagList.V15_STS_almCUM;
    this.V15 = new MotorModel("V15", "Recirc/Coil Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V15_STATE); this.motors.push(this.V15);
    // #endregion

    // #region V16 - Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V16_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V16_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V16_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V16_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V16_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V16_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V16_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V16_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V16_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V16_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V16_STS_outRev;
    stsTags[2] = SignalRService.tagList.V16_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V16_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V16_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V16_STS_limRev;
    stsTags[6] = SignalRService.tagList.V16_STS_almCUM;
    this.V16 = new MotorModel("V16", "Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V16_STATE); this.motors.push(this.V16);
    // #endregion

    // #region V17 - Cleaning Bar
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V17_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V17_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V17_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V17_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V17_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V17_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V17_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V17_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V17_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V17_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V17_STS_outRev;
    stsTags[2] = SignalRService.tagList.V17_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V17_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V17_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V17_STS_limRev;
    stsTags[6] = SignalRService.tagList.V17_STS_almCUM;
    this.V17 = new MotorModel("V17", "Cleaning Bar", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V17_STATE); this.motors.push(this.V17);
    // #endregion

    // #region V18 - Water Pump
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V18_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V18_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V18_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V18_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V18_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V18_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V18_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V18_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V18_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V18_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V18_STS_outRev;
    stsTags[2] = SignalRService.tagList.V18_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V18_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V18_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V18_STS_limRev;
    stsTags[6] = SignalRService.tagList.V18_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V18_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V18_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V18_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V18_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V18_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V18_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V18_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V18_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V18_actWarning;
    this.V18 = new MotorModel("V18", "Water Pump", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V18_STATE, vfdTags); this.motors.push(this.V18);
    // #endregion

    // #region V18A - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V18A_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V18A_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V18A_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V18A_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V18A_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V18A_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V18A_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V18A_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V18A_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V18A_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V18A_STS_outRev;
    stsTags[2] = SignalRService.tagList.V18A_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V18A_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V18A_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V18A_STS_limRev;
    stsTags[6] = SignalRService.tagList.V18A_STS_almCUM;
    this.V18A = new MotorModel("V18A", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V18A_STATE); this.motors.push(this.V18A);
    // #endregion

    // #region V19 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V19_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V19_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V19_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V19_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V19_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V19_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V19_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V19_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V19_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V19_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V19_STS_outRev;
    stsTags[2] = SignalRService.tagList.V19_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V19_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V19_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V19_STS_limRev;
    stsTags[6] = SignalRService.tagList.V19_STS_almCUM;
    this.V19 = new MotorModel("V19", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V19_STATE); this.motors.push(this.V19);
    // #endregion

    // #region V20 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V20_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V20_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V20_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V20_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V20_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V20_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V20_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V20_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V20_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V20_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V20_STS_outRev;
    stsTags[2] = SignalRService.tagList.V20_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V20_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V20_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V20_STS_limRev;
    stsTags[6] = SignalRService.tagList.V20_STS_almCUM;
    this.V20 = new MotorModel("V20", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V20_STATE); this.motors.push(this.V20);
    // #endregion

    // #region V21 - Rollers
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V21_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V21_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V21_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V21_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V21_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V21_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V21_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V21_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V21_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V21_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V21_STS_outRev;
    stsTags[2] = SignalRService.tagList.V21_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V21_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V21_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V21_STS_limRev;
    stsTags[6] = SignalRService.tagList.V21_STS_almCUM;
    this.V21 = new MotorModel("V21", "Rollers", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V21_STATE); this.motors.push(this.V21);
    // #endregion

    // #region V22 - Belt
    // Il nastro della macchina V3 e' bidirezionale e nel sinottico si chiama V22. Nello
    // scambio dati il suo unico record e' nominato con la sigla del senso avanti (V22F,
    // dove la F sta per Forward - vedi Docs/Scambio Dati/motori-zone.txt), ma i due sensi
    // stanno dentro quello stesso record (V22F_CMD_ManCmdFwd/Rev, V22F_STS_stsFwd/Rev):
    // non esiste nessun V22R. Quindi il device si chiama V22 e i tag restano V22F_*.
    // Attenzione: in Alarms/Allarmi.cs l'utenza di questi allarmi e' ancora "V22F".
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V22F_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V22F_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V22F_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V22F_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V22F_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V22F_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V22F_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V22F_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V22F_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V22F_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V22F_STS_outRev;
    stsTags[2] = SignalRService.tagList.V22F_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V22F_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V22F_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V22F_STS_limRev;
    stsTags[6] = SignalRService.tagList.V22F_STS_almCUM;
    this.V22 = new MotorModel("V22", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V22F_STATE); this.motors.push(this.V22);
    // #endregion

    // #region V23 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V23_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V23_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V23_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V23_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V23_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V23_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V23_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V23_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V23_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V23_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V23_STS_outRev;
    stsTags[2] = SignalRService.tagList.V23_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V23_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V23_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V23_STS_limRev;
    stsTags[6] = SignalRService.tagList.V23_STS_almCUM;
    this.V23 = new MotorModel("V23", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V23_STATE); this.motors.push(this.V23);
    // #endregion

    // #region V23S  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.V23S = new MotorModel("V23S", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "V23S_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.V23S);
    // #endregion

    // #region V23D  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.V23D = new MotorModel("V23D", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "V23D_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.V23D);
    // #endregion

    // #region V24 - Drum
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V24_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V24_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V24_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V24_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V24_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V24_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V24_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V24_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V24_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V24_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V24_STS_outRev;
    stsTags[2] = SignalRService.tagList.V24_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V24_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V24_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V24_STS_limRev;
    stsTags[6] = SignalRService.tagList.V24_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V24_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V24_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V24_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V24_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V24_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V24_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V24_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V24_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V24_actWarning;
    this.V24 = new MotorModel("V24", "Drum", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V24_STATE, vfdTags); this.motors.push(this.V24);
    // #endregion

    // #region V25 - Water Pump
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V25_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V25_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V25_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V25_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V25_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V25_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V25_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V25_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V25_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V25_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V25_STS_outRev;
    stsTags[2] = SignalRService.tagList.V25_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V25_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V25_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V25_STS_limRev;
    stsTags[6] = SignalRService.tagList.V25_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V25_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V25_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V25_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V25_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V25_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V25_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V25_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V25_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V25_actWarning;
    this.V25 = new MotorModel("V25", "Water Pump", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V25_STATE, vfdTags); this.motors.push(this.V25);
    // #endregion

    // #region V26 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V26_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V26_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V26_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V26_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V26_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V26_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V26_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V26_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V26_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V26_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V26_STS_outRev;
    stsTags[2] = SignalRService.tagList.V26_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V26_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V26_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V26_STS_limRev;
    stsTags[6] = SignalRService.tagList.V26_STS_almCUM;
    this.V26 = new MotorModel("V26", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V26_STATE); this.motors.push(this.V26);
    // #endregion

    // #region V26A - VIRGINIA
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V26A_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V26A_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V26A_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V26A_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V26A_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V26A_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V26A_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V26A_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V26A_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V26A_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V26A_STS_outRev;
    stsTags[2] = SignalRService.tagList.V26A_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V26A_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V26A_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V26A_STS_limRev;
    stsTags[6] = SignalRService.tagList.V26A_STS_almCUM;
    this.V26A = new MotorModel("V26A", "VIRGINIA", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V26A_STATE); this.motors.push(this.V26A);
    // #endregion

    // #region V27 - Incline
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V27_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V27_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V27_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V27_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V27_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V27_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V27_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V27_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V27_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V27_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V27_STS_outRev;
    stsTags[2] = SignalRService.tagList.V27_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V27_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V27_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V27_STS_limRev;
    stsTags[6] = SignalRService.tagList.V27_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V27_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V27_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V27_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V27_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V27_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V27_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V27_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V27_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V27_actWarning;
    this.V27 = new MotorModel("V27", "Incline", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V27_STATE, vfdTags); this.motors.push(this.V27);
    // #endregion

    // #region V28 - Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V28_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V28_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V28_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V28_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V28_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V28_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V28_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V28_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V28_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V28_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V28_STS_outRev;
    stsTags[2] = SignalRService.tagList.V28_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V28_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V28_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V28_STS_limRev;
    stsTags[6] = SignalRService.tagList.V28_STS_almCUM;
    this.V28 = new MotorModel("V28", "Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V28_STATE); this.motors.push(this.V28);
    // #endregion

    // #region V29 - Inlet Winnower
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V29_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V29_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V29_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V29_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V29_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V29_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V29_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V29_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V29_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V29_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V29_STS_outRev;
    stsTags[2] = SignalRService.tagList.V29_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V29_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V29_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V29_STS_limRev;
    stsTags[6] = SignalRService.tagList.V29_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V29_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V29_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V29_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V29_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V29_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V29_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V29_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V29_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V29_actWarning;
    this.V29 = new MotorModel("V29", "Inlet Winnower", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V29_STATE, vfdTags); this.motors.push(this.V29);
    // #endregion

    // #region V30 - Apron/Air Lock
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V30_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V30_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V30_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V30_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V30_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V30_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V30_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V30_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V30_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V30_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V30_STS_outRev;
    stsTags[2] = SignalRService.tagList.V30_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V30_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V30_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V30_STS_limRev;
    stsTags[6] = SignalRService.tagList.V30_STS_almCUM;
    this.V30 = new MotorModel("V30", "Apron/Air Lock", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V30_STATE); this.motors.push(this.V30);
    // #endregion

    // #region V31 - Unloading Separator
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V31_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V31_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V31_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V31_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V31_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V31_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V31_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V31_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V31_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V31_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V31_STS_outRev;
    stsTags[2] = SignalRService.tagList.V31_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V31_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V31_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V31_STS_limRev;
    stsTags[6] = SignalRService.tagList.V31_STS_almCUM;
    this.V31 = new MotorModel("V31", "Unloading Separator", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V31_STATE); this.motors.push(this.V31);
    // #endregion

    // #region V32 - #1 Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V32_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V32_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V32_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V32_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V32_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V32_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V32_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V32_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V32_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V32_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V32_STS_outRev;
    stsTags[2] = SignalRService.tagList.V32_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V32_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V32_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V32_STS_limRev;
    stsTags[6] = SignalRService.tagList.V32_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V32_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V32_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V32_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V32_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V32_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V32_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V32_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V32_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V32_actWarning;
    this.V32 = new MotorModel("V32", "#1 Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V32_STATE, vfdTags); this.motors.push(this.V32);
    // #endregion

    // #region V33 - #2 Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V33_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V33_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V33_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V33_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V33_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V33_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V33_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V33_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V33_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V33_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V33_STS_outRev;
    stsTags[2] = SignalRService.tagList.V33_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V33_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V33_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V33_STS_limRev;
    stsTags[6] = SignalRService.tagList.V33_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_V33_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_V33_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_V33_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_V33_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_V33_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_V33_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_V33_energy;
    vfdTags[7] = SignalRService.tagList.VFD_V33_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_V33_actWarning;
    this.V33 = new MotorModel("V33", "#2 Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V33_STATE, vfdTags); this.motors.push(this.V33);
    // #endregion

    // #region V34 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V34_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V34_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V34_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V34_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V34_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V34_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V34_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V34_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V34_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V34_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V34_STS_outRev;
    stsTags[2] = SignalRService.tagList.V34_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V34_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V34_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V34_STS_limRev;
    stsTags[6] = SignalRService.tagList.V34_STS_almCUM;
    this.V34 = new MotorModel("V34", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V34_STATE); this.motors.push(this.V34);
    // #endregion

    // #region V35 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V35_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V35_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V35_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V35_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V35_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V35_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V35_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V35_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V35_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V35_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V35_STS_outRev;
    stsTags[2] = SignalRService.tagList.V35_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V35_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V35_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V35_STS_limRev;
    stsTags[6] = SignalRService.tagList.V35_STS_almCUM;
    this.V35 = new MotorModel("V35", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V35_STATE); this.motors.push(this.V35);
    // #endregion

    // #region V36 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V36_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V36_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V36_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V36_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V36_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V36_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V36_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V36_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V36_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V36_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V36_STS_outRev;
    stsTags[2] = SignalRService.tagList.V36_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V36_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V36_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V36_STS_limRev;
    stsTags[6] = SignalRService.tagList.V36_STS_almCUM;
    this.V36 = new MotorModel("V36", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V36_STATE); this.motors.push(this.V36);
    // #endregion

    // #region V37 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V37_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V37_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V37_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V37_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V37_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V37_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V37_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V37_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V37_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V37_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V37_STS_outRev;
    stsTags[2] = SignalRService.tagList.V37_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V37_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V37_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V37_STS_limRev;
    stsTags[6] = SignalRService.tagList.V37_STS_almCUM;
    this.V37 = new MotorModel("V37", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V37_STATE); this.motors.push(this.V37);
    // #endregion

    // #region V38 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V38_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V38_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V38_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V38_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V38_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V38_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V38_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V38_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V38_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V38_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V38_STS_outRev;
    stsTags[2] = SignalRService.tagList.V38_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V38_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V38_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V38_STS_limRev;
    stsTags[6] = SignalRService.tagList.V38_STS_almCUM;
    this.V38 = new MotorModel("V38", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V38_STATE); this.motors.push(this.V38);
    // #endregion

    // #region V39 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V39_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V39_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V39_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V39_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V39_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V39_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V39_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V39_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V39_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V39_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V39_STS_outRev;
    stsTags[2] = SignalRService.tagList.V39_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V39_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V39_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V39_STS_limRev;
    stsTags[6] = SignalRService.tagList.V39_STS_almCUM;
    this.V39 = new MotorModel("V39", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V39_STATE); this.motors.push(this.V39);
    // #endregion

    // #region V40 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V40_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V40_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V40_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V40_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V40_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V40_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V40_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V40_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V40_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V40_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V40_STS_outRev;
    stsTags[2] = SignalRService.tagList.V40_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V40_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V40_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V40_STS_limRev;
    stsTags[6] = SignalRService.tagList.V40_STS_almCUM;
    this.V40 = new MotorModel("V40", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V40_STATE); this.motors.push(this.V40);
    // #endregion

    // #region V41 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V41_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V41_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V41_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V41_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V41_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V41_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V41_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V41_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V41_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V41_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V41_STS_outRev;
    stsTags[2] = SignalRService.tagList.V41_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V41_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V41_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V41_STS_limRev;
    stsTags[6] = SignalRService.tagList.V41_STS_almCUM;
    this.V41 = new MotorModel("V41", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V41_STATE); this.motors.push(this.V41);
    // #endregion

    // #region V42 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V42_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V42_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V42_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V42_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V42_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V42_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V42_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V42_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V42_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V42_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V42_STS_outRev;
    stsTags[2] = SignalRService.tagList.V42_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V42_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V42_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V42_STS_limRev;
    stsTags[6] = SignalRService.tagList.V42_STS_almCUM;
    this.V42 = new MotorModel("V42", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V42_STATE); this.motors.push(this.V42);
    // #endregion

    // #region V43 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V43_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V43_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V43_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V43_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V43_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V43_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V43_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V43_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V43_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V43_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V43_STS_outRev;
    stsTags[2] = SignalRService.tagList.V43_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V43_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V43_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V43_STS_limRev;
    stsTags[6] = SignalRService.tagList.V43_STS_almCUM;
    this.V43 = new MotorModel("V43", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V43_STATE); this.motors.push(this.V43);
    // #endregion

    // #region V44 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V44_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V44_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V44_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V44_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V44_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V44_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V44_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V44_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V44_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V44_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V44_STS_outRev;
    stsTags[2] = SignalRService.tagList.V44_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V44_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V44_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V44_STS_limRev;
    stsTags[6] = SignalRService.tagList.V44_STS_almCUM;
    this.V44 = new MotorModel("V44", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V44_STATE); this.motors.push(this.V44);
    // #endregion

    // #region V45 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V45_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V45_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V45_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V45_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V45_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V45_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V45_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V45_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V45_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V45_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V45_STS_outRev;
    stsTags[2] = SignalRService.tagList.V45_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V45_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V45_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V45_STS_limRev;
    stsTags[6] = SignalRService.tagList.V45_STS_almCUM;
    this.V45 = new MotorModel("V45", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V45_STATE); this.motors.push(this.V45);
    // #endregion

    // #region V46 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V46_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V46_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V46_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V46_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V46_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V46_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V46_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V46_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V46_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V46_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V46_STS_outRev;
    stsTags[2] = SignalRService.tagList.V46_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V46_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V46_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V46_STS_limRev;
    stsTags[6] = SignalRService.tagList.V46_STS_almCUM;
    this.V46 = new MotorModel("V46", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V46_STATE); this.motors.push(this.V46);
    // #endregion

    // #region V47 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V47_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V47_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V47_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V47_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V47_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V47_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V47_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V47_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V47_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V47_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V47_STS_outRev;
    stsTags[2] = SignalRService.tagList.V47_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V47_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V47_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V47_STS_limRev;
    stsTags[6] = SignalRService.tagList.V47_STS_almCUM;
    this.V47 = new MotorModel("V47", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V47_STATE); this.motors.push(this.V47);
    // #endregion

    // #region V48 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V48_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V48_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V48_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V48_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V48_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V48_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V48_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V48_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V48_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V48_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V48_STS_outRev;
    stsTags[2] = SignalRService.tagList.V48_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V48_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V48_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V48_STS_limRev;
    stsTags[6] = SignalRService.tagList.V48_STS_almCUM;
    this.V48 = new MotorModel("V48", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V48_STATE); this.motors.push(this.V48);
    // #endregion

    // #region V49 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V49_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V49_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V49_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V49_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V49_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V49_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V49_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V49_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V49_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V49_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V49_STS_outRev;
    stsTags[2] = SignalRService.tagList.V49_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V49_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V49_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V49_STS_limRev;
    stsTags[6] = SignalRService.tagList.V49_STS_almCUM;
    this.V49 = new MotorModel("V49", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V49_STATE); this.motors.push(this.V49);
    // #endregion

    // #region VB
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VB_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VB_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VB_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VB_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VB_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VB_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VB_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VB_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VB_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VB_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VB_STS_outRev;
    stsTags[2] = SignalRService.tagList.VB_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VB_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VB_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VB_STS_limRev;
    stsTags[6] = SignalRService.tagList.VB_STS_almCUM;
    this.VB = new MotorModel("VB", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VB_STATE); this.motors.push(this.VB);
    // #endregion

    // #region VC
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VC_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VC_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VC_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VC_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VC_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VC_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VC_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VC_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VC_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VC_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VC_STS_outRev;
    stsTags[2] = SignalRService.tagList.VC_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VC_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VC_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VC_STS_limRev;
    stsTags[6] = SignalRService.tagList.VC_STS_almCUM;
    this.VC = new MotorModel("VC", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VC_STATE); this.motors.push(this.VC);
    // #endregion

    // #region VC1
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VC1_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VC1_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VC1_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VC1_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VC1_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VC1_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VC1_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VC1_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VC1_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VC1_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VC1_STS_outRev;
    stsTags[2] = SignalRService.tagList.VC1_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VC1_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VC1_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VC1_STS_limRev;
    stsTags[6] = SignalRService.tagList.VC1_STS_almCUM;
    this.VC1 = new MotorModel("VC1", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VC1_STATE); this.motors.push(this.VC1);
    // #endregion

    // #region VC2
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VC2_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VC2_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VC2_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VC2_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VC2_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VC2_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VC2_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VC2_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VC2_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VC2_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VC2_STS_outRev;
    stsTags[2] = SignalRService.tagList.VC2_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VC2_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VC2_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VC2_STS_limRev;
    stsTags[6] = SignalRService.tagList.VC2_STS_almCUM;
    this.VC2 = new MotorModel("VC2", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VC2_STATE); this.motors.push(this.VC2);
    // #endregion

    // #region VC3
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VC3_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VC3_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VC3_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VC3_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VC3_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VC3_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VC3_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VC3_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VC3_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VC3_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VC3_STS_outRev;
    stsTags[2] = SignalRService.tagList.VC3_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VC3_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VC3_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VC3_STS_limRev;
    stsTags[6] = SignalRService.tagList.VC3_STS_almCUM;
    this.VC3 = new MotorModel("VC3", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VC3_STATE); this.motors.push(this.VC3);
    // #endregion

    // #region VD
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VD_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VD_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VD_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VD_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VD_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VD_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VD_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VD_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VD_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VD_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VD_STS_outRev;
    stsTags[2] = SignalRService.tagList.VD_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VD_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VD_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VD_STS_limRev;
    stsTags[6] = SignalRService.tagList.VD_STS_almCUM;
    this.VD = new MotorModel("VD", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VD_STATE); this.motors.push(this.VD);
    // #endregion

    // #region VE
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VE_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VE_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VE_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VE_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VE_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VE_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VE_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VE_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VE_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VE_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VE_STS_outRev;
    stsTags[2] = SignalRService.tagList.VE_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VE_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VE_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VE_STS_limRev;
    stsTags[6] = SignalRService.tagList.VE_STS_almCUM;
    this.VE = new MotorModel("VE", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VE_STATE); this.motors.push(this.VE);
    // #endregion

    // #region VF
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.VF_ALM_almMOL;
    almTags[1] = SignalRService.tagList.VF_ALM_almMAC;
    almTags[2] = SignalRService.tagList.VF_ALM_almDAC;
    almTags[3] = SignalRService.tagList.VF_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.VF_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.VF_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.VF_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.VF_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.VF_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.VF_STS_outFwd;
    stsTags[1] = SignalRService.tagList.VF_STS_outRev;
    stsTags[2] = SignalRService.tagList.VF_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.VF_STS_stsRev;
    stsTags[4] = SignalRService.tagList.VF_STS_limFwd;
    stsTags[5] = SignalRService.tagList.VF_STS_limRev;
    stsTags[6] = SignalRService.tagList.VF_STS_almCUM;
    this.VF = new MotorModel("VF", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VF_STATE); this.motors.push(this.VF);
    // #endregion

    // #region V23B  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.V23B = new MotorModel("V23B", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "V23B_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.V23B);
    // #endregion
    // #endregion

    //*******************************************************
    // #region LISTA MOTORI ZONA 3.4

    // #region F73 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F73_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F73_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F73_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F73_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F73_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F73_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F73_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F73_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F73_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F73_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F73_STS_outRev;
    stsTags[2] = SignalRService.tagList.F73_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F73_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F73_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F73_STS_limRev;
    stsTags[6] = SignalRService.tagList.F73_STS_almCUM;
    this.F73 = new MotorModel("F73", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F73_STATE); this.motors.push(this.F73);
    // #endregion

    // #region F74 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F74_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F74_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F74_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F74_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F74_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F74_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F74_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F74_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F74_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F74_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F74_STS_outRev;
    stsTags[2] = SignalRService.tagList.F74_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F74_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F74_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F74_STS_limRev;
    stsTags[6] = SignalRService.tagList.F74_STS_almCUM;
    this.F74 = new MotorModel("F74", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F74_STATE); this.motors.push(this.F74);
    // #endregion

    // #region F75 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F75_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F75_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F75_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F75_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F75_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F75_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F75_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F75_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F75_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F75_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F75_STS_outRev;
    stsTags[2] = SignalRService.tagList.F75_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F75_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F75_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F75_STS_limRev;
    stsTags[6] = SignalRService.tagList.F75_STS_almCUM;
    this.F75 = new MotorModel("F75", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F75_STATE); this.motors.push(this.F75);
    // #endregion

    // #region F76 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F76_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F76_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F76_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F76_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F76_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F76_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F76_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F76_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F76_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F76_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F76_STS_outRev;
    stsTags[2] = SignalRService.tagList.F76_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F76_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F76_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F76_STS_limRev;
    stsTags[6] = SignalRService.tagList.F76_STS_almCUM;
    this.F76 = new MotorModel("F76", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F76_STATE); this.motors.push(this.F76);
    // #endregion

    // #region F77 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F77_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F77_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F77_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F77_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F77_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F77_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F77_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F77_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F77_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F77_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F77_STS_outRev;
    stsTags[2] = SignalRService.tagList.F77_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F77_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F77_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F77_STS_limRev;
    stsTags[6] = SignalRService.tagList.F77_STS_almCUM;
    this.F77 = new MotorModel("F77", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F77_STATE); this.motors.push(this.F77);
    // #endregion

    // #region F78 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F78_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F78_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F78_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F78_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F78_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F78_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F78_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F78_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F78_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F78_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F78_STS_outRev;
    stsTags[2] = SignalRService.tagList.F78_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F78_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F78_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F78_STS_limRev;
    stsTags[6] = SignalRService.tagList.F78_STS_almCUM;
    this.F78 = new MotorModel("F78", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F78_STATE); this.motors.push(this.F78);
    // #endregion

    // #region F79 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F79_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F79_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F79_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F79_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F79_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F79_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F79_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F79_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F79_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F79_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F79_STS_outRev;
    stsTags[2] = SignalRService.tagList.F79_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F79_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F79_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F79_STS_limRev;
    stsTags[6] = SignalRService.tagList.F79_STS_almCUM;
    this.F79 = new MotorModel("F79", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F79_STATE); this.motors.push(this.F79);
    // #endregion

    // #region F72SX  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.F72SX = new MotorModel("F72SX", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "F72SX_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.F72SX);
    // #endregion

    // #region F72DX  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.F72DX = new MotorModel("F72DX", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "F72DX_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.F72DX);
    // #endregion
    // #endregion

    //*******************************************************
    // #region MOTORI ZONA 2.3-3.4

    // #region B83 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B83_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B83_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B83_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B83_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B83_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B83_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B83_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B83_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B83_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B83_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B83_STS_outRev;
    stsTags[2] = SignalRService.tagList.B83_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B83_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B83_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B83_STS_limRev;
    stsTags[6] = SignalRService.tagList.B83_STS_almCUM;
    this.B83 = new MotorModel("B83", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B83_STATE); this.motors.push(this.B83);
    // #endregion

    // #region B85 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B85_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B85_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B85_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B85_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B85_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B85_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B85_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B85_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B85_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B85_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B85_STS_outRev;
    stsTags[2] = SignalRService.tagList.B85_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B85_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B85_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B85_STS_limRev;
    stsTags[6] = SignalRService.tagList.B85_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B85_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B85_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B85_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B85_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B85_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B85_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B85_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B85_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B85_actWarning;
    this.B85 = new MotorModel("B85", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B85_STATE, vfdTags); this.motors.push(this.B85);
    // #endregion

    // #region B87 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B87_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B87_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B87_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B87_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B87_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B87_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B87_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B87_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B87_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B87_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B87_STS_outRev;
    stsTags[2] = SignalRService.tagList.B87_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B87_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B87_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B87_STS_limRev;
    stsTags[6] = SignalRService.tagList.B87_STS_almCUM;
    this.B87 = new MotorModel("B87", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B87_STATE); this.motors.push(this.B87);
    // #endregion

    // #region B89 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B89_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B89_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B89_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B89_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B89_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B89_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B89_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B89_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B89_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B89_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B89_STS_outRev;
    stsTags[2] = SignalRService.tagList.B89_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B89_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B89_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B89_STS_limRev;
    stsTags[6] = SignalRService.tagList.B89_STS_almCUM;
    this.B89 = new MotorModel("B89", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B89_STATE); this.motors.push(this.B89);
    // #endregion

    // #region B90 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B90_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B90_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B90_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B90_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B90_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B90_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B90_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B90_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B90_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B90_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B90_STS_outRev;
    stsTags[2] = SignalRService.tagList.B90_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B90_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B90_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B90_STS_limRev;
    stsTags[6] = SignalRService.tagList.B90_STS_almCUM;
    this.B90 = new MotorModel("B90", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B90_STATE); this.motors.push(this.B90);
    // #endregion

    // #region B91 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B91_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B91_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B91_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B91_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B91_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B91_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B91_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B91_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B91_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B91_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B91_STS_outRev;
    stsTags[2] = SignalRService.tagList.B91_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B91_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B91_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B91_STS_limRev;
    stsTags[6] = SignalRService.tagList.B91_STS_almCUM;
    this.B91 = new MotorModel("B91", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B91_STATE); this.motors.push(this.B91);
    // #endregion

    // #region B92 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B92_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B92_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B92_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B92_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B92_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B92_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B92_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B92_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B92_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B92_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B92_STS_outRev;
    stsTags[2] = SignalRService.tagList.B92_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B92_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B92_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B92_STS_limRev;
    stsTags[6] = SignalRService.tagList.B92_STS_almCUM;
    this.B92 = new MotorModel("B92", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B92_STATE); this.motors.push(this.B92);
    // #endregion

    // #region B95 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B95_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B95_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B95_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B95_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B95_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B95_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B95_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B95_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B95_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B95_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B95_STS_outRev;
    stsTags[2] = SignalRService.tagList.B95_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B95_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B95_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B95_STS_limRev;
    stsTags[6] = SignalRService.tagList.B95_STS_almCUM;
    this.B95 = new MotorModel("B95", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B95_STATE); this.motors.push(this.B95);
    // #endregion

    // #region B87DX - Belt  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.B87DX = new MotorModel("B87DX", "Belt", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "B87DX_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.B87DX);
    // #endregion
    // #endregion

    //*******************************************************
    // #region MOTORI CASING

    // #region C01
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C01_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C01_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C01_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C01_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C01_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C01_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C01_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C01_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C01_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C01_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C01_STS_outRev;
    stsTags[2] = SignalRService.tagList.C01_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C01_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C01_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C01_STS_limRev;
    stsTags[6] = SignalRService.tagList.C01_STS_almCUM;
    this.C01 = new MotorModel("C01", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C01_STATE); this.motors.push(this.C01);
    // #endregion

    // #region C02
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C02_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C02_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C02_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C02_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C02_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C02_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C02_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C02_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C02_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C02_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C02_STS_outRev;
    stsTags[2] = SignalRService.tagList.C02_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C02_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C02_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C02_STS_limRev;
    stsTags[6] = SignalRService.tagList.C02_STS_almCUM;
    this.C02 = new MotorModel("C02", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C02_STATE); this.motors.push(this.C02);
    // #endregion

    // #region C03
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C03_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C03_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C03_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C03_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C03_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C03_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C03_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C03_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C03_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C03_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C03_STS_outRev;
    stsTags[2] = SignalRService.tagList.C03_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C03_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C03_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C03_STS_limRev;
    stsTags[6] = SignalRService.tagList.C03_STS_almCUM;
    this.C03 = new MotorModel("C03", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C03_STATE); this.motors.push(this.C03);
    // #endregion

    // #region C04
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C04_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C04_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C04_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C04_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C04_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C04_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C04_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C04_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C04_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C04_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C04_STS_outRev;
    stsTags[2] = SignalRService.tagList.C04_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C04_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C04_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C04_STS_limRev;
    stsTags[6] = SignalRService.tagList.C04_STS_almCUM;
    this.C04 = new MotorModel("C04", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C04_STATE); this.motors.push(this.C04);
    // #endregion

    // #region C05
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C05_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C05_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C05_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C05_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C05_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C05_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C05_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C05_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C05_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C05_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C05_STS_outRev;
    stsTags[2] = SignalRService.tagList.C05_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C05_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C05_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C05_STS_limRev;
    stsTags[6] = SignalRService.tagList.C05_STS_almCUM;
    this.C05 = new MotorModel("C05", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C05_STATE); this.motors.push(this.C05);
    // #endregion

    // #region C06
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C06_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C06_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C06_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C06_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C06_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C06_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C06_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C06_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C06_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C06_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C06_STS_outRev;
    stsTags[2] = SignalRService.tagList.C06_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C06_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C06_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C06_STS_limRev;
    stsTags[6] = SignalRService.tagList.C06_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_C6_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_C6_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_C6_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_C6_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_C6_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_C6_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_C6_energy;
    vfdTags[7] = SignalRService.tagList.VFD_C6_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_C6_actWarning;
    this.C06 = new MotorModel("C06", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C06_STATE, vfdTags); this.motors.push(this.C06);
    // #endregion

    // #region C07
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C07_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C07_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C07_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C07_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C07_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C07_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C07_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C07_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C07_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C07_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C07_STS_outRev;
    stsTags[2] = SignalRService.tagList.C07_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C07_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C07_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C07_STS_limRev;
    stsTags[6] = SignalRService.tagList.C07_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_C7_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_C7_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_C7_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_C7_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_C7_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_C7_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_C7_energy;
    vfdTags[7] = SignalRService.tagList.VFD_C7_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_C7_actWarning;
    this.C07 = new MotorModel("C07", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C07_STATE, vfdTags); this.motors.push(this.C07);
    // #endregion

    // #region C08
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.C08_ALM_almMOL;
    almTags[1] = SignalRService.tagList.C08_ALM_almMAC;
    almTags[2] = SignalRService.tagList.C08_ALM_almDAC;
    almTags[3] = SignalRService.tagList.C08_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.C08_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.C08_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.C08_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.C08_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.C08_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.C08_STS_outFwd;
    stsTags[1] = SignalRService.tagList.C08_STS_outRev;
    stsTags[2] = SignalRService.tagList.C08_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.C08_STS_stsRev;
    stsTags[4] = SignalRService.tagList.C08_STS_limFwd;
    stsTags[5] = SignalRService.tagList.C08_STS_limRev;
    stsTags[6] = SignalRService.tagList.C08_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_C8_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_C8_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_C8_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_C8_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_C8_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_C8_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_C8_energy;
    vfdTags[7] = SignalRService.tagList.VFD_C8_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_C8_actWarning;
    this.C08 = new MotorModel("C08", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.C08_STATE, vfdTags); this.motors.push(this.C08);
    // #endregion

    // #region B46
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B46_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B46_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B46_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B46_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B46_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B46_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B46_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B46_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B46_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B46_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B46_STS_outRev;
    stsTags[2] = SignalRService.tagList.B46_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B46_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B46_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B46_STS_limRev;
    stsTags[6] = SignalRService.tagList.B46_STS_almCUM;
    this.B46 = new MotorModel("B46", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B46_STATE); this.motors.push(this.B46);
    // #endregion

    // #region B47
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B47_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B47_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B47_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B47_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B47_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B47_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B47_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B47_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B47_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B47_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B47_STS_outRev;
    stsTags[2] = SignalRService.tagList.B47_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B47_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B47_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B47_STS_limRev;
    stsTags[6] = SignalRService.tagList.B47_STS_almCUM;
    this.B47 = new MotorModel("B47", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B47_STATE); this.motors.push(this.B47);
    // #endregion

    // #region B48
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B48_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B48_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B48_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B48_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B48_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B48_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B48_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B48_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B48_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B48_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B48_STS_outRev;
    stsTags[2] = SignalRService.tagList.B48_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B48_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B48_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B48_STS_limRev;
    stsTags[6] = SignalRService.tagList.B48_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B48_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B48_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B48_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B48_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B48_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B48_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B48_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B48_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B48_actWarning;
    this.B48 = new MotorModel("B48", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B48_STATE, vfdTags); this.motors.push(this.B48);
    // #endregion

    // #region B49
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B49_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B49_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B49_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B49_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B49_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B49_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B49_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B49_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B49_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B49_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B49_STS_outRev;
    stsTags[2] = SignalRService.tagList.B49_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B49_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B49_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B49_STS_limRev;
    stsTags[6] = SignalRService.tagList.B49_STS_almCUM;
    this.B49 = new MotorModel("B49", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B49_STATE); this.motors.push(this.B49);
    // #endregion

    // #region F37
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F37_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F37_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F37_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F37_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F37_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F37_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F37_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F37_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F37_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F37_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F37_STS_outRev;
    stsTags[2] = SignalRService.tagList.F37_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F37_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F37_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F37_STS_limRev;
    stsTags[6] = SignalRService.tagList.F37_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F37_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F37_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F37_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F37_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F37_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F37_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F37_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F37_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F37_actWarning;
    this.F37 = new MotorModel("F37", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F37_STATE, vfdTags); this.motors.push(this.F37);
    // #endregion

    // #region F38
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F38_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F38_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F38_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F38_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F38_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F38_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F38_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F38_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F38_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F38_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F38_STS_outRev;
    stsTags[2] = SignalRService.tagList.F38_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F38_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F38_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F38_STS_limRev;
    stsTags[6] = SignalRService.tagList.F38_STS_almCUM;
    this.F38 = new MotorModel("F38", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F38_STATE); this.motors.push(this.F38);
    // #endregion

    // #region B84
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B84_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B84_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B84_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B84_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B84_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B84_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B84_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B84_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B84_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B84_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B84_STS_outRev;
    stsTags[2] = SignalRService.tagList.B84_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B84_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B84_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B84_STS_limRev;
    stsTags[6] = SignalRService.tagList.B84_STS_almCUM;
    this.B84 = new MotorModel("B84", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B84_STATE); this.motors.push(this.B84);
    // #endregion

    // #region B86
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B86_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B86_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B86_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B86_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B86_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B86_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B86_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B86_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B86_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B86_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B86_STS_outRev;
    stsTags[2] = SignalRService.tagList.B86_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B86_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B86_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B86_STS_limRev;
    stsTags[6] = SignalRService.tagList.B86_STS_almCUM;
    this.B86 = new MotorModel("B86", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B86_STATE); this.motors.push(this.B86);
    // #endregion

    // #region F34
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F34_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F34_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F34_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F34_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F34_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F34_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F34_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F34_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F34_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F34_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F34_STS_outRev;
    stsTags[2] = SignalRService.tagList.F34_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F34_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F34_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F34_STS_limRev;
    stsTags[6] = SignalRService.tagList.F34_STS_almCUM;
    this.F34 = new MotorModel("F34", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F34_STATE); this.motors.push(this.F34);
    // #endregion

    // #endregion

    //*******************************************************
    // #region SLICER VIRGINIA

    // #region V01 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V01_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V01_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V01_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V01_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V01_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V01_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V01_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V01_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V01_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V01_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V01_STS_outRev;
    stsTags[2] = SignalRService.tagList.V01_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V01_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V01_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V01_STS_limRev;
    stsTags[6] = SignalRService.tagList.V01_STS_almCUM;
    this.V01 = new MotorModel("V01", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V01_STATE); this.motors.push(this.V01);
    // #endregion

    // #region V02 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V02_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V02_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V02_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V02_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V02_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V02_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V02_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V02_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V02_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V02_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V02_STS_outRev;
    stsTags[2] = SignalRService.tagList.V02_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V02_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V02_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V02_STS_limRev;
    stsTags[6] = SignalRService.tagList.V02_STS_almCUM;
    this.V02 = new MotorModel("V02", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V02_STATE); this.motors.push(this.V02);
    // #endregion

    // #region V03 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V03_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V03_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V03_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V03_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V03_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V03_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V03_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V03_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V03_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V03_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V03_STS_outRev;
    stsTags[2] = SignalRService.tagList.V03_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V03_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V03_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V03_STS_limRev;
    stsTags[6] = SignalRService.tagList.V03_STS_almCUM;
    this.V03 = new MotorModel("V03", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V03_STATE); this.motors.push(this.V03);
    // #endregion

    // #region V04_06 - Inverter TOP/Bottom Conveyor
    // Sul disegno restano due motori (V04 nastro superiore, V06 nastro inferiore),
    // ma il PLC ne comanda uno solo: lo scambio dati espone solo V04_06.
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V04_06_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V04_06_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V04_06_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V04_06_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V04_06_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V04_06_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V04_06_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V04_06_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V04_06_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V04_06_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V04_06_STS_outRev;
    stsTags[2] = SignalRService.tagList.V04_06_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V04_06_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V04_06_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V04_06_STS_limRev;
    stsTags[6] = SignalRService.tagList.V04_06_STS_almCUM;
    this.V04_06 = new MotorModel("V04_06", "Inverter TOP/Bottom Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V04_06_STATE); this.motors.push(this.V04_06);
    // #endregion

    // #region V05 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V05_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V05_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V05_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V05_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V05_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V05_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V05_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V05_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V05_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V05_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V05_STS_outRev;
    stsTags[2] = SignalRService.tagList.V05_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V05_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V05_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V05_STS_limRev;
    stsTags[6] = SignalRService.tagList.V05_STS_almCUM;
    this.V05 = new MotorModel("V05", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V05_STATE); this.motors.push(this.V05);
    // #endregion

    // #region V07 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V07_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V07_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V07_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V07_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V07_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V07_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V07_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V07_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V07_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V07_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V07_STS_outRev;
    stsTags[2] = SignalRService.tagList.V07_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V07_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V07_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V07_STS_limRev;
    stsTags[6] = SignalRService.tagList.V07_STS_almCUM;
    this.V07 = new MotorModel("V07", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V07_STATE); this.motors.push(this.V07);
    // #endregion

    // #region V08 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.V08_ALM_almMOL;
    almTags[1] = SignalRService.tagList.V08_ALM_almMAC;
    almTags[2] = SignalRService.tagList.V08_ALM_almDAC;
    almTags[3] = SignalRService.tagList.V08_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.V08_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.V08_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.V08_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.V08_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.V08_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.V08_STS_outFwd;
    stsTags[1] = SignalRService.tagList.V08_STS_outRev;
    stsTags[2] = SignalRService.tagList.V08_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.V08_STS_stsRev;
    stsTags[4] = SignalRService.tagList.V08_STS_limFwd;
    stsTags[5] = SignalRService.tagList.V08_STS_limRev;
    stsTags[6] = SignalRService.tagList.V08_STS_almCUM;
    this.V08 = new MotorModel("V08", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.V08_STATE); this.motors.push(this.V08);
    // #endregion

    // #region V09  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.V09 = new MotorModel("V09", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "V09_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.V09);
    // #endregion

    // #region V09_SPINTORE - Bale Pusher  (ATTENZIONE: marcia/comandi/allarmi senza tag nel
    // nuovo scambio dati; l'inverter invece c'e': VSL_M3 del DB122, alm118 il suo alm comm)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_VSL_M3_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_VSL_M3_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_VSL_M3_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_VSL_M3_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_VSL_M3_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_VSL_M3_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_VSL_M3_energy;
    vfdTags[7] = SignalRService.tagList.VFD_VSL_M3_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_VSL_M3_actWarning;
    this.V09_SPINTORE = new MotorModel("V09_SPINTORE", "Bale Pusher", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "V09_SPINTORE_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN), vfdTags); this.motors.push(this.V09_SPINTORE);
    // #endregion

    // #region V09_BLADE - Blade  (ATTENZIONE: marcia/comandi/allarmi senza tag nel
    // nuovo scambio dati; l'inverter invece c'e': VSL_M4 del DB122, alm116 il suo alm comm)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_VSL_M4_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_VSL_M4_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_VSL_M4_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_VSL_M4_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_VSL_M4_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_VSL_M4_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_VSL_M4_energy;
    vfdTags[7] = SignalRService.tagList.VFD_VSL_M4_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_VSL_M4_actWarning;
    this.V09_BLADE = new MotorModel("V09_BLADE", "Blade", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "V09_BLADE_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN), vfdTags); this.motors.push(this.V09_BLADE);
    // #endregion

    // #endregion

    //*******************************************************
    // #region SLICER BURLEY

    // #region B03 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B03_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B03_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B03_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B03_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B03_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B03_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B03_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B03_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B03_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B03_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B03_STS_outRev;
    stsTags[2] = SignalRService.tagList.B03_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B03_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B03_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B03_STS_limRev;
    stsTags[6] = SignalRService.tagList.B03_STS_almCUM;
    this.B03 = new MotorModel("B03", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B03_STATE); this.motors.push(this.B03);
    // #endregion

    // #region B04 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B04_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B04_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B04_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B04_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B04_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B04_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B04_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B04_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B04_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B04_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B04_STS_outRev;
    stsTags[2] = SignalRService.tagList.B04_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B04_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B04_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B04_STS_limRev;
    stsTags[6] = SignalRService.tagList.B04_STS_almCUM;
    this.B04 = new MotorModel("B04", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B04_STATE); this.motors.push(this.B04);
    // #endregion

    // #region B05 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B05_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B05_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B05_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B05_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B05_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B05_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B05_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B05_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B05_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B05_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B05_STS_outRev;
    stsTags[2] = SignalRService.tagList.B05_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B05_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B05_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B05_STS_limRev;
    stsTags[6] = SignalRService.tagList.B05_STS_almCUM;
    this.B05 = new MotorModel("B05", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B05_STATE); this.motors.push(this.B05);
    // #endregion

    // #region B06_08 - Inverter TOP/Bottom Conveyor
    // Sul disegno restano due motori (B06 nastro superiore, B08 nastro inferiore),
    // ma il PLC ne comanda uno solo: lo scambio dati espone solo B06_08.
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B06_08_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B06_08_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B06_08_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B06_08_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B06_08_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B06_08_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B06_08_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B06_08_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B06_08_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B06_08_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B06_08_STS_outRev;
    stsTags[2] = SignalRService.tagList.B06_08_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B06_08_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B06_08_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B06_08_STS_limRev;
    stsTags[6] = SignalRService.tagList.B06_08_STS_almCUM;
    this.B06_08 = new MotorModel("B06_08", "Inverter TOP/Bottom Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B06_08_STATE); this.motors.push(this.B06_08);
    // #endregion

    // #region B07 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B07_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B07_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B07_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B07_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B07_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B07_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B07_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B07_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B07_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B07_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B07_STS_outRev;
    stsTags[2] = SignalRService.tagList.B07_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B07_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B07_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B07_STS_limRev;
    stsTags[6] = SignalRService.tagList.B07_STS_almCUM;
    this.B07 = new MotorModel("B07", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B07_STATE); this.motors.push(this.B07);
    // #endregion

    // #region B09 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B09_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B09_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B09_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B09_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B09_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B09_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B09_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B09_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B09_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B09_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B09_STS_outRev;
    stsTags[2] = SignalRService.tagList.B09_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B09_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B09_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B09_STS_limRev;
    stsTags[6] = SignalRService.tagList.B09_STS_almCUM;
    this.B09 = new MotorModel("B09", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B09_STATE); this.motors.push(this.B09);
    // #endregion

    // #region B10 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B10_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B10_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B10_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B10_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B10_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B10_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B10_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B10_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B10_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B10_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B10_STS_outRev;
    stsTags[2] = SignalRService.tagList.B10_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B10_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B10_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B10_STS_limRev;
    stsTags[6] = SignalRService.tagList.B10_STS_almCUM;
    this.B10 = new MotorModel("B10", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B10_STATE); this.motors.push(this.B10);
    // #endregion

    // #region B12 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B12_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B12_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B12_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B12_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B12_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B12_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B12_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B12_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B12_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B12_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B12_STS_outRev;
    stsTags[2] = SignalRService.tagList.B12_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B12_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B12_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B12_STS_limRev;
    stsTags[6] = SignalRService.tagList.B12_STS_almCUM;
    this.B12 = new MotorModel("B12", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B12_STATE); this.motors.push(this.B12);
    // #endregion

    // #region B11  (ATTENZIONE: nessun tag nel nuovo scambio dati)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    this.B11 = new MotorModel("B11", "", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "B11_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN)); this.motors.push(this.B11);
    // #endregion

    // #region B11_SPINTORE - Bale Pusher  (ATTENZIONE: marcia/comandi/allarmi senza tag nel
    // nuovo scambio dati; l'inverter invece c'e': BSL_M3 del DB122, alm119 il suo alm comm)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_BSL_M3_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_BSL_M3_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_BSL_M3_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_BSL_M3_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_BSL_M3_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_BSL_M3_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_BSL_M3_energy;
    vfdTags[7] = SignalRService.tagList.VFD_BSL_M3_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_BSL_M3_actWarning;
    this.B11_SPINTORE = new MotorModel("B11_SPINTORE", "Bale Pusher", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "B11_SPINTORE_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN), vfdTags); this.motors.push(this.B11_SPINTORE);
    // #endregion

    // #region B11_BLADE - Blade  (ATTENZIONE: marcia/comandi/allarmi senza tag nel
    // nuovo scambio dati; l'inverter invece c'e': BSL_M4 del DB122, alm117 il suo alm comm)
    almTags = new Array(4);
    cmdTags = new Array(3);
    filterTags = new Array(2);
    stsTags = new Array(7);
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_BSL_M4_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_BSL_M4_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_BSL_M4_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_BSL_M4_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_BSL_M4_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_BSL_M4_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_BSL_M4_energy;
    vfdTags[7] = SignalRService.tagList.VFD_BSL_M4_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_BSL_M4_actWarning;
    this.B11_BLADE = new MotorModel("B11_BLADE", "Blade", almTags, cmdTags, filterTags, stsTags, new TagsClient(0, "B11_BLADE_STATE", "", "", 0, VAR_TYPE_Enum.INT16, IO_Enum.IN), vfdTags); this.motors.push(this.B11_BLADE);
    // #endregion

    // #endregion

    //*******************************************************
    // #region ZONA 2.1

    // #region B01 - Air Lock
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B01_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B01_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B01_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B01_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B01_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B01_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B01_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B01_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B01_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B01_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B01_STS_outRev;
    stsTags[2] = SignalRService.tagList.B01_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B01_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B01_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B01_STS_limRev;
    stsTags[6] = SignalRService.tagList.B01_STS_almCUM;
    this.B01 = new MotorModel("B01", "Air Lock", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B01_STATE); this.motors.push(this.B01);
    // #endregion

    // #region B1A - Ventilator
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B1A_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B1A_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B1A_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B1A_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B1A_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B1A_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B1A_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B1A_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B1A_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B1A_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B1A_STS_outRev;
    stsTags[2] = SignalRService.tagList.B1A_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B1A_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B1A_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B1A_STS_limRev;
    stsTags[6] = SignalRService.tagList.B1A_STS_almCUM;
    this.B1A = new MotorModel("B1A", "Ventilator", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B1A_STATE); this.motors.push(this.B1A);
    // #endregion

    // #region B02 - Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B02_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B02_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B02_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B02_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B02_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B02_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B02_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B02_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B02_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B02_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B02_STS_outRev;
    stsTags[2] = SignalRService.tagList.B02_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B02_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B02_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B02_STS_limRev;
    stsTags[6] = SignalRService.tagList.B02_STS_almCUM;
    this.B02 = new MotorModel("B02", "Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B02_STATE); this.motors.push(this.B02);
    // #endregion

    // #region B12 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B12_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B12_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B12_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B12_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B12_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B12_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B12_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B12_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B12_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B12_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B12_STS_outRev;
    stsTags[2] = SignalRService.tagList.B12_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B12_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B12_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B12_STS_limRev;
    stsTags[6] = SignalRService.tagList.B12_STS_almCUM;
    this.B12 = new MotorModel("B12", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B12_STATE); this.motors.push(this.B12);
    // #endregion

    // #region B13 - Drive
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B13_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B13_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B13_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B13_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B13_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B13_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B13_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B13_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B13_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B13_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B13_STS_outRev;
    stsTags[2] = SignalRService.tagList.B13_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B13_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B13_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B13_STS_limRev;
    stsTags[6] = SignalRService.tagList.B13_STS_almCUM;
    this.B13 = new MotorModel("B13", "Drive", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B13_STATE); this.motors.push(this.B13);
    // #endregion

    // #region B14 - Drum
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B14_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B14_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B14_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B14_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B14_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B14_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B14_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B14_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B14_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B14_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B14_STS_outRev;
    stsTags[2] = SignalRService.tagList.B14_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B14_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B14_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B14_STS_limRev;
    stsTags[6] = SignalRService.tagList.B14_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B14_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B14_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B14_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B14_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B14_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B14_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B14_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B14_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B14_actWarning;
    this.B14 = new MotorModel("B14", "Drum", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B14_STATE, vfdTags); this.motors.push(this.B14);
    // #endregion

    // Utenze del DCC Burley. Hanno i tag completi nello scambio dati ma non
    // erano ancora registrate qui: senza, il sinottico /dcc-burley non puo'
    // legarle. Nessuna ha il blocco inverter (DB122), quindi niente vfdTags.
    // Le descrizioni sono quelle delle corrispondenti del DCC Virginia.

    // #region B15 - Inclination
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B15_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B15_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B15_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B15_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B15_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B15_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B15_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B15_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B15_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B15_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B15_STS_outRev;
    stsTags[2] = SignalRService.tagList.B15_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B15_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B15_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B15_STS_limRev;
    stsTags[6] = SignalRService.tagList.B15_STS_almCUM;
    this.B15 = new MotorModel("B15", "Inclination", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B15_STATE); this.motors.push(this.B15);
    // #endregion

    // #region B16a - Belt Tensioner
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B16a_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B16a_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B16a_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B16a_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B16a_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B16a_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B16a_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B16a_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B16a_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B16a_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B16a_STS_outRev;
    stsTags[2] = SignalRService.tagList.B16a_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B16a_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B16a_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B16a_STS_limRev;
    stsTags[6] = SignalRService.tagList.B16a_STS_almCUM;
    this.B16a = new MotorModel("B16a", "Belt Tensioner", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B16a_STATE); this.motors.push(this.B16a);
    // #endregion

    // #region B17 - Recirc/Coil Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B17_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B17_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B17_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B17_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B17_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B17_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B17_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B17_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B17_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B17_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B17_STS_outRev;
    stsTags[2] = SignalRService.tagList.B17_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B17_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B17_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B17_STS_limRev;
    stsTags[6] = SignalRService.tagList.B17_STS_almCUM;
    this.B17 = new MotorModel("B17", "Recirc/Coil Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B17_STATE); this.motors.push(this.B17);
    // #endregion

    // #region B18 - Exhaust Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B18_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B18_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B18_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B18_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B18_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B18_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B18_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B18_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B18_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B18_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B18_STS_outRev;
    stsTags[2] = SignalRService.tagList.B18_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B18_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B18_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B18_STS_limRev;
    stsTags[6] = SignalRService.tagList.B18_STS_almCUM;
    this.B18 = new MotorModel("B18", "Exhaust Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B18_STATE); this.motors.push(this.B18);
    // #endregion

    // #region B19 - Cleaning Bar
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B19_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B19_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B19_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B19_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B19_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B19_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B19_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B19_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B19_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B19_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B19_STS_outRev;
    stsTags[2] = SignalRService.tagList.B19_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B19_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B19_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B19_STS_limRev;
    stsTags[6] = SignalRService.tagList.B19_STS_almCUM;
    this.B19 = new MotorModel("B19", "Cleaning Bar", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B19_STATE); this.motors.push(this.B19);
    // #endregion

    // #region B20 - Water Pump
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B20_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B20_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B20_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B20_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B20_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B20_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B20_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B20_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B20_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B20_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B20_STS_outRev;
    stsTags[2] = SignalRService.tagList.B20_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B20_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B20_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B20_STS_limRev;
    stsTags[6] = SignalRService.tagList.B20_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B20_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B20_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B20_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B20_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B20_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B20_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B20_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B20_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B20_actWarning;
    this.B20 = new MotorModel("B20", "Water Pump", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B20_STATE, vfdTags); this.motors.push(this.B20);
    // #endregion

    // #region B21 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B21_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B21_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B21_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B21_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B21_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B21_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B21_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B21_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B21_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B21_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B21_STS_outRev;
    stsTags[2] = SignalRService.tagList.B21_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B21_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B21_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B21_STS_limRev;
    stsTags[6] = SignalRService.tagList.B21_STS_almCUM;
    this.B21 = new MotorModel("B21", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B21_STATE); this.motors.push(this.B21);
    // #endregion

    // #region B22 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B22_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B22_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B22_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B22_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B22_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B22_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B22_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B22_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B22_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B22_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B22_STS_outRev;
    stsTags[2] = SignalRService.tagList.B22_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B22_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B22_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B22_STS_limRev;
    stsTags[6] = SignalRService.tagList.B22_STS_almCUM;
    this.B22 = new MotorModel("B22", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B22_STATE); this.motors.push(this.B22);
    // #endregion

    // #region B23 - Separator
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B23_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B23_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B23_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B23_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B23_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B23_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B23_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B23_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B23_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B23_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B23_STS_outRev;
    stsTags[2] = SignalRService.tagList.B23_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B23_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B23_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B23_STS_limRev;
    stsTags[6] = SignalRService.tagList.B23_STS_almCUM;
    this.B23 = new MotorModel("B23", "Separator", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B23_STATE); this.motors.push(this.B23);
    // #endregion

    // #region B24 - Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B24_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B24_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B24_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B24_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B24_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B24_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B24_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B24_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B24_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B24_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B24_STS_outRev;
    stsTags[2] = SignalRService.tagList.B24_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B24_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B24_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B24_STS_limRev;
    stsTags[6] = SignalRService.tagList.B24_STS_almCUM;
    this.B24 = new MotorModel("B24", "Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B24_STATE); this.motors.push(this.B24);
    // #endregion

    // #region B25 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B25_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B25_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B25_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B25_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B25_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B25_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B25_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B25_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B25_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B25_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B25_STS_outRev;
    stsTags[2] = SignalRService.tagList.B25_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B25_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B25_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B25_STS_limRev;
    stsTags[6] = SignalRService.tagList.B25_STS_almCUM;
    this.B25 = new MotorModel("B25", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B25_STATE); this.motors.push(this.B25);
    // #endregion

    // #region B26 - Rollers
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B26_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B26_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B26_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B26_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B26_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B26_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B26_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B26_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B26_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B26_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B26_STS_outRev;
    stsTags[2] = SignalRService.tagList.B26_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B26_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B26_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B26_STS_limRev;
    stsTags[6] = SignalRService.tagList.B26_STS_almCUM;
    this.B26 = new MotorModel("B26", "Rollers", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B26_STATE); this.motors.push(this.B26);
    // #endregion

    // #region B27 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B27_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B27_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B27_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B27_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B27_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B27_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B27_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B27_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B27_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B27_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B27_STS_outRev;
    stsTags[2] = SignalRService.tagList.B27_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B27_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B27_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B27_STS_limRev;
    stsTags[6] = SignalRService.tagList.B27_STS_almCUM;
    this.B27 = new MotorModel("B27", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B27_STATE); this.motors.push(this.B27);
    // #endregion

    // #region B29 - Drum
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B29_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B29_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B29_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B29_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B29_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B29_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B29_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B29_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B29_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B29_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B29_STS_outRev;
    stsTags[2] = SignalRService.tagList.B29_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B29_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B29_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B29_STS_limRev;
    stsTags[6] = SignalRService.tagList.B29_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B29_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B29_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B29_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B29_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B29_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B29_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B29_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B29_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B29_actWarning;
    this.B29 = new MotorModel("B29", "Drum", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B29_STATE, vfdTags); this.motors.push(this.B29);
    // #endregion

    // #region B30 - Water Pump
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B30_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B30_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B30_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B30_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B30_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B30_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B30_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B30_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B30_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B30_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B30_STS_outRev;
    stsTags[2] = SignalRService.tagList.B30_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B30_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B30_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B30_STS_limRev;
    stsTags[6] = SignalRService.tagList.B30_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B30_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B30_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B30_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B30_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B30_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B30_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B30_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B30_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B30_actWarning;
    this.B30 = new MotorModel("B30", "Water Pump", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B30_STATE, vfdTags); this.motors.push(this.B30);
    // #endregion

    // #region B31 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B31_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B31_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B31_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B31_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B31_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B31_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B31_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B31_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B31_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B31_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B31_STS_outRev;
    stsTags[2] = SignalRService.tagList.B31_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B31_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B31_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B31_STS_limRev;
    stsTags[6] = SignalRService.tagList.B31_STS_almCUM;
    this.B31 = new MotorModel("B31", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B31_STATE); this.motors.push(this.B31);
    // #endregion

    // #region B31A
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B31A_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B31A_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B31A_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B31A_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B31A_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B31A_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B31A_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B31A_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B31A_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B31A_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B31A_STS_outRev;
    stsTags[2] = SignalRService.tagList.B31A_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B31A_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B31A_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B31A_STS_limRev;
    stsTags[6] = SignalRService.tagList.B31A_STS_almCUM;
    this.B31A = new MotorModel("B31A", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B31A_STATE); this.motors.push(this.B31A);
    // #endregion

    // #region B32 - Incline
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B32_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B32_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B32_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B32_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B32_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B32_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B32_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B32_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B32_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B32_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B32_STS_outRev;
    stsTags[2] = SignalRService.tagList.B32_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B32_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B32_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B32_STS_limRev;
    stsTags[6] = SignalRService.tagList.B32_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B32_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B32_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B32_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B32_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B32_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B32_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B32_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B32_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B32_actWarning;
    this.B32 = new MotorModel("B32", "Incline", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B32_STATE, vfdTags); this.motors.push(this.B32);
    // #endregion

    // #region B33 - Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B33_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B33_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B33_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B33_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B33_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B33_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B33_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B33_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B33_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B33_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B33_STS_outRev;
    stsTags[2] = SignalRService.tagList.B33_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B33_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B33_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B33_STS_limRev;
    stsTags[6] = SignalRService.tagList.B33_STS_almCUM;
    this.B33 = new MotorModel("B33", "Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B33_STATE); this.motors.push(this.B33);
    // #endregion

    // #region B34 - inlet Winnower
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B34_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B34_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B34_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B34_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B34_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B34_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B34_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B34_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B34_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B34_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B34_STS_outRev;
    stsTags[2] = SignalRService.tagList.B34_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B34_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B34_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B34_STS_limRev;
    stsTags[6] = SignalRService.tagList.B34_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B34_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B34_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B34_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B34_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B34_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B34_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B34_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B34_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B34_actWarning;
    this.B34 = new MotorModel("B34", "inlet Winnower", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B34_STATE, vfdTags); this.motors.push(this.B34);
    // #endregion

    // #region B35 - Apron/Air Lock
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B35_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B35_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B35_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B35_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B35_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B35_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B35_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B35_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B35_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B35_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B35_STS_outRev;
    stsTags[2] = SignalRService.tagList.B35_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B35_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B35_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B35_STS_limRev;
    stsTags[6] = SignalRService.tagList.B35_STS_almCUM;
    this.B35 = new MotorModel("B35", "Apron/Air Lock", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B35_STATE); this.motors.push(this.B35);
    // #endregion

    // #region B36 - Unloading Separator
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B36_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B36_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B36_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B36_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B36_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B36_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B36_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B36_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B36_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B36_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B36_STS_outRev;
    stsTags[2] = SignalRService.tagList.B36_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B36_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B36_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B36_STS_limRev;
    stsTags[6] = SignalRService.tagList.B36_STS_almCUM;
    this.B36 = new MotorModel("B36", "Unloading Separator", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B36_STATE); this.motors.push(this.B36);
    // #endregion

    // #region B37 - #1 Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B37_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B37_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B37_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B37_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B37_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B37_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B37_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B37_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B37_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B37_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B37_STS_outRev;
    stsTags[2] = SignalRService.tagList.B37_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B37_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B37_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B37_STS_limRev;
    stsTags[6] = SignalRService.tagList.B37_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B37_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B37_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B37_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B37_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B37_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B37_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B37_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B37_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B37_actWarning;
    this.B37 = new MotorModel("B37", "#1 Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B37_STATE, vfdTags); this.motors.push(this.B37);
    // #endregion

    // #region B38 - #2 Fan
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B38_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B38_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B38_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B38_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B38_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B38_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B38_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B38_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B38_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B38_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B38_STS_outRev;
    stsTags[2] = SignalRService.tagList.B38_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B38_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B38_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B38_STS_limRev;
    stsTags[6] = SignalRService.tagList.B38_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B38_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B38_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B38_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B38_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B38_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B38_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B38_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B38_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B38_actWarning;
    this.B38 = new MotorModel("B38", "#2 Fan", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B38_STATE, vfdTags); this.motors.push(this.B38);
    // #endregion

    // #region B39 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B39_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B39_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B39_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B39_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B39_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B39_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B39_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B39_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B39_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B39_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B39_STS_outRev;
    stsTags[2] = SignalRService.tagList.B39_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B39_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B39_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B39_STS_limRev;
    stsTags[6] = SignalRService.tagList.B39_STS_almCUM;
    this.B39 = new MotorModel("B39", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B39_STATE); this.motors.push(this.B39);
    // #endregion

    // #region B40 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B40_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B40_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B40_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B40_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B40_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B40_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B40_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B40_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B40_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B40_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B40_STS_outRev;
    stsTags[2] = SignalRService.tagList.B40_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B40_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B40_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B40_STS_limRev;
    stsTags[6] = SignalRService.tagList.B40_STS_almCUM;
    this.B40 = new MotorModel("B40", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B40_STATE); this.motors.push(this.B40);
    // #endregion

    // #region B41 - Incline
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B41_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B41_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B41_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B41_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B41_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B41_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B41_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B41_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B41_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B41_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B41_STS_outRev;
    stsTags[2] = SignalRService.tagList.B41_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B41_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B41_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B41_STS_limRev;
    stsTags[6] = SignalRService.tagList.B41_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B41_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B41_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B41_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B41_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B41_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B41_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B41_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B41_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B41_actWarning;
    this.B41 = new MotorModel("B41", "Incline", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B41_STATE, vfdTags); this.motors.push(this.B41);
    // #endregion

    // #region B42 - Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B42_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B42_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B42_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B42_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B42_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B42_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B42_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B42_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B42_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B42_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B42_STS_outRev;
    stsTags[2] = SignalRService.tagList.B42_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B42_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B42_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B42_STS_limRev;
    stsTags[6] = SignalRService.tagList.B42_STS_almCUM;
    this.B42 = new MotorModel("B42", "Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B42_STATE); this.motors.push(this.B42);
    // #endregion

    // #region B43 - Wipper
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B43_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B43_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B43_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B43_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B43_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B43_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B43_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B43_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B43_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B43_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B43_STS_outRev;
    stsTags[2] = SignalRService.tagList.B43_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B43_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B43_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B43_STS_limRev;
    stsTags[6] = SignalRService.tagList.B43_STS_almCUM;
    this.B43 = new MotorModel("B43", "Wipper", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B43_STATE); this.motors.push(this.B43);
    // #endregion

    // #region B45 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B45_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B45_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B45_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B45_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B45_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B45_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B45_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B45_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B45_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B45_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B45_STS_outRev;
    stsTags[2] = SignalRService.tagList.B45_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B45_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B45_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B45_STS_limRev;
    stsTags[6] = SignalRService.tagList.B45_STS_almCUM;
    this.B45 = new MotorModel("B45", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B45_STATE); this.motors.push(this.B45);
    // #endregion

    // #region B50 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B50_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B50_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B50_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B50_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B50_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B50_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B50_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B50_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B50_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B50_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B50_STS_outRev;
    stsTags[2] = SignalRService.tagList.B50_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B50_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B50_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B50_STS_limRev;
    stsTags[6] = SignalRService.tagList.B50_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_B50_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_B50_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_B50_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_B50_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_B50_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_B50_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_B50_energy;
    vfdTags[7] = SignalRService.tagList.VFD_B50_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_B50_actWarning;
    this.B50 = new MotorModel("B50", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B50_STATE, vfdTags); this.motors.push(this.B50);
    // #endregion

    // #region B51 - Paddle
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B51_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B51_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B51_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B51_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B51_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B51_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B51_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B51_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B51_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B51_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B51_STS_outRev;
    stsTags[2] = SignalRService.tagList.B51_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B51_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B51_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B51_STS_limRev;
    stsTags[6] = SignalRService.tagList.B51_STS_almCUM;
    this.B51 = new MotorModel("B51", "Paddle", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B51_STATE); this.motors.push(this.B51);
    // #endregion

    // #region B93 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B93_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B93_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B93_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B93_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B93_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B93_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B93_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B93_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B93_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B93_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B93_STS_outRev;
    stsTags[2] = SignalRService.tagList.B93_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B93_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B93_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B93_STS_limRev;
    stsTags[6] = SignalRService.tagList.B93_STS_almCUM;
    this.B93 = new MotorModel("B93", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B93_STATE); this.motors.push(this.B93);
    // #endregion

    // #region B94 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.B94_ALM_almMOL;
    almTags[1] = SignalRService.tagList.B94_ALM_almMAC;
    almTags[2] = SignalRService.tagList.B94_ALM_almDAC;
    almTags[3] = SignalRService.tagList.B94_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.B94_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.B94_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.B94_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.B94_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.B94_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.B94_STS_outFwd;
    stsTags[1] = SignalRService.tagList.B94_STS_outRev;
    stsTags[2] = SignalRService.tagList.B94_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.B94_STS_stsRev;
    stsTags[4] = SignalRService.tagList.B94_STS_limFwd;
    stsTags[5] = SignalRService.tagList.B94_STS_limRev;
    stsTags[6] = SignalRService.tagList.B94_STS_almCUM;
    this.B94 = new MotorModel("B94", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B94_STATE); this.motors.push(this.B94);
    // #endregion

    // #region BA
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BA_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BA_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BA_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BA_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BA_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BA_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BA_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BA_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BA_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BA_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BA_STS_outRev;
    stsTags[2] = SignalRService.tagList.BA_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BA_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BA_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BA_STS_limRev;
    stsTags[6] = SignalRService.tagList.BA_STS_almCUM;
    this.BA = new MotorModel("BA", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BA_STATE); this.motors.push(this.BA);
    // #endregion

    // #region BB
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BB_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BB_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BB_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BB_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BB_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BB_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BB_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BB_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BB_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BB_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BB_STS_outRev;
    stsTags[2] = SignalRService.tagList.BB_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BB_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BB_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BB_STS_limRev;
    stsTags[6] = SignalRService.tagList.BB_STS_almCUM;
    this.BB = new MotorModel("BB", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BB_STATE); this.motors.push(this.BB);
    // #endregion

    // #region BC
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BC_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BC_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BC_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BC_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BC_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BC_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BC_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BC_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BC_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BC_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BC_STS_outRev;
    stsTags[2] = SignalRService.tagList.BC_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BC_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BC_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BC_STS_limRev;
    stsTags[6] = SignalRService.tagList.BC_STS_almCUM;
    this.BC = new MotorModel("BC", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BC_STATE); this.motors.push(this.BC);
    // #endregion

    // #region BC1
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BC1_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BC1_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BC1_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BC1_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BC1_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BC1_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BC1_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BC1_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BC1_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BC1_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BC1_STS_outRev;
    stsTags[2] = SignalRService.tagList.BC1_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BC1_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BC1_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BC1_STS_limRev;
    stsTags[6] = SignalRService.tagList.BC1_STS_almCUM;
    this.BC1 = new MotorModel("BC1", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BC1_STATE); this.motors.push(this.BC1);
    // #endregion

    // #region BC2
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BC2_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BC2_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BC2_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BC2_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BC2_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BC2_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BC2_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BC2_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BC2_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BC2_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BC2_STS_outRev;
    stsTags[2] = SignalRService.tagList.BC2_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BC2_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BC2_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BC2_STS_limRev;
    stsTags[6] = SignalRService.tagList.BC2_STS_almCUM;
    this.BC2 = new MotorModel("BC2", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BC2_STATE); this.motors.push(this.BC2);
    // #endregion

    // #region BC3
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BC3_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BC3_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BC3_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BC3_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BC3_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BC3_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BC3_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BC3_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BC3_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BC3_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BC3_STS_outRev;
    stsTags[2] = SignalRService.tagList.BC3_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BC3_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BC3_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BC3_STS_limRev;
    stsTags[6] = SignalRService.tagList.BC3_STS_almCUM;
    this.BC3 = new MotorModel("BC3", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BC3_STATE); this.motors.push(this.BC3);
    // #endregion

    // #region BC4
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BC4_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BC4_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BC4_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BC4_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BC4_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BC4_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BC4_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BC4_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BC4_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BC4_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BC4_STS_outRev;
    stsTags[2] = SignalRService.tagList.BC4_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BC4_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BC4_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BC4_STS_limRev;
    stsTags[6] = SignalRService.tagList.BC4_STS_almCUM;
    this.BC4 = new MotorModel("BC4", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BC4_STATE); this.motors.push(this.BC4);
    // #endregion

    // #region BC5
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BC5_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BC5_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BC5_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BC5_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BC5_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BC5_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BC5_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BC5_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BC5_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BC5_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BC5_STS_outRev;
    stsTags[2] = SignalRService.tagList.BC5_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BC5_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BC5_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BC5_STS_limRev;
    stsTags[6] = SignalRService.tagList.BC5_STS_almCUM;
    this.BC5 = new MotorModel("BC5", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BC5_STATE); this.motors.push(this.BC5);
    // #endregion

    // #region BD
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BD_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BD_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BD_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BD_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BD_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BD_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BD_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BD_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BD_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BD_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BD_STS_outRev;
    stsTags[2] = SignalRService.tagList.BD_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BD_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BD_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BD_STS_limRev;
    stsTags[6] = SignalRService.tagList.BD_STS_almCUM;
    this.BD = new MotorModel("BD", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BD_STATE); this.motors.push(this.BD);
    // #endregion

    // #region BE
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.BE_ALM_almMOL;
    almTags[1] = SignalRService.tagList.BE_ALM_almMAC;
    almTags[2] = SignalRService.tagList.BE_ALM_almDAC;
    almTags[3] = SignalRService.tagList.BE_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.BE_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.BE_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.BE_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.BE_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.BE_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.BE_STS_outFwd;
    stsTags[1] = SignalRService.tagList.BE_STS_outRev;
    stsTags[2] = SignalRService.tagList.BE_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.BE_STS_stsRev;
    stsTags[4] = SignalRService.tagList.BE_STS_limFwd;
    stsTags[5] = SignalRService.tagList.BE_STS_limRev;
    stsTags[6] = SignalRService.tagList.BE_STS_almCUM;
    this.BE = new MotorModel("BE", "", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BE_STATE); this.motors.push(this.BE);
    // #endregion

    // #endregion

    //*******************************************************
    // #region ZONA 3.1

    // #region F12 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F12_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F12_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F12_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F12_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F12_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F12_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F12_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F12_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F12_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F12_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F12_STS_outRev;
    stsTags[2] = SignalRService.tagList.F12_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F12_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F12_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F12_STS_limRev;
    stsTags[6] = SignalRService.tagList.F12_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F12_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F12_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F12_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F12_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F12_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F12_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F12_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F12_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F12_actWarning;
    this.F12 = new MotorModel("F12", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F12_STATE, vfdTags); this.motors.push(this.F12);
    // #endregion

    // #region F13 - Car
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F13_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F13_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F13_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F13_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F13_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F13_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F13_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F13_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F13_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F13_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F13_STS_outRev;
    stsTags[2] = SignalRService.tagList.F13_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F13_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F13_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F13_STS_limRev;
    stsTags[6] = SignalRService.tagList.F13_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F13_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F13_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F13_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F13_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F13_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F13_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F13_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F13_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F13_actWarning;
    this.F13 = new MotorModel("F13", "Car", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F13_STATE, vfdTags); this.motors.push(this.F13);
    // #endregion

    // #region F14 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F14_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F14_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F14_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F14_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F14_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F14_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F14_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F14_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F14_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F14_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F14_STS_outRev;
    stsTags[2] = SignalRService.tagList.F14_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F14_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F14_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F14_STS_limRev;
    stsTags[6] = SignalRService.tagList.F14_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F14_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F14_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F14_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F14_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F14_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F14_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F14_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F14_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F14_actWarning;
    this.F14 = new MotorModel("F14", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F14_STATE, vfdTags); this.motors.push(this.F14);
    // #endregion

    // #region F17 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F17_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F17_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F17_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F17_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F17_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F17_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F17_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F17_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F17_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F17_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F17_STS_outRev;
    stsTags[2] = SignalRService.tagList.F17_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F17_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F17_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F17_STS_limRev;
    stsTags[6] = SignalRService.tagList.F17_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F17_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F17_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F17_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F17_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F17_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F17_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F17_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F17_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F17_actWarning;
    this.F17 = new MotorModel("F17", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F17_STATE, vfdTags); this.motors.push(this.F17);
    // #endregion

    // #region F18 - Car
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F18_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F18_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F18_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F18_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F18_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F18_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F18_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F18_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F18_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F18_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F18_STS_outRev;
    stsTags[2] = SignalRService.tagList.F18_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F18_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F18_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F18_STS_limRev;
    stsTags[6] = SignalRService.tagList.F18_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F18_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F18_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F18_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F18_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F18_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F18_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F18_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F18_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F18_actWarning;
    this.F18 = new MotorModel("F18", "Car", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F18_STATE, vfdTags); this.motors.push(this.F18);
    // #endregion

    // #region F19 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F19_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F19_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F19_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F19_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F19_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F19_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F19_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F19_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F19_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F19_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F19_STS_outRev;
    stsTags[2] = SignalRService.tagList.F19_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F19_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F19_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F19_STS_limRev;
    stsTags[6] = SignalRService.tagList.F19_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F19_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F19_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F19_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F19_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F19_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F19_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F19_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F19_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F19_actWarning;
    this.F19 = new MotorModel("F19", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F19_STATE, vfdTags); this.motors.push(this.F19);
    // #endregion

    // #region F22 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F22_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F22_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F22_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F22_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F22_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F22_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F22_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F22_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F22_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F22_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F22_STS_outRev;
    stsTags[2] = SignalRService.tagList.F22_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F22_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F22_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F22_STS_limRev;
    stsTags[6] = SignalRService.tagList.F22_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F22_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F22_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F22_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F22_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F22_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F22_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F22_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F22_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F22_actWarning;
    this.F22 = new MotorModel("F22", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F22_STATE, vfdTags); this.motors.push(this.F22);
    // #endregion

    // #region F23 - Car
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F23_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F23_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F23_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F23_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F23_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F23_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F23_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F23_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F23_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F23_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F23_STS_outRev;
    stsTags[2] = SignalRService.tagList.F23_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F23_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F23_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F23_STS_limRev;
    stsTags[6] = SignalRService.tagList.F23_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F23_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F23_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F23_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F23_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F23_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F23_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F23_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F23_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F23_actWarning;
    this.F23 = new MotorModel("F23", "Car", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F23_STATE, vfdTags); this.motors.push(this.F23);
    // #endregion

    // #region F24 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F24_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F24_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F24_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F24_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F24_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F24_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F24_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F24_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F24_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F24_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F24_STS_outRev;
    stsTags[2] = SignalRService.tagList.F24_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F24_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F24_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F24_STS_limRev;
    stsTags[6] = SignalRService.tagList.F24_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F24_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F24_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F24_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F24_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F24_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F24_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F24_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F24_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F24_actWarning;
    this.F24 = new MotorModel("F24", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F24_STATE, vfdTags); this.motors.push(this.F24);
    // #endregion

    // #region F27 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F27_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F27_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F27_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F27_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F27_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F27_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F27_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F27_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F27_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F27_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F27_STS_outRev;
    stsTags[2] = SignalRService.tagList.F27_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F27_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F27_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F27_STS_limRev;
    stsTags[6] = SignalRService.tagList.F27_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F27_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F27_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F27_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F27_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F27_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F27_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F27_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F27_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F27_actWarning;
    this.F27 = new MotorModel("F27", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F27_STATE, vfdTags); this.motors.push(this.F27);
    // #endregion

    // #region F28 - Car
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F28_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F28_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F28_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F28_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F28_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F28_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F28_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F28_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F28_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F28_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F28_STS_outRev;
    stsTags[2] = SignalRService.tagList.F28_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F28_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F28_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F28_STS_limRev;
    stsTags[6] = SignalRService.tagList.F28_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F28_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F28_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F28_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F28_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F28_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F28_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F28_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F28_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F28_actWarning;
    this.F28 = new MotorModel("F28", "Car", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F28_STATE, vfdTags); this.motors.push(this.F28);
    // #endregion

    // #region F29 - Apron
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F29_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F29_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F29_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F29_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F29_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F29_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F29_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F29_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F29_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F29_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F29_STS_outRev;
    stsTags[2] = SignalRService.tagList.F29_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F29_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F29_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F29_STS_limRev;
    stsTags[6] = SignalRService.tagList.F29_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F29_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F29_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F29_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F29_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F29_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F29_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F29_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F29_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F29_actWarning;
    this.F29 = new MotorModel("F29", "Apron", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F29_STATE, vfdTags); this.motors.push(this.F29);
    // #endregion

    // #region F01 - S1,2,3,4 Infeed Conveyor (from Virginia Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F01_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F01_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F01_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F01_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F01_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F01_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F01_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F01_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F01_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F01_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F01_STS_outRev;
    stsTags[2] = SignalRService.tagList.F01_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F01_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F01_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F01_STS_limRev;
    stsTags[6] = SignalRService.tagList.F01_STS_almCUM;
    this.F01 = new MotorModel("F01", "S1,2,3,4 Infeed Conveyor (from Virginia Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F01_STATE); this.motors.push(this.F01);
    // #endregion

    // #region F02 - S3,4 X Shuttle Belt (from Virginia Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F02_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F02_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F02_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F02_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F02_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F02_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F02_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F02_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F02_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F02_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F02_STS_outRev;
    stsTags[2] = SignalRService.tagList.F02_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F02_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F02_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F02_STS_limRev;
    stsTags[6] = SignalRService.tagList.F02_STS_almCUM;
    this.F02 = new MotorModel("F02", "S3,4 X Shuttle Belt (from Virginia Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F02_STATE); this.motors.push(this.F02);
    // #endregion

    // #region F03 - S3,4 X Shuttle Car (from Virginia Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F03_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F03_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F03_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F03_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F03_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F03_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F03_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F03_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F03_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F03_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F03_STS_outRev;
    stsTags[2] = SignalRService.tagList.F03_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F03_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F03_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F03_STS_limRev;
    stsTags[6] = SignalRService.tagList.F03_STS_almCUM;
    this.F03 = new MotorModel("F03", "S3,4 X Shuttle Car (from Virginia Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F03_STATE); this.motors.push(this.F03);
    // #endregion

    // #region F04 - S1,2 X Shuttle Belt (from Virginia Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F04_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F04_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F04_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F04_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F04_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F04_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F04_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F04_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F04_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F04_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F04_STS_outRev;
    stsTags[2] = SignalRService.tagList.F04_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F04_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F04_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F04_STS_limRev;
    stsTags[6] = SignalRService.tagList.F04_STS_almCUM;
    this.F04 = new MotorModel("F04", "S1,2 X Shuttle Belt (from Virginia Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F04_STATE); this.motors.push(this.F04);
    // #endregion

    // #region F05 - S1,2 X Shuttle Car (from Virginia Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F05_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F05_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F05_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F05_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F05_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F05_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F05_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F05_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F05_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F05_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F05_STS_outRev;
    stsTags[2] = SignalRService.tagList.F05_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F05_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F05_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F05_STS_limRev;
    stsTags[6] = SignalRService.tagList.F05_STS_almCUM;
    this.F05 = new MotorModel("F05", "S1,2 X Shuttle Car (from Virginia Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F05_STATE); this.motors.push(this.F05);
    // #endregion

    // #region F06 - S1,2,3,4 Infeed Conveyor (from Burley Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F06_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F06_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F06_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F06_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F06_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F06_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F06_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F06_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F06_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F06_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F06_STS_outRev;
    stsTags[2] = SignalRService.tagList.F06_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F06_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F06_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F06_STS_limRev;
    stsTags[6] = SignalRService.tagList.F06_STS_almCUM;
    this.F06 = new MotorModel("F06", "S1,2,3,4 Infeed Conveyor (from Burley Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F06_STATE); this.motors.push(this.F06);
    // #endregion

    // #region F07 - S1,2 X Shuttle Belt (from Burley Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F07_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F07_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F07_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F07_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F07_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F07_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F07_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F07_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F07_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F07_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F07_STS_outRev;
    stsTags[2] = SignalRService.tagList.F07_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F07_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F07_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F07_STS_limRev;
    stsTags[6] = SignalRService.tagList.F07_STS_almCUM;
    this.F07 = new MotorModel("F07", "S1,2 X Shuttle Belt (from Burley Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F07_STATE); this.motors.push(this.F07);
    // #endregion

    // #region F08 - S1,2 X Shuttle Car (from Burley Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F08_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F08_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F08_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F08_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F08_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F08_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F08_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F08_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F08_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F08_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F08_STS_outRev;
    stsTags[2] = SignalRService.tagList.F08_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F08_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F08_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F08_STS_limRev;
    stsTags[6] = SignalRService.tagList.F08_STS_almCUM;
    this.F08 = new MotorModel("F08", "S1,2 X Shuttle Car (from Burley Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F08_STATE); this.motors.push(this.F08);
    // #endregion

    // #region F09 - S3,4 X Shuttle Belt (from Burley Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F09_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F09_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F09_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F09_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F09_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F09_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F09_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F09_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F09_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F09_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F09_STS_outRev;
    stsTags[2] = SignalRService.tagList.F09_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F09_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F09_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F09_STS_limRev;
    stsTags[6] = SignalRService.tagList.F09_STS_almCUM;
    this.F09 = new MotorModel("F09", "S3,4 X Shuttle Belt (from Burley Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F09_STATE); this.motors.push(this.F09);
    // #endregion

    // #region F10 - S3,4 X Shuttle Car (from Burley Line)
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F10_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F10_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F10_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F10_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F10_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F10_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F10_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F10_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F10_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F10_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F10_STS_outRev;
    stsTags[2] = SignalRService.tagList.F10_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F10_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F10_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F10_STS_limRev;
    stsTags[6] = SignalRService.tagList.F10_STS_almCUM;
    this.F10 = new MotorModel("F10", "S3,4 X Shuttle Car (from Burley Line)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F10_STATE); this.motors.push(this.F10);
    // #endregion

    // #region F11 - S1 Infeed Conveyor
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F11_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F11_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F11_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F11_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F11_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F11_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F11_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F11_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F11_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F11_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F11_STS_outRev;
    stsTags[2] = SignalRService.tagList.F11_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F11_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F11_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F11_STS_limRev;
    stsTags[6] = SignalRService.tagList.F11_STS_almCUM;
    this.F11 = new MotorModel("F11", "S1 Infeed Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F11_STATE); this.motors.push(this.F11);
    // #endregion

    // #region F15 - Silo Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F15_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F15_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F15_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F15_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F15_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F15_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F15_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F15_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F15_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F15_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F15_STS_outRev;
    stsTags[2] = SignalRService.tagList.F15_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F15_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F15_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F15_STS_limRev;
    stsTags[6] = SignalRService.tagList.F15_STS_almCUM;
    this.F15 = new MotorModel("F15", "Silo Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F15_STATE); this.motors.push(this.F15);
    // #endregion

    // #region F16 - S2 Infeed Conveyor
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F16_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F16_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F16_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F16_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F16_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F16_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F16_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F16_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F16_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F16_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F16_STS_outRev;
    stsTags[2] = SignalRService.tagList.F16_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F16_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F16_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F16_STS_limRev;
    stsTags[6] = SignalRService.tagList.F16_STS_almCUM;
    this.F16 = new MotorModel("F16", "S2 Infeed Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F16_STATE); this.motors.push(this.F16);
    // #endregion

    // #region F20 - Silo Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F20_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F20_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F20_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F20_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F20_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F20_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F20_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F20_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F20_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F20_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F20_STS_outRev;
    stsTags[2] = SignalRService.tagList.F20_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F20_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F20_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F20_STS_limRev;
    stsTags[6] = SignalRService.tagList.F20_STS_almCUM;
    this.F20 = new MotorModel("F20", "Silo Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F20_STATE); this.motors.push(this.F20);
    // #endregion

    // #region F21 - S3 Infeed Conveyor
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F21_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F21_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F21_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F21_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F21_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F21_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F21_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F21_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F21_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F21_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F21_STS_outRev;
    stsTags[2] = SignalRService.tagList.F21_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F21_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F21_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F21_STS_limRev;
    stsTags[6] = SignalRService.tagList.F21_STS_almCUM;
    this.F21 = new MotorModel("F21", "S3 Infeed Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F21_STATE); this.motors.push(this.F21);
    // #endregion

    // #region F25 - Silo Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F25_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F25_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F25_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F25_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F25_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F25_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F25_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F25_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F25_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F25_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F25_STS_outRev;
    stsTags[2] = SignalRService.tagList.F25_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F25_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F25_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F25_STS_limRev;
    stsTags[6] = SignalRService.tagList.F25_STS_almCUM;
    this.F25 = new MotorModel("F25", "Silo Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F25_STATE); this.motors.push(this.F25);
    // #endregion

    // #region F26 - S4 Infeed Conveyor
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F26_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F26_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F26_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F26_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F26_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F26_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F26_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F26_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F26_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F26_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F26_STS_outRev;
    stsTags[2] = SignalRService.tagList.F26_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F26_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F26_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F26_STS_limRev;
    stsTags[6] = SignalRService.tagList.F26_STS_almCUM;
    this.F26 = new MotorModel("F26", "S4 Infeed Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F26_STATE); this.motors.push(this.F26);
    // #endregion

    // #region F30 - Silo Doffer
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F30_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F30_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F30_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F30_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F30_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F30_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F30_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F30_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F30_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F30_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F30_STS_outRev;
    stsTags[2] = SignalRService.tagList.F30_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F30_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F30_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F30_STS_limRev;
    stsTags[6] = SignalRService.tagList.F30_STS_almCUM;
    this.F30 = new MotorModel("F30", "Silo Doffer", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F30_STATE); this.motors.push(this.F30);
    // #endregion

    // #endregion

    //*******************************************************
    // #region ZONA 3.2

    // #region F36A - Rollers
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F36A_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F36A_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F36A_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F36A_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F36A_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F36A_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F36A_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F36A_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F36A_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F36A_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F36A_STS_outRev;
    stsTags[2] = SignalRService.tagList.F36A_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F36A_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F36A_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F36A_STS_limRev;
    stsTags[6] = SignalRService.tagList.F36A_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F36A_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F36A_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F36A_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F36A_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F36A_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F36A_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F36A_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F36A_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F36A_actWarning;
    this.F36A = new MotorModel("F36A", "Rollers", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F36A_STATE, vfdTags); this.motors.push(this.F36A);
    // #endregion

    // #region F41 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F41_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F41_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F41_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F41_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F41_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F41_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F41_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F41_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F41_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F41_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F41_STS_outRev;
    stsTags[2] = SignalRService.tagList.F41_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F41_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F41_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F41_STS_limRev;
    stsTags[6] = SignalRService.tagList.F41_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F41_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F41_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F41_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F41_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F41_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F41_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F41_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F41_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F41_actWarning;
    this.F41 = new MotorModel("F41", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F41_STATE, vfdTags); this.motors.push(this.F41);
    // #endregion

    // #region F42 - Paddle
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F42_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F42_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F42_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F42_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F42_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F42_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F42_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F42_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F42_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F42_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F42_STS_outRev;
    stsTags[2] = SignalRService.tagList.F42_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F42_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F42_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F42_STS_limRev;
    stsTags[6] = SignalRService.tagList.F42_STS_almCUM;
    vfdTags = new Array(9);
    vfdTags[0] = SignalRService.tagList.VFD_F42_manRef;
    vfdTags[1] = SignalRService.tagList.VFD_F42_autRef;
    vfdTags[2] = SignalRService.tagList.VFD_F42_actRef;
    vfdTags[3] = SignalRService.tagList.VFD_F42_actVelPerc;
    vfdTags[4] = SignalRService.tagList.VFD_F42_actCurrent;
    vfdTags[5] = SignalRService.tagList.VFD_F42_actPower;
    vfdTags[6] = SignalRService.tagList.VFD_F42_energy;
    vfdTags[7] = SignalRService.tagList.VFD_F42_actFault;
    vfdTags[8] = SignalRService.tagList.VFD_F42_actWarning;
    this.F42 = new MotorModel("F42", "Paddle", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F42_STATE, vfdTags); this.motors.push(this.F42);
    // #endregion

    // #region F31 - S3,4/TP Conveyor
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F31_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F31_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F31_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F31_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F31_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F31_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F31_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F31_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F31_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F31_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F31_STS_outRev;
    stsTags[2] = SignalRService.tagList.F31_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F31_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F31_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F31_STS_limRev;
    stsTags[6] = SignalRService.tagList.F31_STS_almCUM;
    this.F31 = new MotorModel("F31", "S3,4/TP Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F31_STATE); this.motors.push(this.F31);
    // #endregion

    // #region F32 - S1,2 Discharge Conveyor
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F32_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F32_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F32_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F32_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F32_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F32_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F32_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F32_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F32_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F32_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F32_STS_outRev;
    stsTags[2] = SignalRService.tagList.F32_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F32_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F32_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F32_STS_limRev;
    stsTags[6] = SignalRService.tagList.F32_STS_almCUM;
    this.F32 = new MotorModel("F32", "S1,2 Discharge Conveyor", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F32_STATE); this.motors.push(this.F32);
    // #endregion

    // #region F33 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F33_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F33_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F33_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F33_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F33_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F33_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F33_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F33_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F33_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F33_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F33_STS_outRev;
    stsTags[2] = SignalRService.tagList.F33_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F33_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F33_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F33_STS_limRev;
    stsTags[6] = SignalRService.tagList.F33_STS_almCUM;
    this.F33 = new MotorModel("F33", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F33_STATE); this.motors.push(this.F33);
    // #endregion

    // #region F35 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F35_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F35_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F35_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F35_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F35_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F35_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F35_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F35_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F35_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F35_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F35_STS_outRev;
    stsTags[2] = SignalRService.tagList.F35_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F35_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F35_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F35_STS_limRev;
    stsTags[6] = SignalRService.tagList.F35_STS_almCUM;
    this.F35 = new MotorModel("F35", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F35_STATE); this.motors.push(this.F35);
    // #endregion

    // #region F39 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F39_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F39_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F39_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F39_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F39_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F39_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F39_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F39_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F39_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F39_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F39_STS_outRev;
    stsTags[2] = SignalRService.tagList.F39_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F39_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F39_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F39_STS_limRev;
    stsTags[6] = SignalRService.tagList.F39_STS_almCUM;
    this.F39 = new MotorModel("F39", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F39_STATE); this.motors.push(this.F39);
    // #endregion

    // #region F40 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F40_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F40_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F40_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F40_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F40_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F40_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F40_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F40_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F40_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F40_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F40_STS_outRev;
    stsTags[2] = SignalRService.tagList.F40_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F40_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F40_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F40_STS_limRev;
    stsTags[6] = SignalRService.tagList.F40_STS_almCUM;
    this.F40 = new MotorModel("F40", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F40_STATE); this.motors.push(this.F40);
    // #endregion

    // #region F36 - Roller module
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F36_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F36_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F36_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F36_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F36_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F36_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F36_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F36_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F36_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F36_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F36_STS_outRev;
    stsTags[2] = SignalRService.tagList.F36_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F36_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F36_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F36_STS_limRev;
    stsTags[6] = SignalRService.tagList.F36_STS_almCUM;
    this.F36 = new MotorModel("F36", "Roller module", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F36_STATE); this.motors.push(this.F36);
    // #endregion

    // #region F43 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F43_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F43_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F43_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F43_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F43_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F43_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F43_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F43_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F43_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F43_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F43_STS_outRev;
    stsTags[2] = SignalRService.tagList.F43_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F43_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F43_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F43_STS_limRev;
    stsTags[6] = SignalRService.tagList.F43_STS_almCUM;
    this.F43 = new MotorModel("F43", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F43_STATE); this.motors.push(this.F43);
    // #endregion

    // #region F44 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F44_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F44_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F44_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F44_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F44_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F44_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F44_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F44_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F44_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F44_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F44_STS_outRev;
    stsTags[2] = SignalRService.tagList.F44_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F44_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F44_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F44_STS_limRev;
    stsTags[6] = SignalRService.tagList.F44_STS_almCUM;
    this.F44 = new MotorModel("F44", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F44_STATE); this.motors.push(this.F44);
    // #endregion

    // #region F45 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F45_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F45_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F45_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F45_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F45_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F45_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F45_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F45_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F45_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F45_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F45_STS_outRev;
    stsTags[2] = SignalRService.tagList.F45_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F45_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F45_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F45_STS_limRev;
    stsTags[6] = SignalRService.tagList.F45_STS_almCUM;
    this.F45 = new MotorModel("F45", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F45_STATE); this.motors.push(this.F45);
    // #endregion

    // #region F46 - Belt
    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.F46_ALM_almMOL;
    almTags[1] = SignalRService.tagList.F46_ALM_almMAC;
    almTags[2] = SignalRService.tagList.F46_ALM_almDAC;
    almTags[3] = SignalRService.tagList.F46_ALM_almDRV;
    cmdTags = new Array(3);
    cmdTags[0] = SignalRService.tagList.F46_CMD_ManAut;
    cmdTags[1] = SignalRService.tagList.F46_CMD_ManCmdFwd;
    cmdTags[2] = SignalRService.tagList.F46_CMD_ManCmdRev;
    filterTags = new Array(2);
    filterTags[0] = SignalRService.tagList.F46_FILTER_BypassDAC;
    filterTags[1] = SignalRService.tagList.F46_FILTER_filCUM;
    stsTags = new Array(7);
    stsTags[0] = SignalRService.tagList.F46_STS_outFwd;
    stsTags[1] = SignalRService.tagList.F46_STS_outRev;
    stsTags[2] = SignalRService.tagList.F46_STS_stsFwd;
    stsTags[3] = SignalRService.tagList.F46_STS_stsRev;
    stsTags[4] = SignalRService.tagList.F46_STS_limFwd;
    stsTags[5] = SignalRService.tagList.F46_STS_limRev;
    stsTags[6] = SignalRService.tagList.F46_STS_almCUM;
    this.F46 = new MotorModel("F46", "Belt", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F46_STATE); this.motors.push(this.F46);
    // #endregion


    // #endregion

  }

}
