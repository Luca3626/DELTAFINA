import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient } from 'src/app/tags/tags-client';
import { HopperRModel } from './hopperR.models';

export class HopperRList {

  hoppers: Array<HopperRModel> = new Array<HopperRModel>();

  public TR1: HopperRModel;
  public TR2: HopperRModel;
  public TR3: HopperRModel;
  public TR4: HopperRModel;
  public TR5: HopperRModel;

  constructor() {

    let almTags, fdbTags, cmdTags, varieTags: TagsClient[];

    // #region TR1

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR1_PP; //BOOL_PLC_TR1_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR1; // BOOL_PC_ESCLUDI_TR1;
    cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TR1;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR1; //BOOL_PC_BYPASS_LL_TR1;

    varieTags = new Array(0);

    this.TR1 = new HopperRModel("TR1", "TRAMOGGIA ROTTAME 1", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR1);

    // #endregion

    // #region TR2

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR2_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR2;
    cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TRR2;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR2;

    varieTags = new Array(0);

    this.TR2 = new HopperRModel("TR2", "TRAMOGGIA ROTTAME 2", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR2);

    // #endregion


    // #region TR3

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR3_PP; //BOOL_PLC_TR3_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR3; // BOOL_PC_ESCLUDI_TR3;
    cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TR3;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR3; //BOOL_PC_BYPASS_LL_TR3;

    varieTags = new Array(0);

    this.TR3 = new HopperRModel("TR3", "TRAMOGGIA ROTTAME 3", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR3);
    // #endregion

    // #region TR4

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR4_PP; //BOOL_PLC_TR4_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR4; // BOOL_PC_ESCLUDI_TR4;
    cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TR4;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR4; //BOOL_PC_BYPASS_LL_TR4;

    varieTags = new Array(0);

    this.TR4 = new HopperRModel("TR4", "TRAMOGGIA ROTTAME 4", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR4);
    // #endregion

    // #region TR5

    almTags = new Array(0);

    fdbTags = new Array(1);
    fdbTags[0] = SignalRService.tagList.FDB_TR5_PP; //BOOL_PLC_TR5_PP;

    cmdTags = new Array(3)
    cmdTags[0] = SignalRService.tagList.PC_ESCLUDI_TR5; // BOOL_PC_ESCLUDI_TR5;
    cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TR5;
    cmdTags[2] = SignalRService.tagList.PC_BYPASS_LL_TR5; //BOOL_PC_BYPASS_LL_TR5;

    varieTags = new Array(0);

    this.TR5 = new HopperRModel("TR5", "TRAMOGGIA ROTTAME 5", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR5);
    // #endregion






    //***************************************************************************************************************************************************************************
    //***************************************************************************************************************************************************************************
    //***************************************************************************************************************************************************************************





    // VECCHIA IMPLEMENTAZIONE DELLE BILANCE IN VPC_FORNO 2

    //// #region TRR3

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TRR3_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TRR3;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TRR3;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TRR3;

    //varieTags = new Array(0);

    //this.TRR3 = new HopperRModel("TRR3", "TRAMOGGIA ROTTAME 3", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TRR3);

    //// #endregion

    //// #region TRR4

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TRR4_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TRR4;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TRR4;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TRR4;

    //varieTags = new Array(0);

    //this.TRR4 = new HopperRModel("TRR4", "TRAMOGGIA ROTTAME 4", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TRR4);

    //// #endregion

    //// #region TRR5

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TRR5_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TRR5;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TRR5;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TRR5;

    //varieTags = new Array(0);

    //this.TRR5 = new HopperRModel("TRR5", "TRAMOGGIA ROTTAME 5", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TRR5);

    //// #endregion

    //// #region TRR113

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TRR113_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TRR113;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TRR113;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TRR113;

    //varieTags = new Array(0);

    //this.TRR113 = new HopperRModel("TRR113", "TRAMOGGIA ROTTAME 13", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TRR113);

    //// #endregion

    //// #region TRR116

    //almTags = new Array(0);

    //fdbTags = new Array(1);
    //fdbTags[0] = SignalRService.tagList.BOOL_PLC_TRR116_PP;

    //cmdTags = new Array(3)
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_ESCLUDI_TRR116;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_AB_VB_TRR116;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_BYPASS_LL_TRR116;

    //varieTags = new Array(0);

    //this.TRR116 = new HopperRModel("TRR116", "TRAMOGGIA ROTTAME 16", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TRR116);

    //// #endregion

  }

}
