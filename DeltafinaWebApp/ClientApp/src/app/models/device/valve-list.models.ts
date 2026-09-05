import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { ValveModel } from './valve.models';
import { TagsClient } from 'src/app/tags/tags-client';

export class ValveList {

  valves: Array<ValveModel> = new Array<ValveModel>();

  // #region VALVOLE
  public VDCC_V14_SV: ValveModel;
  public BDCC_B16_SV: ValveModel;
  public F_BNK1_SV: ValveModel;
  public F_BNK3_SV: ValveModel;
  public F_BNK4_SV: ValveModel;
  public BDCC_B19_SV: ValveModel;
  public BDCC_V17_SV: ValveModel;
  public CAC_STM_SV: ValveModel;
  public CAC_H2O_SV: ValveModel;
  public CAC_CAS_SV: ValveModel;
  public CAC_ATM_SV: ValveModel;
  public BCT1_TCOIL_SV: ValveModel;
  public BCT1_MCOIL_SV: ValveModel;
  public BCT1_COIL_SV: ValveModel;
  public BCT1_H2O_FAST_SV: ValveModel;
  public BCT1_TO_PUMP_SV: ValveModel;
  public BCT1_H2O_SLOW_SV: ValveModel;
  public BCT2_TCOIL_SV: ValveModel;
  public BCT2_MCOIL_SV: ValveModel;
  public BCT2_COIL_SV: ValveModel;
  public BCT2_H2O_FAST_SV: ValveModel;
  public BCT2_TO_PUMP_SV: ValveModel;
  public BCT2_H2O_SLOW_SV: ValveModel;
  public CAT4_H2O_SLOW_SV: ValveModel;
  public CAT3_TCOIL_SV: ValveModel;
  public CAT3_MCOIL_SV: ValveModel;
  public CAT3_BCOIL_SV: ValveModel;
  public CAT3_H2O_FAST_SV: ValveModel;
  public CAT3_TO_PUMP_SV: ValveModel;
  public CAT3_H2O_SLOW_SV: ValveModel;
  public BTFT5_H2O_SLOW_SV: ValveModel;
  public CAT4_TCOIL_SV: ValveModel;
  public CAT4_MCOIL_SV: ValveModel;
  public CAT4_BCOIL_SV: ValveModel;
  public CAT4_H2O_FAST_SV: ValveModel;
  public CAT4_TO_PUMP_SV: ValveModel;
  public BTFT5_H2O_FAST_SV: ValveModel;
  public BCAC_CAS_SV: ValveModel;
  public BCAC_ATM_SV: ValveModel;
  public BTFT_CAS_SV: ValveModel;
  public BTFT_ATM_SV: ValveModel;
  public B12C_B86_SV: ValveModel;
  public _15C_F72_SV: ValveModel;
  // #endregion

  constructor() {

    let almTags: TagsClient[], cmdTags: TagsClient[], filterTags: TagsClient[], stsTags: TagsClient[];

    // #region VDCC_V14_SV - Martinetto idraulico (su, giu')
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.VDCC_V14_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.VDCC_V14_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.VDCC_V14_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.VDCC_V14_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.VDCC_V14_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.VDCC_V14_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.VDCC_V14_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.VDCC_V14_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.VDCC_V14_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.VDCC_V14_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.VDCC_V14_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.VDCC_V14_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.VDCC_V14_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.VDCC_V14_SV_STS_almCUM;
    this.VDCC_V14_SV = new ValveModel("VDCC_V14_SV", "Martinetto idraulico (su, giu')", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.VDCC_V14_SV_STATE); this.VDCC_V14_SV.IS_JACK = true;   // martinetto: ha anche il toggle su/giu' sul Cmd2
    this.valves.push(this.VDCC_V14_SV);
    // #endregion

    // #region BDCC_B16_SV - Martinetto idraulico (su, giu')
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BDCC_B16_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BDCC_B16_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BDCC_B16_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BDCC_B16_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BDCC_B16_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BDCC_B16_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BDCC_B16_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BDCC_B16_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BDCC_B16_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BDCC_B16_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BDCC_B16_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BDCC_B16_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BDCC_B16_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BDCC_B16_SV_STS_almCUM;
    this.BDCC_B16_SV = new ValveModel("BDCC_B16_SV", "Martinetto idraulico (su, giu')", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BDCC_B16_SV_STATE); this.BDCC_B16_SV.IS_JACK = true;   // martinetto: ha anche il toggle su/giu' sul Cmd2
    this.valves.push(this.BDCC_B16_SV);
    // #endregion

    // #region F_BNK1_SV - Sparo aria maniche filtro
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.F_BNK1_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.F_BNK1_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.F_BNK1_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.F_BNK1_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.F_BNK1_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.F_BNK1_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.F_BNK1_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.F_BNK1_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.F_BNK1_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.F_BNK1_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.F_BNK1_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.F_BNK1_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.F_BNK1_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.F_BNK1_SV_STS_almCUM;
    this.F_BNK1_SV = new ValveModel("F_BNK1_SV", "Sparo aria maniche filtro", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F_BNK1_SV_STATE); this.valves.push(this.F_BNK1_SV);
    // #endregion

    // #region F_BNK3_SV - Sparo aria maniche filtro
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.F_BNK3_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.F_BNK3_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.F_BNK3_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.F_BNK3_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.F_BNK3_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.F_BNK3_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.F_BNK3_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.F_BNK3_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.F_BNK3_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.F_BNK3_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.F_BNK3_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.F_BNK3_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.F_BNK3_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.F_BNK3_SV_STS_almCUM;
    this.F_BNK3_SV = new ValveModel("F_BNK3_SV", "Sparo aria maniche filtro", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F_BNK3_SV_STATE); this.valves.push(this.F_BNK3_SV);
    // #endregion

    // #region F_BNK4_SV - Sparo aria maniche filtro
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.F_BNK4_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.F_BNK4_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.F_BNK4_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.F_BNK4_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.F_BNK4_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.F_BNK4_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.F_BNK4_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.F_BNK4_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.F_BNK4_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.F_BNK4_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.F_BNK4_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.F_BNK4_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.F_BNK4_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.F_BNK4_SV_STS_almCUM;
    this.F_BNK4_SV = new ValveModel("F_BNK4_SV", "Sparo aria maniche filtro", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.F_BNK4_SV_STATE); this.valves.push(this.F_BNK4_SV);
    // #endregion

    // #region BDCC_B19_SV - Valvola vapore barra pulizia
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BDCC_B19_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BDCC_B19_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BDCC_B19_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BDCC_B19_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BDCC_B19_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BDCC_B19_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BDCC_B19_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BDCC_B19_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BDCC_B19_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BDCC_B19_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BDCC_B19_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BDCC_B19_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BDCC_B19_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BDCC_B19_SV_STS_almCUM;
    this.BDCC_B19_SV = new ValveModel("BDCC_B19_SV", "Valvola vapore barra pulizia", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BDCC_B19_SV_STATE); this.valves.push(this.BDCC_B19_SV);
    // #endregion

    // #region BDCC_V17_SV - Valvola vapore barra pulizia
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BDCC_V17_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BDCC_V17_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BDCC_V17_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BDCC_V17_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BDCC_V17_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BDCC_V17_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BDCC_V17_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BDCC_V17_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BDCC_V17_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BDCC_V17_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BDCC_V17_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BDCC_V17_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BDCC_V17_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BDCC_V17_SV_STS_almCUM;
    this.BDCC_V17_SV = new ValveModel("BDCC_V17_SV", "Valvola vapore barra pulizia", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BDCC_V17_SV_STATE); this.valves.push(this.BDCC_V17_SV);
    // #endregion

    // #region CAC_STM_SV - Valvola vapore principale
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAC_STM_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAC_STM_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAC_STM_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAC_STM_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAC_STM_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAC_STM_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAC_STM_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAC_STM_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAC_STM_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAC_STM_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAC_STM_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAC_STM_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAC_STM_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAC_STM_SV_STS_almCUM;
    this.CAC_STM_SV = new ValveModel("CAC_STM_SV", "Valvola vapore principale", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAC_STM_SV_STATE); this.valves.push(this.CAC_STM_SV);
    // #endregion

    // #region CAC_H2O_SV - Valvola acqua principale
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAC_H2O_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAC_H2O_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAC_H2O_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAC_H2O_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAC_H2O_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAC_H2O_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAC_H2O_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAC_H2O_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAC_H2O_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAC_H2O_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAC_H2O_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAC_H2O_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAC_H2O_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAC_H2O_SV_STS_almCUM;
    this.CAC_H2O_SV = new ValveModel("CAC_H2O_SV", "Valvola acqua principale", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAC_H2O_SV_STATE); this.valves.push(this.CAC_H2O_SV);
    // #endregion

    // #region CAC_CAS_SV - Ugelli casing
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAC_CAS_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAC_CAS_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAC_CAS_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAC_CAS_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAC_CAS_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAC_CAS_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAC_CAS_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAC_CAS_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAC_CAS_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAC_CAS_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAC_CAS_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAC_CAS_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAC_CAS_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAC_CAS_SV_STS_almCUM;
    this.CAC_CAS_SV = new ValveModel("CAC_CAS_SV", "Ugelli casing", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAC_CAS_SV_STATE); this.valves.push(this.CAC_CAS_SV);
    // #endregion

    // #region CAC_ATM_SV - Valvola vapore trasporto
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAC_ATM_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAC_ATM_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAC_ATM_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAC_ATM_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAC_ATM_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAC_ATM_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAC_ATM_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAC_ATM_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAC_ATM_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAC_ATM_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAC_ATM_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAC_ATM_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAC_ATM_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAC_ATM_SV_STS_almCUM;
    this.CAC_ATM_SV = new ValveModel("CAC_ATM_SV", "Valvola vapore trasporto", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAC_ATM_SV_STATE); this.valves.push(this.CAC_ATM_SV);
    // #endregion

    // #region BCT1_TCOIL_SV - Serpentina riscaldamento serbatoio (alto)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT1_TCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT1_TCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT1_TCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT1_TCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT1_TCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT1_TCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT1_TCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT1_TCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT1_TCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT1_TCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT1_TCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT1_TCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT1_TCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT1_TCOIL_SV_STS_almCUM;
    this.BCT1_TCOIL_SV = new ValveModel("BCT1_TCOIL_SV", "Serpentina riscaldamento serbatoio (alto)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT1_TCOIL_SV_STATE); this.valves.push(this.BCT1_TCOIL_SV);
    // #endregion

    // #region BCT1_MCOIL_SV - Serpentina riscaldamento serbatoio (centro)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT1_MCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT1_MCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT1_MCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT1_MCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT1_MCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT1_MCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT1_MCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT1_MCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT1_MCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT1_MCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT1_MCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT1_MCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT1_MCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT1_MCOIL_SV_STS_almCUM;
    this.BCT1_MCOIL_SV = new ValveModel("BCT1_MCOIL_SV", "Serpentina riscaldamento serbatoio (centro)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT1_MCOIL_SV_STATE); this.valves.push(this.BCT1_MCOIL_SV);
    // #endregion

    // #region BCT1_COIL_SV - Serpentina riscaldamento serbatoio (basso)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT1_COIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT1_COIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT1_COIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT1_COIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT1_COIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT1_COIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT1_COIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT1_COIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT1_COIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT1_COIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT1_COIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT1_COIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT1_COIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT1_COIL_SV_STS_almCUM;
    this.BCT1_COIL_SV = new ValveModel("BCT1_COIL_SV", "Serpentina riscaldamento serbatoio (basso)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT1_COIL_SV_STATE); this.valves.push(this.BCT1_COIL_SV);
    // #endregion

    // #region BCT1_H2O_FAST_SV - Valvola acqua riempimento veloce
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT1_H2O_FAST_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT1_H2O_FAST_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT1_H2O_FAST_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT1_H2O_FAST_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT1_H2O_FAST_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT1_H2O_FAST_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT1_H2O_FAST_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT1_H2O_FAST_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT1_H2O_FAST_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT1_H2O_FAST_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT1_H2O_FAST_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT1_H2O_FAST_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT1_H2O_FAST_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT1_H2O_FAST_SV_STS_almCUM;
    this.BCT1_H2O_FAST_SV = new ValveModel("BCT1_H2O_FAST_SV", "Valvola acqua riempimento veloce", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT1_H2O_FAST_SV_STATE); this.valves.push(this.BCT1_H2O_FAST_SV);
    // #endregion

    // #region BCT1_TO_PUMP_SV - Valvola scarico serbatoio
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT1_TO_PUMP_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT1_TO_PUMP_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT1_TO_PUMP_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT1_TO_PUMP_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT1_TO_PUMP_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT1_TO_PUMP_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT1_TO_PUMP_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT1_TO_PUMP_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT1_TO_PUMP_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT1_TO_PUMP_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT1_TO_PUMP_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT1_TO_PUMP_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT1_TO_PUMP_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT1_TO_PUMP_SV_STS_almCUM;
    this.BCT1_TO_PUMP_SV = new ValveModel("BCT1_TO_PUMP_SV", "Valvola scarico serbatoio", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT1_TO_PUMP_SV_STATE); this.valves.push(this.BCT1_TO_PUMP_SV);
    // #endregion

    // #region BCT1_H2O_SLOW_SV - Valvola acqua riempimento lento
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT1_H2O_SLOW_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT1_H2O_SLOW_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT1_H2O_SLOW_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT1_H2O_SLOW_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT1_H2O_SLOW_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT1_H2O_SLOW_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT1_H2O_SLOW_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT1_H2O_SLOW_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT1_H2O_SLOW_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT1_H2O_SLOW_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT1_H2O_SLOW_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT1_H2O_SLOW_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT1_H2O_SLOW_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT1_H2O_SLOW_SV_STS_almCUM;
    this.BCT1_H2O_SLOW_SV = new ValveModel("BCT1_H2O_SLOW_SV", "Valvola acqua riempimento lento", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT1_H2O_SLOW_SV_STATE); this.valves.push(this.BCT1_H2O_SLOW_SV);
    // #endregion

    // #region BCT2_TCOIL_SV - Serpentina riscaldamento serbatoio (alto)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT2_TCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT2_TCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT2_TCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT2_TCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT2_TCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT2_TCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT2_TCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT2_TCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT2_TCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT2_TCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT2_TCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT2_TCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT2_TCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT2_TCOIL_SV_STS_almCUM;
    this.BCT2_TCOIL_SV = new ValveModel("BCT2_TCOIL_SV", "Serpentina riscaldamento serbatoio (alto)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT2_TCOIL_SV_STATE); this.valves.push(this.BCT2_TCOIL_SV);
    // #endregion

    // #region BCT2_MCOIL_SV - Serpentina riscaldamento serbatoio (centro)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT2_MCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT2_MCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT2_MCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT2_MCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT2_MCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT2_MCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT2_MCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT2_MCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT2_MCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT2_MCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT2_MCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT2_MCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT2_MCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT2_MCOIL_SV_STS_almCUM;
    this.BCT2_MCOIL_SV = new ValveModel("BCT2_MCOIL_SV", "Serpentina riscaldamento serbatoio (centro)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT2_MCOIL_SV_STATE); this.valves.push(this.BCT2_MCOIL_SV);
    // #endregion

    // #region BCT2_COIL_SV - Serpentina riscaldamento serbatoio (basso)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT2_COIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT2_COIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT2_COIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT2_COIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT2_COIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT2_COIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT2_COIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT2_COIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT2_COIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT2_COIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT2_COIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT2_COIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT2_COIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT2_COIL_SV_STS_almCUM;
    this.BCT2_COIL_SV = new ValveModel("BCT2_COIL_SV", "Serpentina riscaldamento serbatoio (basso)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT2_COIL_SV_STATE); this.valves.push(this.BCT2_COIL_SV);
    // #endregion

    // #region BCT2_H2O_FAST_SV - Valvola acqua riempimento veloce
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT2_H2O_FAST_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT2_H2O_FAST_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT2_H2O_FAST_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT2_H2O_FAST_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT2_H2O_FAST_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT2_H2O_FAST_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT2_H2O_FAST_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT2_H2O_FAST_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT2_H2O_FAST_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT2_H2O_FAST_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT2_H2O_FAST_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT2_H2O_FAST_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT2_H2O_FAST_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT2_H2O_FAST_SV_STS_almCUM;
    this.BCT2_H2O_FAST_SV = new ValveModel("BCT2_H2O_FAST_SV", "Valvola acqua riempimento veloce", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT2_H2O_FAST_SV_STATE); this.valves.push(this.BCT2_H2O_FAST_SV);
    // #endregion

    // #region BCT2_TO_PUMP_SV - Valvola scarico serbatoio
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT2_TO_PUMP_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT2_TO_PUMP_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT2_TO_PUMP_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT2_TO_PUMP_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT2_TO_PUMP_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT2_TO_PUMP_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT2_TO_PUMP_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT2_TO_PUMP_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT2_TO_PUMP_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT2_TO_PUMP_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT2_TO_PUMP_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT2_TO_PUMP_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT2_TO_PUMP_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT2_TO_PUMP_SV_STS_almCUM;
    this.BCT2_TO_PUMP_SV = new ValveModel("BCT2_TO_PUMP_SV", "Valvola scarico serbatoio", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT2_TO_PUMP_SV_STATE); this.valves.push(this.BCT2_TO_PUMP_SV);
    // #endregion

    // #region BCT2_H2O_SLOW_SV - Valvola acqua riempimento lento
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCT2_H2O_SLOW_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCT2_H2O_SLOW_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCT2_H2O_SLOW_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCT2_H2O_SLOW_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCT2_H2O_SLOW_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCT2_H2O_SLOW_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCT2_H2O_SLOW_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCT2_H2O_SLOW_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCT2_H2O_SLOW_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCT2_H2O_SLOW_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCT2_H2O_SLOW_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCT2_H2O_SLOW_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCT2_H2O_SLOW_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCT2_H2O_SLOW_SV_STS_almCUM;
    this.BCT2_H2O_SLOW_SV = new ValveModel("BCT2_H2O_SLOW_SV", "Valvola acqua riempimento lento", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCT2_H2O_SLOW_SV_STATE); this.valves.push(this.BCT2_H2O_SLOW_SV);
    // #endregion

    // #region CAT4_H2O_SLOW_SV - Valvola acqua riempimento lento
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT4_H2O_SLOW_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT4_H2O_SLOW_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT4_H2O_SLOW_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT4_H2O_SLOW_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT4_H2O_SLOW_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT4_H2O_SLOW_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT4_H2O_SLOW_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT4_H2O_SLOW_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT4_H2O_SLOW_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT4_H2O_SLOW_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT4_H2O_SLOW_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT4_H2O_SLOW_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT4_H2O_SLOW_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT4_H2O_SLOW_SV_STS_almCUM;
    this.CAT4_H2O_SLOW_SV = new ValveModel("CAT4_H2O_SLOW_SV", "Valvola acqua riempimento lento", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT4_H2O_SLOW_SV_STATE); this.valves.push(this.CAT4_H2O_SLOW_SV);
    // #endregion

    // #region CAT3_TCOIL_SV - Serpentina riscaldamento serbatoio (alto)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT3_TCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT3_TCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT3_TCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT3_TCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT3_TCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT3_TCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT3_TCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT3_TCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT3_TCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT3_TCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT3_TCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT3_TCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT3_TCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT3_TCOIL_SV_STS_almCUM;
    this.CAT3_TCOIL_SV = new ValveModel("CAT3_TCOIL_SV", "Serpentina riscaldamento serbatoio (alto)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT3_TCOIL_SV_STATE); this.valves.push(this.CAT3_TCOIL_SV);
    // #endregion

    // #region CAT3_MCOIL_SV - Serpentina riscaldamento serbatoio (centro)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT3_MCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT3_MCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT3_MCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT3_MCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT3_MCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT3_MCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT3_MCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT3_MCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT3_MCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT3_MCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT3_MCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT3_MCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT3_MCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT3_MCOIL_SV_STS_almCUM;
    this.CAT3_MCOIL_SV = new ValveModel("CAT3_MCOIL_SV", "Serpentina riscaldamento serbatoio (centro)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT3_MCOIL_SV_STATE); this.valves.push(this.CAT3_MCOIL_SV);
    // #endregion

    // #region CAT3_BCOIL_SV - Serpentina riscaldamento serbatoio (basso)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT3_BCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT3_BCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT3_BCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT3_BCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT3_BCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT3_BCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT3_BCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT3_BCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT3_BCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT3_BCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT3_BCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT3_BCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT3_BCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT3_BCOIL_SV_STS_almCUM;
    this.CAT3_BCOIL_SV = new ValveModel("CAT3_BCOIL_SV", "Serpentina riscaldamento serbatoio (basso)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT3_BCOIL_SV_STATE); this.valves.push(this.CAT3_BCOIL_SV);
    // #endregion

    // #region CAT3_H2O_FAST_SV - Valvola acqua riempimento veloce
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT3_H2O_FAST_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT3_H2O_FAST_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT3_H2O_FAST_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT3_H2O_FAST_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT3_H2O_FAST_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT3_H2O_FAST_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT3_H2O_FAST_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT3_H2O_FAST_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT3_H2O_FAST_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT3_H2O_FAST_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT3_H2O_FAST_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT3_H2O_FAST_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT3_H2O_FAST_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT3_H2O_FAST_SV_STS_almCUM;
    this.CAT3_H2O_FAST_SV = new ValveModel("CAT3_H2O_FAST_SV", "Valvola acqua riempimento veloce", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT3_H2O_FAST_SV_STATE); this.valves.push(this.CAT3_H2O_FAST_SV);
    // #endregion

    // #region CAT3_TO_PUMP_SV - Valvola scarico serbatoio
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT3_TO_PUMP_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT3_TO_PUMP_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT3_TO_PUMP_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT3_TO_PUMP_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT3_TO_PUMP_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT3_TO_PUMP_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT3_TO_PUMP_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT3_TO_PUMP_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT3_TO_PUMP_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT3_TO_PUMP_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT3_TO_PUMP_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT3_TO_PUMP_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT3_TO_PUMP_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT3_TO_PUMP_SV_STS_almCUM;
    this.CAT3_TO_PUMP_SV = new ValveModel("CAT3_TO_PUMP_SV", "Valvola scarico serbatoio", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT3_TO_PUMP_SV_STATE); this.valves.push(this.CAT3_TO_PUMP_SV);
    // #endregion

    // #region CAT3_H2O_SLOW_SV - Valvola acqua riempimento lento
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT3_H2O_SLOW_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT3_H2O_SLOW_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT3_H2O_SLOW_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT3_H2O_SLOW_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT3_H2O_SLOW_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT3_H2O_SLOW_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT3_H2O_SLOW_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT3_H2O_SLOW_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT3_H2O_SLOW_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT3_H2O_SLOW_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT3_H2O_SLOW_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT3_H2O_SLOW_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT3_H2O_SLOW_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT3_H2O_SLOW_SV_STS_almCUM;
    this.CAT3_H2O_SLOW_SV = new ValveModel("CAT3_H2O_SLOW_SV", "Valvola acqua riempimento lento", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT3_H2O_SLOW_SV_STATE); this.valves.push(this.CAT3_H2O_SLOW_SV);
    // #endregion

    // #region BTFT5_H2O_SLOW_SV - Valvola acqua riempimento lento
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BTFT5_H2O_SLOW_SV_STS_almCUM;
    this.BTFT5_H2O_SLOW_SV = new ValveModel("BTFT5_H2O_SLOW_SV", "Valvola acqua riempimento lento", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BTFT5_H2O_SLOW_SV_STATE); this.valves.push(this.BTFT5_H2O_SLOW_SV);
    // #endregion

    // #region CAT4_TCOIL_SV - Serpentina riscaldamento serbatoio (alto)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT4_TCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT4_TCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT4_TCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT4_TCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT4_TCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT4_TCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT4_TCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT4_TCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT4_TCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT4_TCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT4_TCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT4_TCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT4_TCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT4_TCOIL_SV_STS_almCUM;
    this.CAT4_TCOIL_SV = new ValveModel("CAT4_TCOIL_SV", "Serpentina riscaldamento serbatoio (alto)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT4_TCOIL_SV_STATE); this.valves.push(this.CAT4_TCOIL_SV);
    // #endregion

    // #region CAT4_MCOIL_SV - Serpentina riscaldamento serbatoio (centro)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT4_MCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT4_MCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT4_MCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT4_MCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT4_MCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT4_MCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT4_MCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT4_MCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT4_MCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT4_MCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT4_MCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT4_MCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT4_MCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT4_MCOIL_SV_STS_almCUM;
    this.CAT4_MCOIL_SV = new ValveModel("CAT4_MCOIL_SV", "Serpentina riscaldamento serbatoio (centro)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT4_MCOIL_SV_STATE); this.valves.push(this.CAT4_MCOIL_SV);
    // #endregion

    // #region CAT4_BCOIL_SV - Serpentina riscaldamento serbatoio (basso)
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT4_BCOIL_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT4_BCOIL_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT4_BCOIL_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT4_BCOIL_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT4_BCOIL_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT4_BCOIL_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT4_BCOIL_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT4_BCOIL_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT4_BCOIL_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT4_BCOIL_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT4_BCOIL_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT4_BCOIL_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT4_BCOIL_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT4_BCOIL_SV_STS_almCUM;
    this.CAT4_BCOIL_SV = new ValveModel("CAT4_BCOIL_SV", "Serpentina riscaldamento serbatoio (basso)", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT4_BCOIL_SV_STATE); this.valves.push(this.CAT4_BCOIL_SV);
    // #endregion

    // #region CAT4_H2O_FAST_SV - Valvola acqua riempimento veloce
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT4_H2O_FAST_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT4_H2O_FAST_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT4_H2O_FAST_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT4_H2O_FAST_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT4_H2O_FAST_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT4_H2O_FAST_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT4_H2O_FAST_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT4_H2O_FAST_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT4_H2O_FAST_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT4_H2O_FAST_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT4_H2O_FAST_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT4_H2O_FAST_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT4_H2O_FAST_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT4_H2O_FAST_SV_STS_almCUM;
    this.CAT4_H2O_FAST_SV = new ValveModel("CAT4_H2O_FAST_SV", "Valvola acqua riempimento veloce", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT4_H2O_FAST_SV_STATE); this.valves.push(this.CAT4_H2O_FAST_SV);
    // #endregion

    // #region CAT4_TO_PUMP_SV - Valvola scarico serbatoio
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.CAT4_TO_PUMP_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.CAT4_TO_PUMP_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.CAT4_TO_PUMP_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.CAT4_TO_PUMP_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.CAT4_TO_PUMP_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.CAT4_TO_PUMP_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.CAT4_TO_PUMP_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.CAT4_TO_PUMP_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.CAT4_TO_PUMP_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.CAT4_TO_PUMP_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.CAT4_TO_PUMP_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.CAT4_TO_PUMP_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.CAT4_TO_PUMP_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.CAT4_TO_PUMP_SV_STS_almCUM;
    this.CAT4_TO_PUMP_SV = new ValveModel("CAT4_TO_PUMP_SV", "Valvola scarico serbatoio", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.CAT4_TO_PUMP_SV_STATE); this.valves.push(this.CAT4_TO_PUMP_SV);
    // #endregion

    // #region BTFT5_H2O_FAST_SV - Valvola acqua riempimento veloce
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BTFT5_H2O_FAST_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BTFT5_H2O_FAST_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BTFT5_H2O_FAST_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BTFT5_H2O_FAST_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BTFT5_H2O_FAST_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BTFT5_H2O_FAST_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BTFT5_H2O_FAST_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BTFT5_H2O_FAST_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BTFT5_H2O_FAST_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BTFT5_H2O_FAST_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BTFT5_H2O_FAST_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BTFT5_H2O_FAST_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BTFT5_H2O_FAST_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BTFT5_H2O_FAST_SV_STS_almCUM;
    this.BTFT5_H2O_FAST_SV = new ValveModel("BTFT5_H2O_FAST_SV", "Valvola acqua riempimento veloce", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BTFT5_H2O_FAST_SV_STATE); this.valves.push(this.BTFT5_H2O_FAST_SV);
    // #endregion

    // #region BCAC_CAS_SV - Ugelli casing
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCAC_CAS_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCAC_CAS_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCAC_CAS_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCAC_CAS_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCAC_CAS_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCAC_CAS_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCAC_CAS_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCAC_CAS_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCAC_CAS_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCAC_CAS_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCAC_CAS_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCAC_CAS_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCAC_CAS_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCAC_CAS_SV_STS_almCUM;
    this.BCAC_CAS_SV = new ValveModel("BCAC_CAS_SV", "Ugelli casing", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCAC_CAS_SV_STATE); this.valves.push(this.BCAC_CAS_SV);
    // #endregion

    // #region BCAC_ATM_SV - Valvola vapore trasporto
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BCAC_ATM_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BCAC_ATM_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BCAC_ATM_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BCAC_ATM_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BCAC_ATM_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BCAC_ATM_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BCAC_ATM_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BCAC_ATM_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BCAC_ATM_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BCAC_ATM_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BCAC_ATM_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BCAC_ATM_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BCAC_ATM_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BCAC_ATM_SV_STS_almCUM;
    this.BCAC_ATM_SV = new ValveModel("BCAC_ATM_SV", "Valvola vapore trasporto", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BCAC_ATM_SV_STATE); this.valves.push(this.BCAC_ATM_SV);
    // #endregion

    // #region BTFT_CAS_SV - Ugelli casing
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BTFT_CAS_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BTFT_CAS_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BTFT_CAS_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BTFT_CAS_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BTFT_CAS_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BTFT_CAS_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BTFT_CAS_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BTFT_CAS_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BTFT_CAS_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BTFT_CAS_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BTFT_CAS_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BTFT_CAS_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BTFT_CAS_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BTFT_CAS_SV_STS_almCUM;
    this.BTFT_CAS_SV = new ValveModel("BTFT_CAS_SV", "Ugelli casing", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BTFT_CAS_SV_STATE); this.valves.push(this.BTFT_CAS_SV);
    // #endregion

    // #region BTFT_ATM_SV - Valvola vapore trasporto
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.BTFT_ATM_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.BTFT_ATM_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.BTFT_ATM_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.BTFT_ATM_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.BTFT_ATM_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.BTFT_ATM_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.BTFT_ATM_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.BTFT_ATM_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.BTFT_ATM_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.BTFT_ATM_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.BTFT_ATM_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.BTFT_ATM_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.BTFT_ATM_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.BTFT_ATM_SV_STS_almCUM;
    this.BTFT_ATM_SV = new ValveModel("BTFT_ATM_SV", "Valvola vapore trasporto", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.BTFT_ATM_SV_STATE); this.valves.push(this.BTFT_ATM_SV);
    // #endregion

    // #region B12C_B86_SV - Deviatore scivolo
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList.B12C_B86_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList.B12C_B86_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList.B12C_B86_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList.B12C_B86_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList.B12C_B86_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList.B12C_B86_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList.B12C_B86_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList.B12C_B86_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList.B12C_B86_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList.B12C_B86_SV_STS_opening;
    stsTags[1] = SignalRService.tagList.B12C_B86_SV_STS_closing;
    stsTags[2] = SignalRService.tagList.B12C_B86_SV_STS_opened;
    stsTags[3] = SignalRService.tagList.B12C_B86_SV_STS_closed;
    stsTags[4] = SignalRService.tagList.B12C_B86_SV_STS_almCUM;
    this.B12C_B86_SV = new ValveModel("B12C_B86_SV", "Deviatore scivolo", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList.B12C_B86_SV_STATE); this.valves.push(this.B12C_B86_SV);
    // #endregion

    // #region _15C_F72_SV - Deviatore scivolo
    almTags = new Array(3);
    almTags[0] = SignalRService.tagList._15C_F72_SV_ALM_openingAlarm;
    almTags[1] = SignalRService.tagList._15C_F72_SV_ALM_closingAlarm;
    almTags[2] = SignalRService.tagList._15C_F72_SV_ALM_Incongruence;
    cmdTags = new Array(2);
    cmdTags[0] = SignalRService.tagList._15C_F72_SV_CMD_Cmd1;
    cmdTags[1] = SignalRService.tagList._15C_F72_SV_CMD_Cmd2;
    filterTags = new Array(4);
    filterTags[0] = SignalRService.tagList._15C_F72_SV_FILTER_openingAlmBypass;
    filterTags[1] = SignalRService.tagList._15C_F72_SV_FILTER_closingAlmBypass;
    filterTags[2] = SignalRService.tagList._15C_F72_SV_FILTER_incongruenceAlmBypass;
    filterTags[3] = SignalRService.tagList._15C_F72_SV_FILTER_filCUM;
    stsTags = new Array(5);
    stsTags[0] = SignalRService.tagList._15C_F72_SV_STS_opening;
    stsTags[1] = SignalRService.tagList._15C_F72_SV_STS_closing;
    stsTags[2] = SignalRService.tagList._15C_F72_SV_STS_opened;
    stsTags[3] = SignalRService.tagList._15C_F72_SV_STS_closed;
    stsTags[4] = SignalRService.tagList._15C_F72_SV_STS_almCUM;
    // Il nome dell'utenza e' "15C_F72_SV": il sottolineato iniziale serve solo al campo,
    // perche' un identificatore TypeScript non puo' iniziare con una cifra.
    this._15C_F72_SV = new ValveModel("15C_F72_SV", "Deviatore scivolo", almTags, cmdTags, filterTags, stsTags, SignalRService.tagList._15C_F72_SV_STATE); this.valves.push(this._15C_F72_SV);
    // #endregion

    // #endregion
  }
}
