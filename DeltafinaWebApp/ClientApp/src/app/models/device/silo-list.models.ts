import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient } from 'src/app/tags/tags-client';
import { SiloModel } from './silo.models';

export class SiloList {

  silos: Array<SiloModel> = new Array<SiloModel>();

  public S1: SiloModel;
  public S2: SiloModel;
  public S3: SiloModel;
  public S4: SiloModel;
  public S5: SiloModel;
  public S6: SiloModel;
  public S7: SiloModel;
  public S8: SiloModel;
  public S9: SiloModel;
  public S10: SiloModel;
  public S11: SiloModel;
  public S12: SiloModel;
  public S13: SiloModel;
  public S14: SiloModel;
  public S15: SiloModel;
  public S16: SiloModel;
  public TP6: SiloModel;
  public TP6A: SiloModel;

  constructor() {

    let almTags, fdbTags, cmdTags, varieTags: TagsClient[];

    // #region S1

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S1;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S1_PNT_ACT;                          // REAL_PLC_S1_RD_VAL_ACT     ---> S1_PNT_ACT 
    fdbTags[1] = SignalRService.tagList.FDB_S1_V_ACT;                            // REAL_PLC_S1_RD_VOLUME_ACT  ---> S1_V_ACT
    fdbTags[2] = SignalRService.tagList.FDB_S1_P_ACT;                            // REAL_PLC_S1_RD_PESO_ACT    ---> S1_P_ACT
    fdbTags[3] = SignalRService.tagList.FDB_S1_PERC_ACT;                         // REAL_PLC_S1_RD_PERC_ACT    ---> S1_PERC_ACT
    fdbTags[4] = SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_S1;
    fdbTags[5] = null; //SignalRService.tagList.FDB_S1_PRESSOSTATO_ACT;
    fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S1_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S1_HL;                               // OK  (LIVELLO HIGH. SENSORE SILO PIENO: 0 GRIGIO, 1 ROSSO)             
    fdbTags[7] = SignalRService.tagList.FDB_S1_HP;                               // OK  (HIG PRESSURE. SENSORE SOVRAPPRESSIONE SILO (0 ROSSO, 1 VERDE)
    fdbTags[8] = null;//SignalRService.tagList.FDB_S1_BOCCH;                          // BOOL_PLC_S1_BOCCHETTONE_IMPEGNATO ---> S1_BOCCH
    fdbTags[9] = SignalRService.tagList.FDB_S1_PRESSOSTATO_ACT;
    fdbTags[10] = null; //SignalRService.tagList.FDB_S1_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; // SignalRService.tagList.BOOL_PC_INCLUDI_S1;  
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S1;                 // BOOL_PC_ABILITA_CARICO_SILO_S1  -->   PC_ABIL_CARICO_S1

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S1_PNT_VUOTO                       // REAL_PC_S1_RD_VAL_A_VUOTO ---> S1_PNT_VUOTO
    varieTags[1] = SignalRService.tagList.S1_PNT_GIUNTACONO                  // REAL_PC_S1_RD_VAL_CONO_ALTO ---> S1_PNT_GIUNTACONO
    varieTags[2] = SignalRService.tagList.S1_PNT_PIENO                       // REAL_PC_S1_RD_VAL_FILO_HHL  ---> S1_PNT_PIENO        
    varieTags[3] = SignalRService.tagList.S1_VOL_CONO                        // REAL_PC_S1_RD_VOLUME_CONO_ALTO ---> S1_VOL_CONO
    varieTags[4] = SignalRService.tagList.S1_VOL_MAX                         // REAL_PC_S1_RD_VOLUME_FILO_HHL ---> S1_VOL_MAX
    varieTags[5] = SignalRService.tagList.S1_DENSITA;             
    varieTags[6] = SignalRService.tagList.RIF_INV_S1_LENTO;                  //INT_PC_RIF_INV_S1_LENTO ---> RIF_INV_S1_LENTO
    varieTags[7] = SignalRService.tagList.RIF_INV_S1_VELOCE;                 //INT_PC_RIF_INV_S1_VELOCE ---> RIF_INV_S1_VELOCE
    varieTags[8] = SignalRService.tagList.S1_VOLO;
    varieTags[9] = SignalRService.tagList.S1_P_RALLENTAMENTO; 
    varieTags[10] = null; //SignalRService.tagList.REAL_PC_S1_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F001_SOGLIA_ALLARME;
    varieTags[12] = null; //SignalRService.tagList.PC_S1_MOD_SCUOTIPARETE;
    varieTags[13] = null; //SignalRService.tagList.PC_T_PAUSA_S3; // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = null; //SignalRService.tagList.PC_T_LAVORO_S3;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S1 = new SiloModel("S1", "S1", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S1);

    // #endregion

    // #region S2

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S2;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S2_PNT_ACT;  //REAL_PLC_S2_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S2_V_ACT; //REAL_PLC_S2_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S2_P_ACT; //REAL_PLC_S2_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S2_PERC_ACT; //REAL_PLC_S2_RD_PERC_ACT;
    fdbTags[4] = SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_S2;
    fdbTags[5] = SignalRService.tagList.FDB_S2_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S2_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S2_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S2_HP; // BOOL_PLC_S2_SOVRAPPRESSIONE_OK;
    //fdbTags[8] = SignalRService.tagList.FDB_S2_BOCCH;//SignalRService.tagList.BOOL_PLC_S2_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = SignalRService.tagList.FDB_S2_PRESSOSTATO_ACT;
    fdbTags[10] = null;//SignalRService.tagList.FDB_S2_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null;// SignalRService.tagList.BOOL_PC_INCLUDI_S2; 
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S2;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S2_PNT_VUOTO; //REAL_PC_S2_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S2_PNT_GIUNTACONO; //REAL_PC_S2_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S2_PNT_PIENO; //REAL_PC_S2_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S2_VOL_CONO; //REAL_PC_S2_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S2_VOL_MAX; //REAL_PC_S2_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S2_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S2_LENTO; //INT_PC_RIF_INV_S2_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S2_VELOCE; //INT_PC_RIF_INV_S2_VELOCE;
    varieTags[8] = SignalRService.tagList.S2_VOLO; //REAL_PC_S2_VOLO;
    varieTags[9] = SignalRService.tagList.S2_P_RALLENTAMENTO; //REAL_PC_S2_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S2_SOGLIA_HL;
    varieTags[11] = null;//SignalRService.tagList.REAL_PC_F001_SOGLIA_ALLARME;
    varieTags[12] = null;//SignalRService.tagList.PC_S2_MOD_SCUOTIPARETE;
    varieTags[13] = null;//SignalRService.tagList.PC_T_PAUSA_S3; // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = null;//SignalRService.tagList.PC_T_LAVORO_S3;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante

    this.S2 = new SiloModel("S2", "S2", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S2);

    // #endregion

    // #region S3

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S3;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S3_PNT_ACT;//REAL_PLC_S3_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S3_V_ACT;//REAL_PLC_S3_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S3_P_ACT;//REAL_PLC_S3_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S3_PERC_ACT; //REAL_PLC_S3_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.FDB_tagList.FDB_CD_T_NUOVO_CARICO_S3;
    fdbTags[5] = SignalRService.tagList.FDB_S3_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S3_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S3_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S3_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S3_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S3_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S3_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S3;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S3;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S3_PNT_VUOTO;
    varieTags[1] = SignalRService.tagList.S3_PNT_GIUNTACONO;
    varieTags[2] = SignalRService.tagList.S3_PNT_PIENO;
    varieTags[3] = SignalRService.tagList.S3_VOL_CONO;
    varieTags[4] = SignalRService.tagList.S3_VOL_MAX;
    varieTags[5] = SignalRService.tagList.S3_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S3_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S3_VELOCE;
    varieTags[8] = SignalRService.tagList.S3_VOLO;
    varieTags[9] = SignalRService.tagList.S3_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S3_SOGLIA_HL;
    varieTags[11] = null;//SignalRService.tagList.REAL_PC_F001_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S3_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S3; // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S3;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante

    this.S3 = new SiloModel("S3", "S3", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S3);

    // #endregion

    // #region S4

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S4;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S4_PNT_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S4_V_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S4_P_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S4_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.FDB_CD_T_NUOVO_CARICO_S4;
    fdbTags[5] = SignalRService.tagList.FDB_S4_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S4_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S4_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S4_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S4_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S4_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S4_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null;//SignalRService.tagList.BOOL_PC_INCLUDI_S4;//ok
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S4;//ok

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S4_PNT_VUOTO;
    varieTags[1] = SignalRService.tagList.S4_PNT_GIUNTACONO;
    varieTags[2] = SignalRService.tagList.S4_PNT_PIENO;
    varieTags[3] = SignalRService.tagList.S4_VOL_CONO;
    varieTags[4] = SignalRService.tagList.S4_VOL_MAX;
    varieTags[5] = SignalRService.tagList.S4_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S4_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S4_VELOCE;
    varieTags[8] = SignalRService.tagList.S4_VOLO;
    varieTags[9] = SignalRService.tagList.S4_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S4_SOGLIA_HL;
    varieTags[11] = null;//SignalRService.tagList.REAL_PC_F001_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S4_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S4;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S4;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S4 = new SiloModel("S4", "S4", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S4);

    // #endregion

    // #region S5

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S5;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S5_PNT_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S5_V_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S5_P_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S5_PERC_ACT;
    fdbTags[4] = null;//SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S5;
    fdbTags[5] = SignalRService.tagList.FDB_S5_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S5_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S5_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S5_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S5_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S5_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S5_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null;//SignalRService.tagList.BOOL_PC_INCLUDI_S5;//ok
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S5;//ok

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S5_PNT_VUOTO;
    varieTags[1] = SignalRService.tagList.S5_PNT_GIUNTACONO;
    varieTags[2] = SignalRService.tagList.S5_PNT_PIENO;
    varieTags[3] = SignalRService.tagList.S5_VOL_CONO;
    varieTags[4] = SignalRService.tagList.S5_VOL_MAX;
    varieTags[5] = SignalRService.tagList.S5_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S5_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S5_VELOCE;
    varieTags[8] = SignalRService.tagList.S5_VOLO;
    varieTags[9] = SignalRService.tagList.S5_P_RALLENTAMENTO;
    varieTags[10] = null; //SignalRService.tagList.REAL_PC_S5_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F005_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S5_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S5;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S5;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S5 = new SiloModel("S5", "S5", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S5);

    // #endregion

    // #region S6

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S6;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S6_PNT_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S6_V_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S6_P_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S6_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S6;
    fdbTags[5] = SignalRService.tagList.FDB_S6_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S6_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S6_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S6_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S6_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S6_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S6_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S6;//ok
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S6;//ok

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S6_PNT_VUOTO;
    varieTags[1] = SignalRService.tagList.S6_PNT_GIUNTACONO;
    varieTags[2] = SignalRService.tagList.S6_PNT_PIENO;
    varieTags[3] = SignalRService.tagList.S6_VOL_CONO;
    varieTags[4] = SignalRService.tagList.S6_VOL_MAX;
    varieTags[5] = SignalRService.tagList.S6_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S6_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S6_VELOCE;
    varieTags[8] = SignalRService.tagList.S6_VOLO;
    varieTags[9] = SignalRService.tagList.S6_P_RALLENTAMENTO;
    varieTags[10] = null; //SignalRService.tagList.REAL_PC_S6_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F006_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S6_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S6;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S6;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S6 = new SiloModel("S6", "S6", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S6);

    // #endregion

    // #region S7

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S8;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S7_PNT_ACT; //REAL_PLC_S8_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S7_V_ACT; //REAL_PLC_S8_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S7_P_ACT; //REAL_PLC_S8_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S7_PERC_ACT; //REAL_PLC_S8_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S8;
    fdbTags[5] = SignalRService.tagList.FDB_S7_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S8_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S7_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S7_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S7_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S7_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S7_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S8;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S7;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S7_PNT_VUOTO; //REAL_PC_S8_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S7_PNT_GIUNTACONO; //REAL_PC_S8_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S7_PNT_PIENO; //REAL_PC_S8_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S7_VOL_CONO; //REAL_PC_S8_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S7_VOL_MAX; //REAL_PC_S8_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S7_DENSITA; //REAL_PC_S8_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S7_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S7_VELOCE;
    varieTags[8] = SignalRService.tagList.S7_VOLO;
    varieTags[9] = SignalRService.tagList.S7_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S8_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F008_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S7_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S7;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S7;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S7 = new SiloModel("S7", "S7", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S7);

    // #endregion

    // #region S8

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S8;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S8_PNT_ACT;               //REAL_PLC_S8_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S8_V_ACT;                 //REAL_PLC_S8_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S8_P_ACT;                 //REAL_PLC_S8_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S8_PERC_ACT;              //REAL_PLC_S8_RD_PERC_ACT;
    fdbTags[4] = null;                                            //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S8;
    fdbTags[5] = SignalRService.tagList.FDB_S8_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S8_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S8_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S8_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S8_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S8_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S8_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S8;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S8;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S8_PNT_VUOTO;      //REAL_PC_S8_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S8_PNT_GIUNTACONO; //REAL_PC_S8_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S8_PNT_PIENO;      //REAL_PC_S8_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S8_VOL_CONO;       //REAL_PC_S8_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S8_VOL_MAX;        //REAL_PC_S8_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S8_DENSITA;        //REAL_PC_S8_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S8_LENTO;  //INT_PC_RIF_INV_S8_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S8_VELOCE; //INT_PC_RIF_INV_S8_VELOCE;
    varieTags[8] = SignalRService.tagList.S8_VOLO;           //REAL_PC_S8_VOLO;
    varieTags[9] = SignalRService.tagList.S8_P_RALLENTAMENTO;//REAL_PC_S8_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S8_SOGLIA_HL;
    varieTags[11] = null;//SignalRService.tagList.REAL_PC_F008_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S8_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S8;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S8;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S8 = new SiloModel("S8", "S8", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S8);

    // #endregion

    // #region S9

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S9;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S9_PNT_ACT;  //REAL_PLC_S9_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S9_V_ACT;    //REAL_PLC_S9_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S9_P_ACT;    //REAL_PLC_S9_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S9_PERC_ACT; //REAL_PLC_S9_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S9;
    fdbTags[5] = SignalRService.tagList.FDB_S9_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S9_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S9_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S9_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S9_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S9_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S9_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S9;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S9;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S9_PNT_VUOTO;      //REAL_PC_S9_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S9_PNT_GIUNTACONO; //REAL_PC_S9_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S9_PNT_PIENO;      //REAL_PC_S9_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S9_VOL_CONO;       //REAL_PC_S9_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S9_VOL_MAX;        //REAL_PC_S9_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S9_DENSITA;        //REAL_PC_S9_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S9_LENTO;  //INT_PC_RIF_INV_S9_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S9_VELOCE; //INT_PC_RIF_INV_S9_VELOCE;
    varieTags[8] = SignalRService.tagList.S9_VOLO;           //REAL_PC_S9_VOLO;
    varieTags[9] = SignalRService.tagList.S9_P_RALLENTAMENTO;//REAL_PC_S9_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S9_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F009_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S9_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S9;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S9;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S9 = new SiloModel("S9", "S9", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S9);

    // #endregion

    // #region S10

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S10;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S10_PNT_ACT; //REAL_PLC_S10_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S10_V_ACT;   //REAL_PLC_S10_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S10_P_ACT;   //REAL_PLC_S10_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S10_PERC_ACT;//REAL_PLC_S10_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S10;
    fdbTags[5] = SignalRService.tagList.FDB_S10_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S10_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S10_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S10_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S10_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S10_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S10_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S10;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S10;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S10_PNT_VUOTO;      //REAL_PC_S10_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S10_PNT_GIUNTACONO; //REAL_PC_S10_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S10_PNT_PIENO;      //REAL_PC_S10_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S10_VOL_CONO;       //REAL_PC_S10_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S10_VOL_MAX;        //REAL_PC_S10_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S10_DENSITA;        //REAL_PC_S10_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S10_LENTO;  //INT_PC_RIF_INV_S10_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S10_VELOCE; //INT_PC_RIF_INV_S10_VELOCE;
    varieTags[8] = SignalRService.tagList.S10_VOLO;           //REAL_PC_S10_VOLO;
    varieTags[9] = SignalRService.tagList.S10_P_RALLENTAMENTO;//REAL_PC_S10_P_RALLENTAMENTO;
    varieTags[10] = null; //SignalRService.tagList.REAL_PC_S10_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F010_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S10_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S10;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S10;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S10 = new SiloModel("S10", "S10", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S10);

    // #endregion

    // #region S11

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S11;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S11_PNT_ACT; //REAL_PLC_S11_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S11_V_ACT;   //REAL_PLC_S11_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S11_P_ACT;   //REAL_PLC_S11_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S11_PERC_ACT;//REAL_PLC_S11_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S11;
    fdbTags[5] = SignalRService.tagList.FDB_S11_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S11_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S11_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S11_HP;
    fdbTags[8] = SignalRService.tagList.FDB_S11_BOCCH;
    fdbTags[9] = SignalRService.tagList.FDB_S11_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S11_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S11;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S11;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S11_PNT_VUOTO;      //REAL_PC_S11_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S11_PNT_GIUNTACONO; //REAL_PC_S11_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S11_PNT_PIENO;      //REAL_PC_S11_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S11_VOL_CONO;       //REAL_PC_S11_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S11_VOL_MAX;        //REAL_PC_S11_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S11_DENSITA;        //REAL_PC_S11_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S11_LENTO;  //INT_PC_RIF_INV_S11_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S11_VELOCE; //INT_PC_RIF_INV_S11_VELOCE;
    varieTags[8] = SignalRService.tagList.S11_VOLO;           //REAL_PC_S11_VOLO;
    varieTags[9] = SignalRService.tagList.S11_P_RALLENTAMENTO;//REAL_PC_S11_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S11_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F011_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S11_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S11;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S11;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S11 = new SiloModel("S11", "S11", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S11);

    // #endregion

    // #region S12

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S12;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S12_PNT_ACT; //REAL_PLC_S12_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S12_V_ACT;   //REAL_PLC_S12_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S12_P_ACT;   //REAL_PLC_S12_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S12_PERC_ACT;//REAL_PLC_S12_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.INT_FDB_CD_T_NUOVO_CARICO_S12;
    fdbTags[5] = SignalRService.tagList.FDB_S12_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S12_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S12_HL;    //BOOL_PLC_S12_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S12_HP;    //BOOL_PLC_S12_SOVRAPPRESSIONE_OK;
    fdbTags[8] = SignalRService.tagList.FDB_S12_BOCCH; //BOOL_PLC_S12_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = SignalRService.tagList.FDB_S12_PRESSOSTATO_ACT;
    fdbTags[10] = SignalRService.tagList.FDB_S4_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S12;//ok
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S12;//ok

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S12_PNT_VUOTO;      //REAL_PC_S12_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S12_PNT_GIUNTACONO; //REAL_PC_S12_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S12_PNT_PIENO;      //REAL_PC_S12_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S12_VOL_CONO;       //REAL_PC_S12_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S12_VOL_MAX;        //REAL_PC_S12_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S12_DENSITA;        //REAL_PC_S12_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S12_LENTO;  //INT_PC_RIF_INV_S12_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S12_VELOCE; //INT_PC_RIF_INV_S12_VELOCE;
    varieTags[8] = SignalRService.tagList.S12_VOLO;           //REAL_PC_S12_VOLO;
    varieTags[9] = SignalRService.tagList.S12_P_RALLENTAMENTO;//REAL_PC_S12_P_RALLENTAMENTO;
    varieTags[10] = null; //SignalRService.tagList.REAL_PC_S12_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F012_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_S12_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_S12;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_S12;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S12 = new SiloModel("S12", "S12", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S12);

    // #endregion

    // #region S13

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S13;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S13_PNT_ACT; //REAL_PLC_S13_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S13_V_ACT;   //REAL_PLC_S13_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S13_P_ACT;   //REAL_PLC_S13_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S13_PERC_ACT;//REAL_PLC_S13_RD_PERC_ACT;
    fdbTags[4] = SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_S13;
    fdbTags[5] = SignalRService.tagList.FDB_S13_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S13_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S13_HL;   //BOOL_PLC_S13_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S13_HP;   //BOOL_PLC_S13_SOVRAPPRESSIONE_OK;
    fdbTags[8] = null;//SignalRService.tagList.FDB_S13_BOCCH;//BOOL_PLC_S13_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = SignalRService.tagList.FDB_S13_PRESSOSTATO_ACT;
    fdbTags[10] = null; //SignalRService.tagList.FDB_S13_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S13;//ok
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S13;//ok

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S13_PNT_VUOTO;      //REAL_PC_S13_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S13_PNT_GIUNTACONO; //REAL_PC_S13_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S13_PNT_PIENO;      //REAL_PC_S13_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S13_VOL_CONO;       //REAL_PC_S13_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S13_VOL_MAX;        //REAL_PC_S13_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S13_DENSITA;        //REAL_PC_S13_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S13_LENTO;  //INT_PC_RIF_INV_S13_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S13_VELOCE; //INT_PC_RIF_INV_S13_VELOCE;
    varieTags[8] = SignalRService.tagList.S13_VOLO;           //REAL_PC_S13_VOLO;
    varieTags[9] = SignalRService.tagList.S13_P_RALLENTAMENTO;//REAL_PC_S13_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S13_SOGLIA_HL;
    varieTags[11] = null;//SignalRService.tagList.REAL_PC_F013_SOGLIA_ALLARME;
    varieTags[12] = null;//SignalRService.tagList.PC_S13_MOD_SCUOTIPARETE;
    varieTags[13] = null; //SignalRService.tagList.PC_T_PAUSA_S4;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = null; //SignalRService.tagList.PC_T_LAVORO_S4;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S13 = new SiloModel("S13", "S13", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S13);

    // #endregion

    // #region S14

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S14;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S14_PNT_ACT; //REAL_PLC_S14_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S14_V_ACT;   //REAL_PLC_S14_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S14_P_ACT;   //REAL_PLC_S14_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S14_PERC_ACT;//REAL_PLC_S14_RD_PERC_ACT;
    fdbTags[4] = SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_S14;
    fdbTags[5] = SignalRService.tagList.FDB_S14_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S14_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S14_HL;   //BOOL_PLC_S14_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S14_HP;   //BOOL_PLC_S14_SOVRAPPRESSIONE_OK;
    fdbTags[8] = null;//SignalRService.tagList.FDB_S14_BOCCH;//BOOL_PLC_S14_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = SignalRService.tagList.FDB_S14_PRESSOSTATO_ACT;
    fdbTags[10] = null; //SignalRService.tagList.FDB_S14_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S14;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S14;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S14_PNT_VUOTO;      //REAL_PC_S14_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S14_PNT_GIUNTACONO; //REAL_PC_S14_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S14_PNT_PIENO;      //REAL_PC_S14_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S14_VOL_CONO;       //REAL_PC_S14_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S14_VOL_MAX;        //REAL_PC_S14_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S14_DENSITA;        //REAL_PC_S14_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S14_LENTO;  //INT_PC_RIF_INV_S14_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S14_VELOCE; //INT_PC_RIF_INV_S14_VELOCE;
    varieTags[8] = SignalRService.tagList.S14_VOLO;           //REAL_PC_S14_VOLO;
    varieTags[9] = SignalRService.tagList.S14_P_RALLENTAMENTO;//REAL_PC_S14_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S14_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F014_SOGLIA_ALLARME;
    varieTags[12] = null; //SignalRService.tagList.PC_S14_MOD_SCUOTIPARETE;
    varieTags[13] = null; //SignalRService.tagList.PC_T_PAUSA_S4;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = null; //SignalRService.tagList.PC_T_LAVORO_S4;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante
    this.S14 = new SiloModel("S14", "S14", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S14);

    // #endregion

    // #region S15

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S15;

      fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S15_PNT_ACT; //REAL_PLC_S15_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S15_V_ACT;   //REAL_PLC_S15_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S15_P_ACT;   //REAL_PLC_S15_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S15_PERC_ACT;//REAL_PLC_S15_RD_PERC_ACT;
    fdbTags[4] = SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_S15;
    fdbTags[5] = SignalRService.tagList.FDB_S15_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S15_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S15_HL;   //BOOL_PLC_S15_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S15_HP;   //BOOL_PLC_S15_SOVRAPPRESSIONE_OK;
    fdbTags[8] = null;//SignalRService.tagList.FDB_S15_BOCCH;//BOOL_PLC_S15_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = SignalRService.tagList.FDB_S15_PRESSOSTATO_ACT;
    fdbTags[10] = null; //SignalRService.tagList.FDB_S15_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S15;//ok
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S15;//ok

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S15_PNT_VUOTO;      //REAL_PC_S15_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S15_PNT_GIUNTACONO; //REAL_PC_S15_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S15_PNT_PIENO;      //REAL_PC_S15_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S15_VOL_CONO;       //REAL_PC_S15_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S15_VOL_MAX;        //REAL_PC_S15_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S15_DENSITA;        //REAL_PC_S15_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S15_LENTO;  //INT_PC_RIF_INV_S15_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S15_VELOCE; //INT_PC_RIF_INV_S15_VELOCE;
    varieTags[8] = SignalRService.tagList.S15_VOLO;           //REAL_PC_S15_VOLO;
    varieTags[9] = SignalRService.tagList.S15_P_RALLENTAMENTO;//REAL_PC_S15_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S15_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F015_SOGLIA_ALLARME;
    varieTags[12] = null; //SignalRService.tagList.PC_S15_MOD_SCUOTIPARETE;
    varieTags[13] = null; //SignalRService.tagList.PC_T_PAUSA_S4;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = null; //SignalRService.tagList.PC_T_LAVORO_S4;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante

    this.S15 = new SiloModel("S15", "S15", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S15);

    // #endregion    // #region S15

    // #region S16

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_S16;

    fdbTags = new Array(11);
    fdbTags[0] = SignalRService.tagList.FDB_S16_PNT_ACT; //REAL_PLC_S16_RD_VAL_ACT;
    fdbTags[1] = SignalRService.tagList.FDB_S16_V_ACT;   //REAL_PLC_S16_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_S16_P_ACT;   //REAL_PLC_S16_RD_PESO_ACT;
    fdbTags[3] = SignalRService.tagList.FDB_S16_PERC_ACT;//REAL_PLC_S16_RD_PERC_ACT;
    fdbTags[4] = SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_S16;
    fdbTags[5] = SignalRService.tagList.FDB_S16_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_S16_FC;
    fdbTags[6] = SignalRService.tagList.FDB_S16_HL;   //BOOL_PLC_S16_HL;
    fdbTags[7] = SignalRService.tagList.FDB_S16_HP;   //BOOL_PLC_S16_SOVRAPPRESSIONE_OK;
    fdbTags[8] = null;//SignalRService.tagList.FDB_S16_BOCCH;//BOOL_PLC_S16_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = SignalRService.tagList.FDB_S16_PRESSOSTATO_ACT;
    fdbTags[10] = null; //SignalRService.tagList.FDB_S16_STATO;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_S16;
    cmdTags[1] = SignalRService.tagList.PC_ABIL_CARICO_S16;

    varieTags = new Array(12);
    varieTags[0] = SignalRService.tagList.S16_PNT_VUOTO;      //REAL_PC_S16_RD_VAL_A_VUOTO;
    varieTags[1] = SignalRService.tagList.S16_PNT_GIUNTACONO; //REAL_PC_S16_RD_VAL_CONO_ALTO;
    varieTags[2] = SignalRService.tagList.S16_PNT_PIENO;      //REAL_PC_S16_RD_VAL_FILO_HHL;
    varieTags[3] = SignalRService.tagList.S16_VOL_CONO;       //REAL_PC_S16_RD_VOLUME_CONO_ALTO;
    varieTags[4] = SignalRService.tagList.S16_VOL_MAX;        //REAL_PC_S16_RD_VOLUME_FILO_HHL;
    varieTags[5] = SignalRService.tagList.S16_DENSITA;        //REAL_PC_S16_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_S16_LENTO;  //INT_PC_RIF_INV_S16_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_S16_VELOCE; //INT_PC_RIF_INV_S16_VELOCE;
    varieTags[8] = SignalRService.tagList.S16_VOLO;           //REAL_PC_S16_VOLO;
    varieTags[9] = SignalRService.tagList.S16_P_RALLENTAMENTO;//REAL_PC_S16_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_S16_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F016_SOGLIA_ALLARME;
    varieTags[12] = null; //SignalRService.tagList.PC_S16_MOD_SCUOTIPARETE;
    varieTags[13] = null; //SignalRService.tagList.PC_T_PAUSA_S4;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = null; //SignalRService.tagList.PC_T_LAVORO_S4;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante

    this.S16 = new SiloModel("S16", "S16", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.S16);

    // #endregion

    
    // #region TP6

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_TP6;

    fdbTags = new Array(11);
    fdbTags[0] = null; //SignalRService.tagList.FDB_TP6_PNT_ACT; //REAL_PLC_TP6_RD_VAL_ACT;
    fdbTags[1] = null; //SignalRService.tagList.FDB_TP6_V_ACT;   //REAL_PLC_TP6_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_TP6_P_ACT;   //REAL_PLC_TP6_RD_PESO_ACT;
    fdbTags[3] = null; //SignalRService.tagList.FDB_TP6_PERC_ACT;//REAL_PLC_TP6_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_TP6;
    fdbTags[5] = null; //SignalRService.tagList.FDB_TP6_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_TP6_FC;
    fdbTags[6] = null; //SignalRService.tagList.FDB_TP6_HL;   //BOOL_PLC_TP6_HL;
    fdbTags[7] = null; //SignalRService.tagList.FDB_TP6_HP;   //BOOL_PLC_TP6_SOVRAPPRESSIONE_OK;
    fdbTags[8] = null; //SignalRService.tagList.FDB_TP6_BOCCH;//BOOL_PLC_TP6_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = null; //SignalRService.tagList.REAL_PLC_F016_PRESS_ACT;
    fdbTags[10] = null;//SignalRService.tagList.INT_FDB_STATO_CARICO_TP6;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_TP6;
    cmdTags[1] = null; //SignalRService.tagList.PC_ABIL_CARICO_TP6;

    varieTags = new Array(12);
    varieTags[0] = null; //SignalRService.tagList.TP6_PNT_VUOTO;      //REAL_PC_TP6_RD_VAL_A_VUOTO;
    varieTags[1] = null; //SignalRService.tagList.TP6_PNT_GIUNTACONO; //REAL_PC_TP6_RD_VAL_CONO_ALTO;
    varieTags[2] = null; //SignalRService.tagList.TP6_PNT_PIENO;      //REAL_PC_TP6_RD_VAL_FILO_HHL;
    varieTags[3] = null; //SignalRService.tagList.TP6_VOL_CONO;       //REAL_PC_TP6_RD_VOLUME_CONO_ALTO;
    varieTags[4] = null; //SignalRService.tagList.TP6_VOL_MAX;        //REAL_PC_TP6_RD_VOLUME_FILO_HHL;
    varieTags[5] = null; //SignalRService.tagList.TP6_DENSITA;        //REAL_PC_TP6_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_TP6_LENTO;  //INT_PC_RIF_INV_TP6_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_TP6_VELOCE; //INT_PC_RIF_INV_TP6_VELOCE;
    varieTags[8] = SignalRService.tagList.TP6_VOLO;           //REAL_PC_TP6_VOLO;
    varieTags[9] = SignalRService.tagList.TP6_P_RALLENTAMENTO;//REAL_PC_TP6_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_TP6_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F016_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_TP6_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_TP6;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_TP6;    // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante

    this.TP6 = new SiloModel("TP6", "TP6", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.TP6);

     // #endregion

    // #region TP6A

    almTags = new Array(1);
    almTags[0] = null;//SignalRService.tagList.BOOL_PLC_FDB_ALM_RD_TP6A;

    fdbTags = new Array(11);
    fdbTags[0] = null; //SignalRService.tagList.FDB_TP6A_PNT_ACT; //REAL_PLC_TP6A_RD_VAL_ACT;
    fdbTags[1] = null; //SignalRService.tagList.FDB_TP6A_V_ACT;   //REAL_PLC_TP6A_RD_VOLUME_ACT;
    fdbTags[2] = SignalRService.tagList.FDB_TP6A_P_ACT;   //REAL_PLC_TP6A_RD_PESO_ACT;
    fdbTags[3] = null; //SignalRService.tagList.FDB_TP6A_PERC_ACT;//REAL_PLC_TP6A_RD_PERC_ACT;
    fdbTags[4] = null; //SignalRService.tagList.FDB_FDB_CD_T_NUOVO_CARICO_TP6A;
    fdbTags[5] = null; //SignalRService.tagList.FDB_TP6A_PRESSOSTATO_ACT;
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_TP6A_FC;
    fdbTags[6] = null; //SignalRService.tagList.FDB_TP6A_HL;   //BOOL_PLC_TP6A_HL;
    fdbTags[7] = null; //SignalRService.tagList.FDB_TP6A_HP;   //BOOL_PLC_TP6A_SOVRAPPRESSIONE_OK;
    fdbTags[8] = null; //SignalRService.tagList.FDB_TP6A_BOCCH;//BOOL_PLC_TP6A_BOCCHETTONE_IMPEGNATO;
    fdbTags[9] = null;//SignalRService.tagList.REAL_PLC_F016_PRESS_ACT;
    fdbTags[10] = null;//SignalRService.tagList.INT_FDB_STATO_CARICO_TP6A;

    cmdTags = new Array(2);
    cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_INCLUDI_TP6A;
    cmdTags[1] = null; //SignalRService.tagList.PC_ABIL_CARICO_TP6A;

    varieTags = new Array(12);
    varieTags[0] = null; //SignalRService.tagList.TP6A_PNT_VUOTO;      //REAL_PC_TP6A_RD_VAL_A_VUOTO;
    varieTags[1] = null; //SignalRService.tagList.TP6A_PNT_GIUNTACONO; //REAL_PC_TP6A_RD_VAL_CONO_ALTO;
    varieTags[2] = null; //SignalRService.tagList.TP6A_PNT_PIENO;      //REAL_PC_TP6A_RD_VAL_FILO_HHL;
    varieTags[3] = null; //SignalRService.tagList.TP6A_VOL_CONO;       //REAL_PC_TP6A_RD_VOLUME_CONO_ALTO;
    varieTags[4] = null; //SignalRService.tagList.TP6A_VOL_MAX;        //REAL_PC_TP6A_RD_VOLUME_FILO_HHL;
    varieTags[5] = null; //SignalRService.tagList.TP6A_DENSITA;        //REAL_PC_TP6A_DENSITA;
    varieTags[6] = SignalRService.tagList.RIF_INV_TP6A_LENTO;  //INT_PC_RIF_INV_TP6A_LENTO;
    varieTags[7] = SignalRService.tagList.RIF_INV_TP6A_VELOCE; //INT_PC_RIF_INV_TP6A_VELOCE;
    varieTags[8] = SignalRService.tagList.TP6A_VOLO;           //REAL_PC_TP6A_VOLO;
    varieTags[9] = SignalRService.tagList.TP6A_P_RALLENTAMENTO;//REAL_PC_TP6A_P_RALLENTAMENTO;
    varieTags[10] = null;//SignalRService.tagList.REAL_PC_TP6A_SOGLIA_HL;
    varieTags[11] = null; //SignalRService.tagList.REAL_PC_F016_SOGLIA_ALLARME;
    varieTags[12] = SignalRService.tagList.PC_TP6A_MOD_SCUOTIPARETE;
    varieTags[13] = SignalRService.tagList.PC_T_PAUSA_TP6A;    // pausa/lavoro, tempo di pausa, in secondi - fondo vibrante
    varieTags[14] = SignalRService.tagList.PC_T_LAVORO_TP6A;   // pausa/lavoro, tempo di lavoro, in secondi - fondo vibrante

    this.TP6A = new SiloModel("TP6A", "TP6A", almTags, fdbTags, cmdTags, varieTags); this.silos.push(this.TP6A);

    // #endregion

  }

}
