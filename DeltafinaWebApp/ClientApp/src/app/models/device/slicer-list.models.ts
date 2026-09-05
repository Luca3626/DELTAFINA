import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { SlicerModel } from './slicer.models';
import { TagsClient } from 'src/app/tags/tags-client';

export class SlicerList {

  slicers: Array<SlicerModel> = new Array<SlicerModel>();

  // #region LISTA SLICER
  public slicerVirginia: SlicerModel;
  public slicerBurley: SlicerModel;
  // #endregion

  constructor() {

    let almTags: TagsClient[], peTags: TagsClient[], lsTags: TagsClient[], varTags: TagsClient[], cxTags: TagsClient[];

    // #region slicerVirginia - Slicer linea Virginia
    almTags = new Array(1);
    almTags[0] = SignalRService.tagList.PLC_VSL_System_AL_Flsr;             // {Y0509} avaria impianto (H28.1)
    peTags = new Array(11);
    peTags[0] = SignalRService.tagList.PLC_VSL_WBelt_PE;                    // {X0340} balla in posizione sul nastro pesatore (B1)
    peTags[1] = SignalRService.tagList.PLC_VSL_SBelt_PE;                    // {X0366} balla in posizione sul nastro slicer (B3.1)
    peTags[2] = SignalRService.tagList.PLC_VSL_Pushr_PE_Clr;                // {X0367} percorso spintore libero (B3.2)
    peTags[3] = SignalRService.tagList.PLC_VSL_SBelt_PE_Lg;                 // {X0368} balla in posizione di misura (B3.3)
    peTags[4] = SignalRService.tagList.PLC_VISC_V01_PE;                     // {X0193} #1 conveyor
    peTags[5] = SignalRService.tagList.PLC_VISC_V02_PE;                     // {X0194} #2 conveyor
    peTags[6] = SignalRService.tagList.PLC_VISC_V03_PE;                     // {X0195} #3 conveyor
    peTags[7] = SignalRService.tagList.PLC_VISC_V04_PE;                     // {X0196} nastro ribaltatore
    peTags[8] = SignalRService.tagList.PLC_VISC_V07_PE;                     // {X0199} #4 conveyor
    peTags[9] = SignalRService.tagList.PLC_VISC_V08_PE;                     // {X0200} #5 conveyor
    peTags[10] = SignalRService.tagList.PLC_VISC_V06_PE;                    // {X0204} nastro ribaltatore
    lsTags = new Array(9);
    lsTags[0] = SignalRService.tagList.PLC_VSL_System_LS_Drs;               // {X0355} interblocco porte (K16A)
    lsTags[1] = SignalRService.tagList.PLC_VSL_Pushr_LS_Up;                 // {X0364} spintore in alto (S3.7)
    lsTags[2] = SignalRService.tagList.PLC_VSL_Pushr_LS_Dwn;                // {X0365} spintore in basso (S3.8)
    lsTags[3] = SignalRService.tagList.PLC_VSL_Retnr_LS_Home;               // {X0384} ritentore a riposo (S5.4)
    lsTags[4] = SignalRService.tagList.PLC_VSL_Retnr_LS_REV;                // {X0385} ritentore in reverse (S5.5)
    lsTags[5] = SignalRService.tagList.PLC_VSL_Retnr_LS_Up;                 // {X0386} ritentore in alto (S5.6)
    lsTags[6] = SignalRService.tagList.PLC_VSL_Retnr_LS_Dwn;                // {X0387} ritentore in basso (S5.7)
    lsTags[7] = SignalRService.tagList.PLC_VISC_V05_LS_CounterClkws;        // {X0197} ribaltatore in posizione antioraria
    lsTags[8] = SignalRService.tagList.PLC_VISC_V05_LS_Clkws;               // {X0198} ribaltatore in posizione oraria
    varTags = new Array(8);
    varTags[0] = SignalRService.tagList.VAR_V71;                            // kg/h  setpoint flusso
    varTags[1] = SignalRService.tagList.VAR_V78;                            // kg    peso al nastro
    varTags[2] = SignalRService.tagList.VAR_V79;                            // kg    totalizzatore
    varTags[3] = SignalRService.tagList.VAR_V90;                            //       numero casse
    varTags[4] = SignalRService.tagList.VAR_V422;                           // kg    peso medio casse
    varTags[5] = SignalRService.tagList.VAR_V427;                           // kg/h  flusso attuale
    varTags[6] = SignalRService.tagList.VAR_V1100;                          //       numero di tagli
    varTags[7] = SignalRService.tagList.PLC_VISC_OFF_ON_SS;                 // Stato selettore fisico ON/OFF
    cxTags = new Array(1);
    cxTags[0] = SignalRService.tagList.PLC_VSL_CX;                          // {DB121.dbx0.3} consenso di linea
    this.slicerVirginia = new SlicerModel("slicerVirginia", "Slicer linea Virginia", almTags, peTags, lsTags, varTags, cxTags); this.slicers.push(this.slicerVirginia);
    // #endregion

    // #region slicerBurley - Slicer linea Burley
    almTags = new Array(1);
    almTags[0] = SignalRService.tagList.PLC_BSL_System_AL_Flsr;             // {Y1885} avaria impianto (H28.1)
    peTags = new Array(11);
    peTags[0] = SignalRService.tagList.PLC_BSL_WBelt_PE;                    // {X1316} balla in posizione sul nastro pesatore (B1)
    peTags[1] = SignalRService.tagList.PLC_BSL_SBelt_PE;                    // {X1342} balla in posizione sul nastro slicer (B3.1)
    peTags[2] = SignalRService.tagList.PLC_BSL_Pushr_PE_Clr;                // {X1343} percorso spintore libero (B3.2)
    peTags[3] = SignalRService.tagList.PLC_BSL_SBelt_PE_Lg;                 // {X1344} balla in posizione di misura (B3.3)
    peTags[4] = SignalRService.tagList.PLC_BISC_B03_PE;                     // {X0209} #1 conveyor
    peTags[5] = SignalRService.tagList.PLC_BISC_B04_PE;                     // {X0210} #2 conveyor
    peTags[6] = SignalRService.tagList.PLC_BISC_B05_PE;                     // {X0211} #3 conveyor
    peTags[7] = SignalRService.tagList.PLC_BISC_B06_PE;                     // {X0212} nastro ribaltatore
    peTags[8] = SignalRService.tagList.PLC_BISC_B09_PE;                     // {X0215} #4 conveyor
    peTags[9] = SignalRService.tagList.PLC_BISC_B10_PE;                     // {X0216} #5 conveyor
    peTags[10] = SignalRService.tagList.PLC_BISC_B08_PE;                    // {X0220} nastro ribaltatore
    lsTags = new Array(9);
    lsTags[0] = SignalRService.tagList.PLC_BSL_System_LS_Drs;               // {X1331} interblocco porte (K16A)
    lsTags[1] = SignalRService.tagList.PLC_BSL_Pushr_LS_Up;                 // {X1340} spintore in alto (S3.7)
    lsTags[2] = SignalRService.tagList.PLC_BSL_Pushr_LS_Dwn;                // {X1341} spintore in basso (S3.8)
    lsTags[3] = SignalRService.tagList.PLC_BSL_Retnr_LS_Home;               // {X1360} ritentore a riposo (S5.4)
    lsTags[4] = SignalRService.tagList.PLC_BSL_Retnr_LS_Rev;                // {X1361} ritentore in reverse (S5.5)
    lsTags[5] = SignalRService.tagList.PLC_BSL_Retnr_LS_Up;                 // {X1362} ritentore in alto (S5.6)
    lsTags[6] = SignalRService.tagList.PLC_BSL_Retnr_LS_Dwn;                // {X1363} ritentore in basso (S5.7)
    lsTags[7] = SignalRService.tagList.PLC_BISC_B07_LS_CounterClkws;        // {X0213} ribaltatore in posizione antioraria
    lsTags[8] = SignalRService.tagList.PLC_BISC_B07_LS_Clkws;               // {X0214} ribaltatore in posizione oraria
    varTags = new Array(8);
    varTags[0] = SignalRService.tagList.VAR_V371;                           // kg/h  setpoint flusso
    varTags[1] = SignalRService.tagList.VAR_V378;                           // kg    peso al nastro
    varTags[2] = SignalRService.tagList.VAR_V379;                           // kg    totalizzatore
    varTags[3] = SignalRService.tagList.VAR_V390;                           //       numero casse
    varTags[4] = SignalRService.tagList.VAR_V222;                           // kg    peso medio casse
    varTags[5] = SignalRService.tagList.VAR_V227;                           // kg/h  flusso attuale
    varTags[6] = SignalRService.tagList.VAR_V1101;                          //       numero di tagli
    varTags[7] = SignalRService.tagList.PLC_BISC_OFF_ON_SS;                 // Stato selettore fisico ON/OFF
    cxTags = new Array(1);
    cxTags[0] = SignalRService.tagList.PLC_BSL_CX;                          // {DB121.dbx0.4} consenso di linea
    this.slicerBurley = new SlicerModel("slicerBurley", "Slicer linea Burley", almTags, peTags, lsTags, varTags, cxTags); this.slicers.push(this.slicerBurley);
    // #endregion

  }
}
