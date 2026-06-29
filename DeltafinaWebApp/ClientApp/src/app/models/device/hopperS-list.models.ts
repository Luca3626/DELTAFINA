import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient } from 'src/app/tags/tags-client';
import { HopperSModel } from './hopperS.models';

export class HopperSList {

  hoppers: Array<HopperSModel> = new Array<HopperSModel>();

  public TR6: HopperSModel;
  public TR7: HopperSModel;
  public TR8: HopperSModel;
  public TR9: HopperSModel;
  public TR10: HopperSModel;
  public TR11: HopperSModel;

  constructor() {

    let almTags, fdbTags, cmdTags, varieTags: TagsClient[];

    // #region TR6

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR6_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR6;
    cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TR6;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR6;

    varieTags = new Array(1);
    varieTags[0] = null;

    this.TR6 = new HopperSModel("TR6", "TRAMOGGIA SABBIA", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR6);

    // #endregion

    // #region TR7

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR7_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR7;
    cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TR7;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR7;

    varieTags = new Array(1);
    varieTags[0] = null;

    this.TR7 = new HopperSModel("TR7", "TRAMOGGIA SABBIA", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR7);

    // #endregion

    // #region TR8

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR8_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR8;
    cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TR8;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR8;

    varieTags = new Array(1);
    varieTags[0] = null;

    this.TR8 = new HopperSModel("TR8", "TRAMOGGIA SABBIA", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR8);

    // #endregion

    // #region TR9

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR9_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR9;
    cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TR9;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR9;

    varieTags = new Array(1);
    varieTags[0] = null;

    this.TR9 = new HopperSModel("TR9", "TRAMOGGIA SABBIA", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR9);

    // #endregion

    // #region TR10

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR10_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR10;
    cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TR10;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR10;

    varieTags = new Array(1);
    varieTags[0] = null;

    this.TR10 = new HopperSModel("TR10", "TRAMOGGIA SABBIA", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR10);

    // #endregion

    // #region TR11

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR11_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR11;
    cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TR11;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR11;

    varieTags = new Array(1);
    varieTags[0] = SignalRService.tagList.PC_VEL_PERC_ROTTAME_TR11;

    this.TR11 = new HopperSModel("TR11", "TRAMOGGIA SABBIA", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR11);

    // #endregion


    //*******************************************************************************************************



    // VECCHIA IMPLEMENTAZIONE VCP


    // #region TS2

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TS2_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TS2;
    //cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TS2;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TS2;

    //varieTags = new Array(0);

    //this.TS2 = new HopperSModel("TS2", "TRAMOGGIA SABBIA 2", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TS2);

    //// #endregion

    //// #region TS3

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TS3_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TS3;
    //cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TS3;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TS3;

    //varieTags = new Array(0);

    //this.TS3 = new HopperSModel("TS3", "TRAMOGGIA SABBIA 3", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TS3);

    //// #endregion

    //// #region TS4

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TS4_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TS4;
    //cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TS4;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TS4;

    //varieTags = new Array(0);

    //this.TS4 = new HopperSModel("TS4", "TRAMOGGIA SABBIA 4", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TS4);

    //// #endregion

    //// #region TS5

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TS5_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TS5;
    //cmdTags[1] = null;//SignalRService.tagList.PC_AB_VB_TS5;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TS5;

    //varieTags = new Array(0);

    //this.TS5 = new HopperSModel("TS5", "TRAMOGGIA SABBIA 5", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TS5);

    //// #endregion

  }

}
