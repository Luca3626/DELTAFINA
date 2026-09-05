import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient } from 'src/app/tags/tags-client';
import { ScaleModel } from './scale.models';

export class ScaleList {

  scales: Array<ScaleModel> = new Array<ScaleModel>();

  public B1: ScaleModel;
  public B2: ScaleModel;
  public B3: ScaleModel;
  public B3A: ScaleModel;
  public B4: ScaleModel;
  public B5: ScaleModel;
  public B5A: ScaleModel;
  public B6: ScaleModel;
  public B7: ScaleModel;

  constructor() {

    let almTags, fdbTags, cmdTags, varieTags: TagsClient[];

    //// #region B1
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B1;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B1;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B1;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B1;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B1;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B1;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B1;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B1;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B1;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B1;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B1;                 // cumulativo allarme derivato dalla comunicazione
    

    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B1;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B1;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B1;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B1_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B1;           // fuori zero in kg
    

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B1   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B1;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B1;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B1;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B1;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B1;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B1;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = SignalRService.tagList.B1_V_HIGH;                // Alta velocità estrazione
    //varieTags[7] = SignalRService.tagList.B1_V_LOW;                 // Bassa velocità estrazione
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B1; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B1;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B1         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                            // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi

    //this.B1 = new ScaleModel("B1", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B1); this.scales.push(this.B1);
    //// #endregion

    //// #region B2
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B2;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B2;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B2;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B2;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B2;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B2;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B2;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B2;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B2;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B2;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B2;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B2;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B2;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B2;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B2_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B2;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B2   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B2;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B2;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B2;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B2;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B2;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B2;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = null; // SET_RIF_INV_LENTO
    //varieTags[7] = null; // SET_RIF_INV_VELOCE
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B2; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B2;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B2         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                            // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi

    //this.B2 = new ScaleModel("B2", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B2); this.scales.push(this.B2);
    //// #endregion

    //// #region B3
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B3;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B3;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B3;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B3;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B3;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B3;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B3;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B3;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B3;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B3;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B3;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B3;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B3;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B3;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B3_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B3;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B3   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B3;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B3;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B3;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B3;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B3;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B3;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = null; // SET_RIF_INV_LENTO
    //varieTags[7] = null; // SET_RIF_INV_VELOCE
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B3; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B3;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B3         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                            // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi

    //this.B3 = new ScaleModel("B3", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B3); this.scales.push(this.B3);
    //// #endregion

    //// #region B3A
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B3A;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B3A;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B3A;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B3A;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B3A;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B3A;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B3A;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B3A;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B3A;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B3A;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B3A;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B3A;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B3A;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B3A;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B3A_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B3A;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B3A   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B3A;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B3A;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B3A;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B3A;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B3A;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B3A;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = null; // SET_RIF_INV_LENTO
    //varieTags[7] = null; // SET_RIF_INV_VELOCE
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B3A; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B3A;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B3A         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                             // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                  // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                  // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                  // 10:fine pesate e scarichi

    //this.B3A = new ScaleModel("B3A", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B3A); this.scales.push(this.B3A);
    //// #endregion

    //// #region B4
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B4;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B4;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B4;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B4;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B4;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B4;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B4;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B4;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B4;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B4;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B4;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B4;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B4;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B4;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B4_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B4;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B4   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B4;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B4;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B4;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B4;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B4;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B4;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = SignalRService.tagList.B4_V_HIGH;                // Alta velocità estrazione
    //varieTags[7] = SignalRService.tagList.B4_V_LOW;                 // Bassa velocità estrazione
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B4; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B1;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B4         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                            // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi

    //this.B4 = new ScaleModel("B4", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B4); this.scales.push(this.B4);
    //// #endregion

    //// #region B5
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B5;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B5;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B5;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B5;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B5;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B5;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B5;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B5;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B5;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B5;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B5;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B5;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B5;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B5;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B5_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B5;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B5   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B5;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B5;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B5;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B5;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B5;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B5;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = null; // SET_RIF_INV_LENTO
    //varieTags[7] = null; // SET_RIF_INV_VELOCE
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B5; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B5;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B5         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                            // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi

    //this.B5 = new ScaleModel("B5", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B5); this.scales.push(this.B5);
    //// #endregion

    //// #region B5A
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B5A;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B5A;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B5A;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B5A;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B5A;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B5A;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B5A;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B5A;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B5A;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B5A;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B5A;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B5A;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B5A;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B5A;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B5A_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B5A;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B5A   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B5A;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B5A;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B5A;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B5A;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B5A;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B5A;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = null; // SET_RIF_INV_LENTO
    //varieTags[7] = null; // SET_RIF_INV_VELOCE
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B5A; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B5A;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B5A         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                             // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                  // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                  // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                  // 10:fine pesate e scarichi

    //this.B5A = new ScaleModel("B5A", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B5A); this.scales.push(this.B5A);
    //// #endregion

    //// #region B6
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B6;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B6;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B6;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B6;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B6;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B6;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B6;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B6;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B6;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B6;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B6;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B6;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B6;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B6;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B6_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B6;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B6   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B6;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B6;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B6;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B6;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B6;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B6;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = null; // SET_RIF_INV_LENTO
    //varieTags[7] = null; // SET_RIF_INV_VELOCE
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B6; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B6;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B6         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = null;                                            // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi

    //this.B6 = new ScaleModel("B6", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B6); this.scales.push(this.B6);
    //// #endregion

    //// #region B7
    //almTags = new Array(17)
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B7;    // per hmi, allarme tempo massimo carico bilancia
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B7;   // per hmi, allarme tempo massimo scarico bilancia
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_B7;            // allarme comunicazione
    //almTags[3] = null; //ALM_UNDER_LOAD
    //almTags[4] = null; //ALM_OVER_LOAD
    //almTags[5] = null; //ALM_ERRORE_PESO
    //almTags[6] = null; //ALM_NON_TARATO
    //almTags[7] = null; //ALM_FUNZIONE_DI_HOLD_ATTIVA
    //almTags[8] = null; //ALM_SETUP_IN_CORSO
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B7;       // per hmi, allarme bilancia non a zero per nuovo dosaggio
    //almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_B7;            // bit 0 - errore cella
    //almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_B7;            // bit 1 - avaria del convertitore AD
    //almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_B7;            // bit 2 - peso massimo superato di 9 divisioni
    //almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_B7;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    //almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_B7;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    //almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_B7;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999  
    //almTags[16] = SignalRService.tagList.FDB_ALM_B7;                 // cumulativo allarme derivato dalla comunicazione


    //fdbTags = new Array(5);
    //fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_B7;               // peso attuale in kg
    //fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_B7;            // riempimento percentuale rispetto peso massimo
    //fdbTags[2] = SignalRService.tagList.FDB_CD_ATTESA_SCARICO_B7;   // Countdown attesa scarico
    //fdbTags[3] = SignalRService.tagList.FDB_B7_PesoLordo;           // a pc, peso lordo bilancia
    //fdbTags[4] = null;//SignalRService.tagList.FDB_FZ_B7;                  // fuori zero in kg


    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B7   // Da pulsante. Comanda l'invia di un nuovo stato

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.PC_ODC_B7;                // ordine di carico 
    //varieTags[1] = SignalRService.tagList.PC_MOD_SP_B7;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento
    //varieTags[2] = SignalRService.tagList.PC_T_MAX_CARICO_B7;       // in s, tempo massimo carico tutti i componenti
    //varieTags[3] = SignalRService.tagList.PC_T_MAX_SCARICO_B7;      // in s, tempo massimo scarico tutti i componenti
    //varieTags[4] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B7;   // in s, tempo di sgocciolamento   
    //varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B7;   // Tempo da attendere per poter liberare la bilancia
    //varieTags[6] = SignalRService.tagList.B7_V_HIGH;                // Alta velocità estrazione
    //varieTags[7] = SignalRService.tagList.B7_V_LOW;                 // Bassa velocità estrazione
    //varieTags[8] = null; // SET_PESO_MASSIMO
    //varieTags[9] = SignalRService.tagList.FZ_B7; // SET_FUORI_ZERO
    //varieTags[10] = null; // SET_VOLO
    //varieTags[11] = null; // SET_P_RALLENTAMENTO
    //varieTags[12] = SignalRService.tagList.CAP_MAX_B7;
    //varieTags[13] = SignalRService.tagList.PC_NUOVO_STATO_B7         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
    //varieTags[14] = SignalRService.tagList.PC_ACQUA_IN_B7;           // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
    //                                                                 // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
    //                                                                 // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
    //                                                                 // 10:fine pesate e scarichi


    //this.B7 = new ScaleModel("B7", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B7); this.scales.push(this.B7);
    //// #endregion








    /*

    // #region B2
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B2;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B2;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B2;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B2;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B2;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B2;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B2;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B2;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B2;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B2;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B2;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B2_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B2;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B2;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B2;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B2;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B2   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B2;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B2;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B2;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B2;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B2;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B2;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B2         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                    // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                    // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                    // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                    // 10:fine pesate e scarichi

    this.B2 = new ScaleModel("B2", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B2); this.scales.push(this.B2);
    // #endregion

    // #region B3
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B3;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B3;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B3;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B3;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B3;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B3;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B3;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B3;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B3;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B3;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B3;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B3_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B3;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B3;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B3;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B3;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B3   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B3;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B3;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B3;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B3;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B3;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B3;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B3         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                    // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                    // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                    // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                    // 10:fine pesate e scarichi

    this.B3 = new ScaleModel("B3", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B3); this.scales.push(this.B3);
    // #endregion

    // #region B3A
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B3A;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B3A;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B3A;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B3A;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B3A;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B3A;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B3A;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B3A;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B3A;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B3A;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B3A;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B3A_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B3A;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B3A;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B3A;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B3A;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B3A   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B3A;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B3A;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B3A;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B3A;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B3A;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B3A;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B3A         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                     // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                     // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                     // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                     // 10:fine pesate e scarichi

    this.B3A = new ScaleModel("B3A", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B3A); this.scales.push(this.B3A);
    // #endregion

    // #region B4
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B4;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B4;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B4;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B4;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B4;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B4;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B4;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B4;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B4;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B4;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B4;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B4_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B4;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B4;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B4;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B4;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B4   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B4;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B4;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B4;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B4;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B4;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B4;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B4         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                    // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                    // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                    // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                    // 10:fine pesate e scarichi

    this.B4 = new ScaleModel("B4", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B4); this.scales.push(this.B4);
    // #endregion

    // #region B5
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B5;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B5;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B5;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B5;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B5;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B5;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B5;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B5;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B5;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B5;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B5;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B5_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B5;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B5;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B5;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B5;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B5   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B5;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B5;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B5;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B5;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B5;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B5;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B5         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                    // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                    // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                    // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                    // 10:fine pesate e scarichi

    this.B5 = new ScaleModel("B5", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B5); this.scales.push(this.B5);
    // #endregion

    // #region B5A
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B5A;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B5A;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B5A;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B5A;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B5A;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B5A;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B5A;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B5A;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B5A;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B5A;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B5A;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B5A_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B5A;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B5A;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B5A;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B5A;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B5A   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B5A;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B5A;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B5A;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B5A;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B5A;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B5A;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B5A         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                     // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                     // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                     // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                     // 10:fine pesate e scarichi

    this.B5A = new ScaleModel("B5A", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B5A); this.scales.push(this.B5A);
    // #endregion

    // #region B6
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B6;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B6;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B6;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B6;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B6;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B6;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B6;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B6;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B6;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B6;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B6;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B6_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B6;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B6;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B6;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B6;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B6   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B6;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B6;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B6;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B6;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B6;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B6;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B6         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                    // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                    // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                    // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                    // 10:fine pesate e scarichi

    this.B6 = new ScaleModel("B6", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B6); this.scales.push(this.B6);
    // #endregion

    // #region B7
    almTags = new Array(17)
    almTags[0] = SignalRService.tagList.FDB_ALM_BIT0_B7;            // bit 0 - errore cella
    almTags[1] = SignalRService.tagList.FDB_ALM_BIT1_B7;            // bit 1 - avaria del convertitore AD
    almTags[2] = SignalRService.tagList.FDB_ALM_BIT2_B7;            // bit 2 - peso massimo superato di 9 divisioni
    almTags[3] = SignalRService.tagList.FDB_ALM_BIT3_B7;            // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[4] = SignalRService.tagList.FDB_ALM_BIT4_B7;            // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[5] = SignalRService.tagList.FDB_ALM_BIT5_B7;            // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[6] = SignalRService.tagList.FDB_ALM_COMM_B7;            // allarme comunicazione
    almTags[7] = SignalRService.tagList.FDB_ALM_B7;                 // cumulativo allarme derivato dalla comunicazione
    almTags[8] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B7;    // per hmi, allarme tempo massimo carico bilancia
    almTags[9] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B7;   // per hmi, allarme tempo massimo scarico bilancia
    almTags[10] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B7;     // per hmi, allarme bilancia non a zero per nuovo dosaggio

    fdbTags = new Array(5);
    fdbTags[0] = SignalRService.tagList.FDB_B7_PesoLordo;           // a pc, peso lordo bilancia
    fdbTags[1] = SignalRService.tagList.FDB_Q_ACT_B7;               // peso attuale in kg
    fdbTags[2] = SignalRService.tagList.FDB_FZ_B7;                  // fuori zero in kg
    fdbTags[3] = SignalRService.tagList.FDB_PERC_ACT_B7;            // riempimento percentuale rispetto peso massimo
    fdbTags[4] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B7;     // Countdown attesa scarico

    cmdTags = new Array(1);
    cmdTags[0] = SignalRService.tagList.PC_COMANDA_NUOVO_STATO_B7   // Da pulsante. Comanda l'invia di un nuovo stato

    varieTags = new Array(7);
    varieTags[0] = SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B7;   // in s, tempo di sgocciolamento
    varieTags[1] = SignalRService.tagList.PC_T_MAX_CARICO_B7;       // in s, tempo massimo carico tutti i componenti
    varieTags[2] = SignalRService.tagList.PC_T_MAX_SCARICO_B7;      // in s, tempo massimo scarico tutti i componenti
    varieTags[3] = SignalRService.tagList.PC_T_ATTESA_SCARICO_B7;   // Tempo da attendere per poter liberare la bilancia
    varieTags[4] = SignalRService.tagList.PC_MOD_SP_B7;             // modalita scuoti parete: 0=Escluso,1=SempreOn,2=Con allarme di scaricamento,3=durante lo sgocciolamento  
    varieTags[5] = SignalRService.tagList.PC_ODC_B7;                // ordine di carico 
    varieTags[6] = SignalRService.tagList.PC_NUOVO_STATO_B7         // 0)nop; 1)pesata da miscelare: carico; 2)pesata da miscelare: carico completato, attesa scarico; 3)pesata
                                                                    // da miscelare: scarico; 4:pesata da miscelare: scarico completato, verifiche numero ripetizioni; 5)pesata
                                                                    // da non miscelare: carico; 6)pesata da non miscelare: carico completato, attesa scarico;  7)pesata da non
                                                                    // miscelare: scarico; 8)pesata da non miscelare: scarico completato, verifiche numero ripetizioni; 9)riserva
                                                                    // 10:fine pesate e scarichi

    this.B7 = new ScaleModel("B7", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.FDB_STATO_B7); this.scales.push(this.B7);
    // #endregion


*/



    //***************************************************************************************************************************************************************************
    //***************************************************************************************************************************************************************************
    //***************************************************************************************************************************************************************************





    // VECCHIA IMPLEMENTAZIONE DELLE BILANCE IN VPC_FORNO 2

    //// #region B1A

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B1A; // ✔
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B1A; // ✔
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B1A; // ✔
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B1A;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B1A;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B1A;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B1A;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B1A;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B1A;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B1A; // ✔

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B1A_PESO_ACT;  // ✔
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B1A_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B1A;  // ✔

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B1A;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B1A;  // ✔
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B1A; // ✔
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B1A; // ✔
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B1A; // ✔
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B1A; // ✔
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B1A; // ✔
    //varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_B1A_LENTO;
    //varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_B1A_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B1A_PESO_MASSIMO;
    //varieTags[9] = SignalRService.tagList.REAL_PC_B1A_FUORI_ZERO;   
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B1A;  // ✔

    //this.B1A = new ScaleModel("B1A", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B1A); this.scales.push(this.B1A);

    //// #endregion

    //// #region B1B

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B1B;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B1B;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B1B;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B1B;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B1B;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B1B;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B1B;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B1B;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B1B;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B1B;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B1B_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B1B_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B1B;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B1B;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B1B;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B1B;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B1B;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B1B;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B1B;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B1B;//ok
    //varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_B1B_LENTO;//ok
    //varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_B1B_VELOCE;//ok
    //varieTags[8] = SignalRService.tagList.REAL_PC_B1B_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B1B_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B1B;

    //this.B1B = new ScaleModel("B1B", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B1B); this.scales.push(this.B1B);

    //// #endregion

    //// #region B2

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B2;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B2;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B2;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B2;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B2;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B2;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B2;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B2;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B2;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B2;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B2_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B2_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B2;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B2;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B2;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B2;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B2;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B2;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B2;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B2;//ok
    //varieTags[6] = null;//SignalRService.tagList.INT_PC_RIF_INV_B2_LENTO;
    //varieTags[7] = null;//SignalRService.tagList.INT_PC_RIF_INV_B2_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B2_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B2_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B2;

    //this.B2 = new ScaleModel("B2", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B2); this.scales.push(this.B2);

    //// #endregion

    //// #region B3

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B3;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B3;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B3;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B3;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B3;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B3;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B3;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B3;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B3;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B3;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B3_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B3_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B3;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B3;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B3;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B3;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B3;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B3;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B3;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B3;//ok
    //varieTags[6] = null;//SignalRService.tagList.INT_PC_RIF_INV_B3_LENTO;
    //varieTags[7] = null;//SignalRService.tagList.INT_PC_RIF_INV_B3_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B3_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B3_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B3;

    //this.B3 = new ScaleModel("B3", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B3); this.scales.push(this.B3);

    //// #endregion

    //// #region B5A

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B5A;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B5A;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B5A;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B5A;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B5A;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B5A;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B5A;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B5A;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B5A;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B5A;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B5A_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B5A_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B5A;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B5A;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B5A;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B5A;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B5A;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B5A;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B5A;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B5A;//ok
    //varieTags[6] = null;//SignalRService.tagList.INT_PC_RIF_INV_B5A_LENTO;
    //varieTags[7] = null;//SignalRService.tagList.INT_PC_RIF_INV_B5A_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B5A_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B5A_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B5A;

    //this.B5A = new ScaleModel("B5A", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B5A); this.scales.push(this.B5A);

    //// #endregion

    //// #region B5B

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B5B;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B5B;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B5B;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B5B;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B5B;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B5B;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B5B;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B5B;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B5B;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B5B;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B5B_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B5B_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B5B;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B5B;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B5B;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B5B;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B5B;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B5B;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B5B;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B5B;//ok
    //varieTags[6] = null;//SignalRService.tagList.INT_PC_RIF_INV_B5B_LENTO;
    //varieTags[7] = null;//SignalRService.tagList.INT_PC_RIF_INV_B5B_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B5B_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B5B_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B5B;

    //this.B5B = new ScaleModel("B5B", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B5B); this.scales.push(this.B5B);

    //// #endregion

    //// #region B6

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B6;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B6;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B6;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B6;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B6;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B6;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B6;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B6;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B6;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B6;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B6_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B6_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B6;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B6;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B6;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B6;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B6;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B6;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B6;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B6;//ok
    //varieTags[6] = null;//SignalRService.tagList.INT_PC_RIF_INV_B6_LENTO;
    //varieTags[7] = null;//SignalRService.tagList.INT_PC_RIF_INV_B6_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B6_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B6_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B6;

    //this.B6 = new ScaleModel("B6", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B6); this.scales.push(this.B6);

    //// #endregion

    //// #region B4

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B4;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B4;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B4;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B4;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B4;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B4;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B4;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B4;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B4;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B4;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B4_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B4_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B4;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B4;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B4;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B4;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B4;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B4;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B4;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B4;//ok
    //varieTags[6] = null;//SignalRService.tagList.INT_PC_RIF_INV_B4_LENTO;
    //varieTags[7] = null;//SignalRService.tagList.INT_PC_RIF_INV_B4_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_B4_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B4_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B4;

    //this.B4 = new ScaleModel("B4", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B4); this.scales.push(this.B4);

    //// #endregion

    //// #region B7

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_B7;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_B7;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_B7;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_B7;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_B7;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_B7;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_B7;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_B7;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_B7;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_B7;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_B7_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_B7_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_B7;

    //cmdTags = new Array(1);
    //cmdTags[0] = SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_B7;//ok

    //varieTags = new Array(15);
    //varieTags[0] = SignalRService.tagList.DINT_PC_ODC_B7;//ok
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_B7;//ok
    //varieTags[2] = SignalRService.tagList.INT_PC_T_MAX_CARICO_B7;//ok
    //varieTags[3] = SignalRService.tagList.INT_PC_T_MAX_SCARICO_B7;//ok
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_B7;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_B7;//ok
    //varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_B7_LENTO;//ok
    //varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_B7_VELOCE;//ok
    //varieTags[8] = SignalRService.tagList.REAL_PC_B7_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_B7_FUORI_ZERO;//ok
    //varieTags[10] = SignalRService.tagList.INT_PC_NUOVO_STATO_B7;

    //this.B7 = new ScaleModel("B7", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, SignalRService.tagList.INT_PLC_STATO_B7); this.scales.push(this.B7);

    //// #endregion

    ////// #region R1

    ////almTags = new Array(10);
    ////almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_R1;
    ////almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_R1;
    ////almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_R1;
    ////almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_R1;
    ////almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_R1;
    ////almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_R1;
    ////almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_R1;
    ////almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_R1;
    ////almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_R1;
    ////almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_R1;

    ////fdbTags = new Array(3);
    ////fdbTags[0] = SignalRService.tagList.REAL_PLC_R1_PESO_ACT;
    ////fdbTags[1] = SignalRService.tagList.REAL_PLC_R1_PERC_ACT;
    ////fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_R1R2;

    ////cmdTags = new Array(1);
    ////cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_R1;

    ////varieTags = new Array(15);
    ////varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_R1;
    ////varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_R1;//ok
    ////varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_R1;
    ////varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_R1;
    ////varieTags[4] = null; //SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_R1;
    ////varieTags[5] = null; //SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_R1;
    ////varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_R1_LENTO;//ok
    ////varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_R1_VELOCE;//ok
    ////varieTags[8] = SignalRService.tagList.REAL_PC_R1_PESO_MASSIMO;//ok
    ////varieTags[9] = SignalRService.tagList.REAL_PC_R1_FUORI_ZERO;//ok
    ////varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_R1;

    ////this.R1 = new ScaleModel("R1", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.R1); //SignalRService.tagList.INT_PLC_STATO_R1

    ////// #endregion

    ////// #region R2

    ////almTags = new Array(10);
    ////almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_R2;
    ////almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_R2;
    ////almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_R2;
    ////almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_R2;
    ////almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_R2;
    ////almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_R2;
    ////almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_R2;
    ////almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_R2;
    ////almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_R2;
    ////almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_R2;

    ////fdbTags = new Array(3);
    ////fdbTags[0] = SignalRService.tagList.REAL_PLC_R2_PESO_ACT;
    ////fdbTags[1] = SignalRService.tagList.REAL_PLC_R2_PERC_ACT;
    ////fdbTags[2] = null; //SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_R2;

    ////cmdTags = new Array(1);
    ////cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_R2;

    ////varieTags = new Array(15);
    ////varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_R2;
    ////varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_R2;//ok
    ////varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_R2;
    ////varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_R2;
    ////varieTags[4] = null; //SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_R2;
    ////varieTags[5] = null; //SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_R2;
    ////varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_R2_LENTO;//ok
    ////varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_R2_VELOCE;//ok
    ////varieTags[8] = SignalRService.tagList.REAL_PC_R2_PESO_MASSIMO;//ok
    ////varieTags[9] = SignalRService.tagList.REAL_PC_R2_FUORI_ZERO;//ok
    ////varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_R2;

    ////this.R2 = new ScaleModel("R2", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.R2); //SignalRService.tagList.INT_PLC_STATO_R2

    ////// #endregion

    //// #region TF1

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TF1;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TF1;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_TF1;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TF1;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TF1;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TF1;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TF1;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TF1;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TF1;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_TF1;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_TF1_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_TF1_PERC_ACT;
    //fdbTags[2] = null; //SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TF1;

    //cmdTags = new Array(1);
    //cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_TF1;

    //varieTags = new Array(15);
    //varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_TF1;
    //varieTags[1] = null; //SignalRService.tagList.INT_PC_MOD_SP_TF1;
    //varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_TF1;
    //varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_TF1;
    //varieTags[4] = null; //SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TF1;
    //varieTags[5] = null; //SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TF1;
    //varieTags[6] = null; //SignalRService.tagList.INT_PC_RIF_INV_TF1_LENTO;
    //varieTags[7] = null; //ignalRService.tagList.INT_PC_RIF_INV_TF1_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_TF1_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_TF1_FUORI_ZERO;//ok
    //varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_TF1;

    //this.TF1 = new ScaleModel("TF1", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.TF1); //SignalRService.tagList.INT_PLC_STATO_TF1

    //// #endregion

    //// #region TF2

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TF2;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TF2;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_TF2;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TF2;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TF2;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TF2;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TF2;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TF2;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TF2;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_TF2;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_TF2_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_TF2_PERC_ACT;
    //fdbTags[2] = null; //SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TF2;

    //cmdTags = new Array(1);
    //cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_TF2;//ok

    //varieTags = new Array(15);
    //varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_TF2;
    //varieTags[1] = null; //SignalRService.tagList.INT_PC_MOD_SP_TF2;
    //varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_TF2;
    //varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_TF2;
    //varieTags[4] = null; //SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TF2;
    //varieTags[5] = null; //SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TF2;
    //varieTags[6] = null; //SignalRService.tagList.INT_PC_RIF_INV_TF2_LENTO;
    //varieTags[7] = null; //SignalRService.tagList.INT_PC_RIF_INV_TF2_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_TF2_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_TF2_FUORI_ZERO;//ok
    //varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_TF2;

    //this.TF2 = new ScaleModel("TF2", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.TF2); //SignalRService.tagList.INT_PLC_STATO_TF2

    //// #endregion

    ////// #region TR1

    ////almTags = new Array(10);
    ////almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TR1;
    ////almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TR1;
    ////almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_TR1;
    ////almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TR1;
    ////almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TR1;
    ////almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TR1;
    ////almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TR1;
    ////almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TR1;
    ////almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TR1;
    ////almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_TR1;

    ////fdbTags = new Array(3);
    ////fdbTags[0] = SignalRService.tagList.REAL_PLC_TR1_PESO_ACT;
    ////fdbTags[1] = SignalRService.tagList.REAL_PLC_TR1_PERC_ACT;
    ////fdbTags[2] = null; //SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TR1;

    ////cmdTags = new Array(1);
    ////cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_TR1;

    ////varieTags = new Array(15);
    ////varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_TR1;
    ////varieTags[1] = null; //ignalRService.tagList.INT_PC_MOD_SP_TR1;
    ////varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_TR1;
    ////varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_TR1;
    ////varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TR1;//ok
    ////varieTags[5] = null; //SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TR1;
    ////varieTags[6] = null; //SignalRService.tagList.INT_PC_RIF_INV_TR1_LENTO;
    ////varieTags[7] = null; //SignalRService.tagList.INT_PC_RIF_INV_TR1_VELOCE;
    ////varieTags[8] = SignalRService.tagList.REAL_PC_TR1_PESO_MASSIMO;//ok
    ////varieTags[9] = SignalRService.tagList.REAL_PC_TR1_FUORI_ZERO;//ok
    ////varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_TR1;

    ////this.TR1 = new ScaleModel("TR1", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.TR1);  //SignalRService.tagList.INT_PLC_STATO_TR1

    ////// #endregion

    //// #region TM1

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TM1;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TM1;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_TM1;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TM1;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TM1;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TM1;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TM1;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TM1;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TM1;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_TM1;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_TM1_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_TM1_PERC_ACT;
    //fdbTags[2] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TM1;

    //cmdTags = new Array(1);
    //cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_TM1;

    //varieTags = new Array(15);
    //varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_TM1;
    //varieTags[1] = SignalRService.tagList.INT_PC_MOD_SP_TM1;//ok
    //varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_TM1;
    //varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_TM1;
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TM1;//ok
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TM1;//ok
    //varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_TM1_LENTO;//ok
    //varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_TM1_VELOCE;//ok
    //varieTags[8] = SignalRService.tagList.REAL_PC_TM1_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_TM1_FUORI_ZERO;//ok
    //varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_TM1;

    //this.TM1 = new ScaleModel("TM1", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.TM1); //SignalRService.tagList.INT_PLC_STATO_TM1

    //// #endregion

    //// #region VB_GRF1_AM65

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_VB_GRF1_AM65;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_VB_GRF1_AM65;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_VB_GRF1_AM65;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_VB_GRF1_AM65;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_VB_GRF1_AM65;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_VB_GRF1_AM65;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_VB_GRF1_AM65;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_VB_GRF1_AM65;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_VB_GRF1_AM65;
    //almTags[9] = SignalRService.tagList.FDB_ALM_NON_A_ZERO_VB_GRF1_AM65;

    //fdbTags = new Array(3);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_VB_GRF1_AM65_PESO_ACT;
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_VB_GRF1_AM65_PERC_ACT;
    //fdbTags[2] = null; //SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_VB_GRF1_AM65;

    //cmdTags = new Array(1);
    //cmdTags[0] = null; //SignalRService.tagList.BOOL_PC_COMANDA_NUOVO_STATO_VB_GRF1_AM65;

    //varieTags = new Array(13);
    //varieTags[0] = null; //SignalRService.tagList.DINT_PC_ODC_VB_GRF1_AM65;
    //varieTags[1] = null; //SignalRService.tagList.INT_PC_MOD_SP_VB_GRF1_AM65;
    //varieTags[2] = null; //SignalRService.tagList.INT_PC_T_MAX_CARICO_VB_GRF1_AM65;
    //varieTags[3] = null; //SignalRService.tagList.INT_PC_T_MAX_SCARICO_VB_GRF1_AM65;
    //varieTags[4] = null; //SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_VB_GRF1_AM65;
    //varieTags[5] = null; //SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_VB_GRF1_AM65;
    //varieTags[6] = SignalRService.tagList.INT_PC_RIF_INV_GRF1_LENTO;
    //varieTags[7] = SignalRService.tagList.INT_PC_RIF_INV_GRF1_VELOCE;
    //varieTags[8] = SignalRService.tagList.REAL_PC_VB_GRF1_AM65_PESO_MASSIMO;//ok
    //varieTags[9] = SignalRService.tagList.REAL_PC_VB_GRF1_AM65_FUORI_ZERO;//ok
    //varieTags[10] = null; //SignalRService.tagList.INT_PC_NUOVO_STATO_VB_GRF1_AM65;
    //varieTags[11] = SignalRService.tagList.REAL_PC_GRF1_VOLO;
    //varieTags[12] = SignalRService.tagList.REAL_PC_GRF1_P_RALLENTAMENTO;
    ////varieTags[13] = SignalRService.tagList.REAL_PC_VB_GRF1_AM65_HL;

    //this.VB_GRF1_AM65 = new ScaleModel("VB_GRF1_AM65", "BILANCIA", almTags, fdbTags, cmdTags, varieTags, null); this.scales.push(this.VB_GRF1_AM65); //SignalRService.tagList.INT_PLC_STATO_VB_GRF1_AM65

    //// #endregion

  }

}
