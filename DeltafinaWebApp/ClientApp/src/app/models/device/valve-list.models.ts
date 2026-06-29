import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { ValveModel } from './valve.models';
import { TagsClient } from 'src/app/tags/tags-client';

export class ValveList {

  valves: Array<ValveModel> = new Array<ValveModel>();

  // #region DICHIARAZIONE VALVOLE
  public V56: ValveModel;
  public V76: ValveModel;
  public V59: ValveModel;
  public V64: ValveModel;
  public V68: ValveModel;
  public V77: ValveModel;
  public V79: ValveModel;
  public SPB4: ValveModel;
  public SPB6: ValveModel;
  public V23: ValveModel;
  public V30: ValveModel;
  public V78: ValveModel;
  public F1: ValveModel;
  public CF103: ValveModel;
  public CF104: ValveModel;
  public CF105: ValveModel;
  public CF106: ValveModel;
  public CF107: ValveModel;
  public CF108: ValveModel;
  public CF109: ValveModel;
  public CF110: ValveModel;
  public CF111: ValveModel;
  public CF112: ValveModel;
  public VCRS3: ValveModel;
  public VCRS4: ValveModel;
  public VCRS5: ValveModel;
  public VCRS6: ValveModel;
  public VCRS7: ValveModel;
  public VCRS8: ValveModel;
  public VCRS9: ValveModel;
  public VCRS10: ValveModel;
  public VCRS11: ValveModel;
  public VCRS12: ValveModel;
  public SPTP6: ValveModel;
  public SPTP6_A: ValveModel;
  // #endregion

  constructor() {

    let almTags, fdbTags, cmdTags, varieTags: TagsClient[];

    // #region MISCELAZIONE E TRASPORTI FINALI

    // #region V56

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V56;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V56;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V56;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V56;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V56;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V56;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V56;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V56;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V56;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V56;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V56;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V56;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V56;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V56;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V56;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V56;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V56;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V56;
    cmdTags[3] = SignalRService.tagList.PC_START_V56;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V56;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V56;
    cmdTags[6] = SignalRService.tagList.PC_JA_V56;
    cmdTags[7] = SignalRService.tagList.PC_JC_V56;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V56;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V56;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V56;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V56;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V56;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V56;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V56;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V56;
    cmdTags[16] = SignalRService.tagList.PC_REM_V56;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V56;

    this.V56 = new ValveModel("V56", "Valvola pneumatica sotto bilancia B2", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V56);

    // #endregion

    // #region V76

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V76;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V76;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V76;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V76;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V76;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V76;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V76;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V76;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V76;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V76;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V76;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V76;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V76;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V76;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V76;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V76;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V76;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V76;
    cmdTags[3] = SignalRService.tagList.PC_START_V76;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V76;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V76;
    cmdTags[6] = SignalRService.tagList.PC_JA_V76;
    cmdTags[7] = SignalRService.tagList.PC_JC_V76;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V76;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V76;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V76;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V76;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V76;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V76;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V76;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V76;
    cmdTags[16] = SignalRService.tagList.PC_REM_V76;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V76;

    this.V76 = new ValveModel("V76", "Valvola pneumatica sotto bilancia B3A", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V76);

    // #endregion

    // #region V59

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V59;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V59;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V59;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V59;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V59;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V59;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V59;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V59;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V59;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V59;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V59;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V59;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V59;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V59;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V59;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V59;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V59;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V59;
    cmdTags[3] = SignalRService.tagList.PC_START_V59;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V59;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V59;
    cmdTags[6] = SignalRService.tagList.PC_JA_V59;
    cmdTags[7] = SignalRService.tagList.PC_JC_V59;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V59;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V59;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V59;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V59;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V59;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V59;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V59;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V59;
    cmdTags[16] = SignalRService.tagList.PC_REM_V59;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V59;

    this.V59 = new ValveModel("V59", "Valvola pneumatica sotto bilancia B3", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V59);

    // #endregion

    // #region V64

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V64;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V64;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V64;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V64;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V64;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V64;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V64;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V64;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V64;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V64;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V64;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V64;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V64;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V64;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V64;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V64;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V64;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V64;
    cmdTags[3] = SignalRService.tagList.PC_START_V64;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V64;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V64;
    cmdTags[6] = SignalRService.tagList.PC_JA_V64;
    cmdTags[7] = SignalRService.tagList.PC_JC_V64;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V64;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V64;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V64;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V64;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V64;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V64;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V64;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V64;
    cmdTags[16] = SignalRService.tagList.PC_REM_V64;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V64;

    this.V64 = new ValveModel("V64", "Valvola pneumatica sotto bilancia B4", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V64);

    // #endregion

    // #region V68

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V68;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V68;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V68;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V68;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V68;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V68;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V68;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V68;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V68;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V68;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V68;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V68;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V68;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V68;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V68;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V68;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V68;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V68;
    cmdTags[3] = SignalRService.tagList.PC_START_V68;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V68;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V68;
    cmdTags[6] = SignalRService.tagList.PC_JA_V68;
    cmdTags[7] = SignalRService.tagList.PC_JC_V68;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V68;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V68;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V68;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V68;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V68;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V68;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V68;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V68;
    cmdTags[16] = SignalRService.tagList.PC_REM_V68;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V68;

    this.V68 = new ValveModel("V68", "Valvola pneumatica sotto bilancia B5", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V68);

    // #endregion

    // #region V77

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V77;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V77;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V77;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V77;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V77;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V77;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V77;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V77;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V77;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V77;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V77;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V77;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V77;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V77;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V77;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V77;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V77;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V77;
    cmdTags[3] = SignalRService.tagList.PC_START_V77;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V77;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V77;
    cmdTags[6] = SignalRService.tagList.PC_JA_V77;
    cmdTags[7] = SignalRService.tagList.PC_JC_V77;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V77;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V77;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V77;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V77;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V77;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V77;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V77;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V77;
    cmdTags[16] = SignalRService.tagList.PC_REM_V77;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V77;

    this.V77 = new ValveModel("V77", "Valvola pneumatica sotto bilancia B5A", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V77);

    // #endregion

    // #region V79

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V79;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V79;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V79;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V79;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V79;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V79;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V79;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V79;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V79;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V79;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V79;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V79;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V79;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V79;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V79;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V79;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V79;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V79;
    cmdTags[3] = SignalRService.tagList.PC_START_V79;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V79;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V79;
    cmdTags[6] = SignalRService.tagList.PC_JA_V79;
    cmdTags[7] = SignalRService.tagList.PC_JC_V79;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V79;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V79;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V79;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V79;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V79;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V79;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V79;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V79;
    cmdTags[16] = SignalRService.tagList.PC_REM_V79;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V79;

    this.V79 = new ValveModel("V79", "Valvola pneumatica sotto bilancia B6", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V79);

    // #endregion

    // #region SPB4

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_SPB4;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_SPB4;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_SPB4;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_SPB4;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_SPB4;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_SPB4;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_SPB4;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_SPB4;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_SPB4;
    fdbTags[5] = SignalRService.tagList.FDB_REM_SPB4;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_SPB4;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_SPB4;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_SPB4;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_SPB4;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_SPB4;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_SPB4;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_SPB4;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_SPB4;
    cmdTags[3] = SignalRService.tagList.PC_START_SPB4;
    cmdTags[4] = SignalRService.tagList.PC_STOP_SPB4;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_SPB4;
    cmdTags[6] = SignalRService.tagList.PC_JA_SPB4;
    cmdTags[7] = SignalRService.tagList.PC_JC_SPB4;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_SPB4;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_SPB4;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_SPB4;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_SPB4;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_SPB4;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_SPB4;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_SPB4;
    cmdTags[15] = SignalRService.tagList.PC_LOC_SPB4;
    cmdTags[16] = SignalRService.tagList.PC_REM_SPB4;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_SPB4;

    this.SPB4 = new ValveModel("SPB4", "Scuotiparete Bilancia B4", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.SPB4);

    // #endregion

    // #region SPB6

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_SPB6;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_SPB6;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_SPB6;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_SPB6;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_SPB6;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_SPB6;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_SPB6;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_SPB6;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_SPB6;
    fdbTags[5] = SignalRService.tagList.FDB_REM_SPB6;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_SPB6;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_SPB6;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_SPB6;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_SPB6;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_SPB6;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_SPB6;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_SPB6;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_SPB6;
    cmdTags[3] = SignalRService.tagList.PC_START_SPB6;
    cmdTags[4] = SignalRService.tagList.PC_STOP_SPB6;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_SPB6;
    cmdTags[6] = SignalRService.tagList.PC_JA_SPB6;
    cmdTags[7] = SignalRService.tagList.PC_JC_SPB6;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_SPB6;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_SPB6;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_SPB6;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_SPB6;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_SPB6;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_SPB6;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_SPB6;
    cmdTags[15] = SignalRService.tagList.PC_LOC_SPB6;
    cmdTags[16] = SignalRService.tagList.PC_REM_SPB6;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_SPB6;

    this.SPB6 = new ValveModel("SPB6", "Scuotiparete Bilancia B6 ", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.SPB6);

    // #endregion

    // #region V23

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V23;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V23;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V23;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V23;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V23;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V23;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V23;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V23;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V23;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V23;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V23;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V23;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V23;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V23;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V23;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V23;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V23;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V23;
    cmdTags[3] = SignalRService.tagList.PC_START_V23;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V23;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V23;
    cmdTags[6] = SignalRService.tagList.PC_JA_V23;
    cmdTags[7] = SignalRService.tagList.PC_JC_V23;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V23;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V23;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V23;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V23;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V23;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V23;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V23;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V23;
    cmdTags[16] = SignalRService.tagList.PC_REM_V23;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V23;

    this.V23 = new ValveModel("V23", "Botola Mix", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V23);

    // #endregion

    // #region V30

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V30;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V30;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V30;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V30;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V30;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V30;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V30;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V30;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V30;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V30;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V30;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V30;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V30;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V30;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V30;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V30;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V30;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V30;
    cmdTags[3] = SignalRService.tagList.PC_START_V30;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V30;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V30;
    cmdTags[6] = SignalRService.tagList.PC_JA_V30;
    cmdTags[7] = SignalRService.tagList.PC_JC_V30;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V30;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V30;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V30;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V30;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V30;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V30;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V30;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V30;
    cmdTags[16] = SignalRService.tagList.PC_REM_V30;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V30;

    this.V30 = new ValveModel("V30", "Valvola Acqua", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V30);

    // #endregion

    // #region V78

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_V78;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_V78;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_V78;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_V78;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_V78;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_V78;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_V78;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_V78;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_V78;
    fdbTags[5] = SignalRService.tagList.FDB_REM_V78;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_V78;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_V78;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_V78;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_V78;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_V78;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_V78;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_V78;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_V78;
    cmdTags[3] = SignalRService.tagList.PC_START_V78;
    cmdTags[4] = SignalRService.tagList.PC_STOP_V78;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_V78;
    cmdTags[6] = SignalRService.tagList.PC_JA_V78;
    cmdTags[7] = SignalRService.tagList.PC_JC_V78;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_V78;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_V78;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_V78;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_V78;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_V78;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_V78;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_V78;
    cmdTags[15] = SignalRService.tagList.PC_LOC_V78;
    cmdTags[16] = SignalRService.tagList.PC_REM_V78;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_V78;

    this.V78 = new ValveModel("V78", "Serranda", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.V78);

    // #endregion

    // #region F1    (DEPOLVERAZIONE)

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_F1;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_F1;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_F1;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_F1;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_F1;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_F1;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_F1;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_F1;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_F1;
    fdbTags[5] = SignalRService.tagList.FDB_REM_F1;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_F1;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_F1;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_F1;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_F1;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_F1;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_F1;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_F1;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_F1;
    cmdTags[3] = SignalRService.tagList.PC_START_F1;
    cmdTags[4] = SignalRService.tagList.PC_STOP_F1;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_F1;
    cmdTags[6] = SignalRService.tagList.PC_JA_F1;
    cmdTags[7] = SignalRService.tagList.PC_JC_F1;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_F1;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_F1;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_F1;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_F1;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_F1;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_F1;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_F1;
    cmdTags[15] = SignalRService.tagList.PC_LOC_F1;
    cmdTags[16] = SignalRService.tagList.PC_REM_F1;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_F1;

    this.F1 = new ValveModel("F1", "Filtro a maniche", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.F1);

    // #endregion

    // #endregion


    // #region CARICO SILOS

    // #region CF103

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF103;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF103;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF103;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF103;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF103;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF103;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF103;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF103;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF103;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF103;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF103;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF103;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF103;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF103;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF103;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF103;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF103;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF103;
    cmdTags[3] = SignalRService.tagList.PC_START_CF103;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF103;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF103;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF103;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF103;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF103;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF103;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF103;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF103;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF103;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF103;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF103;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF103;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF103;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF103;

    this.CF103 = new ValveModel("CF103", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF103);

    // #endregion

    // #region CF104

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF104;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF104;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF104;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF104;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF104;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF104;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF104;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF104;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF104;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF104;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF104;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF104;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF104;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF104;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF104;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF104;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF104;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF104;
    cmdTags[3] = SignalRService.tagList.PC_START_CF104;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF104;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF104;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF104;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF104;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF104;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF104;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF104;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF104;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF104;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF104;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF104;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF104;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF104;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF104;

    this.CF104 = new ValveModel("CF104", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF104);

    // #endregion

    // #region CF105

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF105;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF105;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF105;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF105;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF105;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF105;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF105;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF105;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF105;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF105;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF105;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF105;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF105;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF105;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF105;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF105;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF105;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF105;
    cmdTags[3] = SignalRService.tagList.PC_START_CF105;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF105;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF105;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF105;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF105;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF105;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF105;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF105;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF105;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF105;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF105;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF105;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF105;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF105;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF105;

    this.CF105 = new ValveModel("CF105", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF105);

    // #endregion

    // #region CF106

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF106;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF106;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF106;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF106;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF106;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF106;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF106;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF106;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF106;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF106;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF106;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF106;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF106;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF106;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF106;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF106;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF106;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF106;
    cmdTags[3] = SignalRService.tagList.PC_START_CF106;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF106;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF106;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF106;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF106;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF106;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF106;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF106;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF106;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF106;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF106;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF106;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF106;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF106;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF106;

    this.CF106 = new ValveModel("CF106", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF106);

    // #endregion

    // #region CF107

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF107;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF107;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF107;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF107;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF107;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF107;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF107;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF107;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF107;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF107;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF107;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF107;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF107;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF107;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF107;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF107;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF107;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF107;
    cmdTags[3] = SignalRService.tagList.PC_START_CF107;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF107;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF107;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF107;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF107;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF107;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF107;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF107;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF107;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF107;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF107;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF107;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF107;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF107;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF107;

    this.CF107 = new ValveModel("CF107", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF107);

    // #endregion

    // #region CF108

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF108;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF108;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF108;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF108;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF108;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF108;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF108;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF108;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF108;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF108;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF108;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF108;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF108;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF108;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF108;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF108;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF108;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF108;
    cmdTags[3] = SignalRService.tagList.PC_START_CF108;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF108;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF108;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF108;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF108;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF108;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF108;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF108;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF108;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF108;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF108;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF108;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF108;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF108;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF108;

    this.CF108 = new ValveModel("CF108", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF108);

    // #endregion

    // #region CF109

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF109;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF109;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF109;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF109;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF109;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF109;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF109;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF109;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF109;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF109;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF109;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF109;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF109;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF109;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF109;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF109;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF109;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF109;
    cmdTags[3] = SignalRService.tagList.PC_START_CF109;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF109;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF109;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF109;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF109;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF109;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF109;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF109;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF109;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF109;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF109;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF109;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF109;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF109;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF109;

    this.CF109 = new ValveModel("CF109", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF109);

    // #endregion

    // #region CF110

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF110;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF110;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF110;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF110;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF110;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF110;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF110;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF110;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF110;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF110;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF110;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF110;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF110;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF110;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF110;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF110;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF110;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF110;
    cmdTags[3] = SignalRService.tagList.PC_START_CF110;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF110;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF110;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF110;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF110;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF110;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF110;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF110;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF110;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF110;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF110;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF110;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF110;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF110;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF110;

    this.CF110 = new ValveModel("CF110", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF110);

    // #endregion

    // #region CF111

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF111;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF111;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF111;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF111;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF111;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF111;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF111;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF111;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF111;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF111;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF111;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF111;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF111;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF111;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF111;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF111;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF111;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF111;
    cmdTags[3] = SignalRService.tagList.PC_START_CF111;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF111;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF111;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF111;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF111;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF111;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF111;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF111;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF111;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF111;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF111;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF111;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF111;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF111;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF111;

    this.CF111 = new ValveModel("CF111", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF111);

    // #endregion


    // #region CF112

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_CF112;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_CF112;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_CF112;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_CF112;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_CF112;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_CF112;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_CF112;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_CF112;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_CF112;
    fdbTags[5] = SignalRService.tagList.FDB_REM_CF112;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_CF112;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_CF112;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_CF112;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_CF112;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_CF112;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_CF112;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_CF112;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_CF112;
    cmdTags[3] = SignalRService.tagList.PC_START_CF112;
    cmdTags[4] = SignalRService.tagList.PC_STOP_CF112;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_CF112;
    cmdTags[6] = SignalRService.tagList.PC_JA_CF112;
    cmdTags[7] = SignalRService.tagList.PC_JC_CF112;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_CF112;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_CF112;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_CF112;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_CF112;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_CF112;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_CF112;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_CF112;
    cmdTags[15] = SignalRService.tagList.PC_LOC_CF112;
    cmdTags[16] = SignalRService.tagList.PC_REM_CF112;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_CF112;

    this.CF112 = new ValveModel("CF112", "Centralina", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.CF112);

    // #endregion

    // #region VCRS3

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS3;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS3;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS3;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS3;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS3;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS3;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS3;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS3;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS3;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS3;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS3;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS3;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS3;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS3;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS3;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS3;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS3;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS3;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS3;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS3;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS3;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS3;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS3;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS3;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS3;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS3;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS3;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS3;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS3;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS3;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS3;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS3;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS3;

    this.VCRS3 = new ValveModel("VCRS3", "Bocchettone di carico Silo S3", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS3);

    // #endregion

    // #region VCRS4

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS4;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS4;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS4;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS4;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS4;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS4;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS4;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS4;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS4;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS4;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS4;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS4;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS4;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS4;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS4;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS4;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS4;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS4;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS4;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS4;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS4;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS4;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS4;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS4;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS4;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS4;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS4;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS4;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS4;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS4;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS4;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS4;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS4;

    this.VCRS4 = new ValveModel("VCRS4", "Bocchettone di carico Silo S4", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS4);

    // #endregion

    // #region VCRS5

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS5;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS5;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS5;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS5;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS5;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS5;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS5;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS5;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS5;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS5;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS5;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS5;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS5;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS5;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS5;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS5;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS5;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS5;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS5;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS5;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS5;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS5;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS5;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS5;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS5;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS5;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS5;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS5;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS5;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS5;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS5;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS5;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS5;

    this.VCRS5 = new ValveModel("VCRS5", "Bocchettone di carico Silo S5", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS5);

    // #endregion

    // #region VCRS6

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS6;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS6;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS6;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS6;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS6;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS6;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS6;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS6;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS6;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS6;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS6;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS6;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS6;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS6;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS6;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS6;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS6;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS6;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS6;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS6;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS6;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS6;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS6;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS6;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS6;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS6;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS6;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS6;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS6;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS6;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS6;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS6;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS6;

    this.VCRS6 = new ValveModel("VCRS6", "Bocchettone di carico Silo S6", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS6);

    // #endregion

    // #region VCRS7

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS7;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS7;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS7;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS7;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS7;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS7;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS7;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS7;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS7;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS7;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS7;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS7;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS7;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS7;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS7;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS7;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS7;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS7;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS7;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS7;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS7;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS7;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS7;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS7;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS7;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS7;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS7;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS7;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS7;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS7;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS7;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS7;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS7;

    this.VCRS7 = new ValveModel("VCRS7", "Bocchettone di carico Silo S7", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS7);

    // #endregion

    // #region VCRS8

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS8;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS8;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS8;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS8;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS8;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS8;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS8;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS8;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS8;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS8;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS8;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS8;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS8;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS8;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS8;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS8;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS8;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS8;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS8;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS8;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS8;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS8;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS8;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS8;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS8;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS8;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS8;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS8;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS8;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS8;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS8;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS8;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS8;

    this.VCRS8 = new ValveModel("VCRS8", "Bocchettone di carico Silo S8", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS8);

    // #endregion

    // #region VCRS9

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS9;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS9;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS9;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS9;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS9;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS9;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS9;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS9;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS9;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS9;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS9;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS9;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS9;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS9;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS9;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS9;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS9;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS9;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS9;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS9;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS9;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS9;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS9;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS9;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS9;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS9;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS9;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS9;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS9;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS9;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS9;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS9;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS9;

    this.VCRS9 = new ValveModel("VCRS9", "Bocchettone di carico Silo S9", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS9);

    // #endregion

    // #region VCRS10

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS10;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS10;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS10;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS10;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS10;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS10;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS10;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS10;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS10;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS10;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS10;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS10;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS10;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS10;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS10;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS10;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS10;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS10;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS10;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS10;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS10;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS10;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS10;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS10;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS10;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS10;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS10;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS10;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS10;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS10;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS10;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS10;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS10;

    this.VCRS10 = new ValveModel("VCRS10", "Bocchettone di carico Silo S10", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS10);

    // #endregion

    // #region VCRS11

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS11;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS11;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS11;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS11;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS11;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS11;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS11;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS11;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS11;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS11;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS11;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS11;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS11;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS11;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS11;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS11;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS11;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS11;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS11;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS11;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS11;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS11;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS11;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS11;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS11;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS11;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS11;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS11;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS11;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS11;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS11;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS11;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS11;

    this.VCRS11 = new ValveModel("VCRS11", "Bocchettone di carico Silo S11", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS11);

    // #endregion

    // #region VCRS12

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_VCRS12;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_VCRS12;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_VCRS12;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_VCRS12;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_VCRS12;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_VCRS12;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_VCRS12;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_VCRS12;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_VCRS12;
    fdbTags[5] = SignalRService.tagList.FDB_REM_VCRS12;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_VCRS12;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_VCRS12;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_VCRS12;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_VCRS12;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_VCRS12;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_VCRS12;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_VCRS12;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_VCRS12;
    cmdTags[3] = SignalRService.tagList.PC_START_VCRS12;
    cmdTags[4] = SignalRService.tagList.PC_STOP_VCRS12;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_VCRS12;
    cmdTags[6] = SignalRService.tagList.PC_JA_VCRS12;
    cmdTags[7] = SignalRService.tagList.PC_JC_VCRS12;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_VCRS12;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_VCRS12;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_VCRS12;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_VCRS12;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_VCRS12;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_VCRS12;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_VCRS12;
    cmdTags[15] = SignalRService.tagList.PC_LOC_VCRS12;
    cmdTags[16] = SignalRService.tagList.PC_REM_VCRS12;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_VCRS12;

    this.VCRS12 = new ValveModel("VCRS12", "Bocchettone di carico Silo S12", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.VCRS12);

    // #endregion

    // #endregion


    // #region DOSAGGIO

    // #region SPTP6

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_SPTP6;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_SPTP6;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_SPTP6;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_SPTP6;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_SPTP6;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_SPTP6;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_SPTP6;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_SPTP6;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_SPTP6;
    fdbTags[5] = SignalRService.tagList.FDB_REM_SPTP6;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_SPTP6;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_SPTP6;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_SPTP6;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_SPTP6;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_SPTP6;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_SPTP6;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_SPTP6;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_SPTP6;
    cmdTags[3] = SignalRService.tagList.PC_START_SPTP6;
    cmdTags[4] = SignalRService.tagList.PC_STOP_SPTP6;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_SPTP6;
    cmdTags[6] = SignalRService.tagList.PC_JA_SPTP6;
    cmdTags[7] = SignalRService.tagList.PC_JC_SPTP6;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_SPTP6;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_SPTP6;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_SPTP6;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_SPTP6;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_SPTP6;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_SPTP6;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_SPTP6;
    cmdTags[15] = SignalRService.tagList.PC_LOC_SPTP6;
    cmdTags[16] = SignalRService.tagList.PC_REM_SPTP6;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_SPTP6;

    this.SPTP6 = new ValveModel("SPTP6", "Scuotiparete", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.SPTP6);

    // #endregion

    // #region SPTP6_A

    almTags = new Array(4);
    almTags[0] = SignalRService.tagList.FDB_ALM_OPEN_SPTP6_A;
    almTags[1] = SignalRService.tagList.FDB_ALM_CLOSE_SPTP6_A;
    almTags[2] = SignalRService.tagList.FDB_ALM_OPENCLOSE_SPTP6_A;
    almTags[3] = SignalRService.tagList.FDB_ALM_NOREADYAUT_SPTP6_A;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_OPEN_SPTP6_A;
    fdbTags[1] = SignalRService.tagList.FDB_CLOSE_SPTP6_A;
    fdbTags[2] = SignalRService.tagList.FDB_FC_OPEN_SPTP6_A;
    fdbTags[3] = SignalRService.tagList.FDB_FC_CLOSE_SPTP6_A;
    fdbTags[4] = SignalRService.tagList.FDB_LOC_SPTP6_A;
    fdbTags[5] = SignalRService.tagList.FDB_REM_SPTP6_A;
    fdbTags[6] = SignalRService.tagList.FDB_MANREM_SPTP6_A;
    fdbTags[7] = SignalRService.tagList.FDB_AUTREM_SPTP6_A;
    fdbTags[8] = SignalRService.tagList.FDB_READYAUTREM_SPTP6_A;
    fdbTags[9] = SignalRService.tagList.FDB_PRESAVVISO_SPTP6_A;
    fdbTags[10] = SignalRService.tagList.FDB_PRESALLARME_SPTP6_A;

    cmdTags = new Array(17);
    cmdTags[0] = SignalRService.tagList.PC_MANREM_SPTP6_A;
    cmdTags[1] = null;//SignalRService.tagList.PC_SEMIAUT_SPTP6_A;
    cmdTags[2] = SignalRService.tagList.PC_AUTREM_SPTP6_A;
    cmdTags[3] = SignalRService.tagList.PC_START_SPTP6_A;
    cmdTags[4] = SignalRService.tagList.PC_STOP_SPTP6_A;
    cmdTags[5] = SignalRService.tagList.PC_SIMULA_SPTP6_A;
    cmdTags[6] = SignalRService.tagList.PC_JA_SPTP6_A;
    cmdTags[7] = SignalRService.tagList.PC_JC_SPTP6_A;
    cmdTags[8] = SignalRService.tagList.PC_R_ALARM_SPTP6_A;
    cmdTags[9] = SignalRService.tagList.PC_R_STARTS1_SPTP6_A;
    cmdTags[10] = SignalRService.tagList.PC_R_STARTS2_SPTP6_A;
    cmdTags[11] = SignalRService.tagList.PC_R_TRIP1_SPTP6_A;
    cmdTags[12] = SignalRService.tagList.PC_R_TRIP2_SPTP6_A;
    cmdTags[13] = SignalRService.tagList.PC_DIS_FCAP_SPTP6_A;
    cmdTags[14] = SignalRService.tagList.PC_DIS_FCCH_SPTP6_A;
    cmdTags[15] = SignalRService.tagList.PC_LOC_SPTP6_A;
    cmdTags[16] = SignalRService.tagList.PC_REM_SPTP6_A;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PLC_STATO_SPTP6_A;

    this.SPTP6_A = new ValveModel("SPTP6_A", "Scuotiparete", almTags, fdbTags, cmdTags, varieTags); this.valves.push(this.SPTP6_A);

    // #endregion

    // #endregion

  }
}
