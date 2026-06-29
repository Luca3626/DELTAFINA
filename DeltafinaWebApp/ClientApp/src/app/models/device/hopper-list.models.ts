import { SignalRService } from 'src/app/signalr-client/signalr.service';
import { TagsClient } from 'src/app/tags/tags-client';
import { HopperModel } from './hopper.models';

export class HopperList {

  hoppers: Array<HopperModel> = new Array<HopperModel>();

  public TF1: HopperModel;
  public TF2: HopperModel;
  public TM1: HopperModel;
  public S100: HopperModel;


  // ACK_NUOVA_REGISTRAZIONE_IN_TF1 --> Da inserire?

  constructor() {

    let almTags, fdbTags, cmdTags, varieTags: TagsClient[];


    // #region TF1
    almTags = new Array(20)
    almTags[0] = null; // ALM_TEMPO_CARICO
    almTags[1] = null; // ALM_TEMPO_SCARICO
    almTags[2] = SignalRService.tagList.FDB_ALM_COMM_TF1;                // allarme comunicazione
    almTags[3] = null; // ALM_UNDER_LOAD
    almTags[4] = null; // ALM_OVER_LOAD
    almTags[5] = null; // ALM_ERRORE_PESO
    almTags[6] = null; // ALM_NON_TARATO
    almTags[7] = null; // ALM_FUNZIONE_DI_HOLD_ATTIVA
    almTags[8] = null; // ALM_SETUP_IN_CORSO
    almTags[9] = SignalRService.tagList.FDB_LLL_ALRM_TF1;                 // a pc, allarme livello basso
    almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_TF1;                // bit 0 - errore cella
    almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_TF1;                // bit 1 - avaria del convertitore AD
    almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_TF1;                // bit 2 - peso massimo superato di 9 divisioni
    almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_TF1;                // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_TF1;                // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_TF1;                // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[16] = SignalRService.tagList.FDB_ALM_TF1;                     // cumulativo allarme derivato dalla comunicazione
    almTags[17] = SignalRService.tagList.FDB_HHL_ALRM_TF1;                // a pc, livello altissimo (allarme)
    almTags[18] = null;//SignalRService.tagList.FDB_ALM_NON_A_ZERO_TF1;   // per hmi, allarme bilancia non a zero per nuovo dosaggio
    almTags[19] = null; // SignalRService.tagList.FDB_ALM_PONTE_SU_TM1;

    fdbTags = new Array(19);    
    fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_TF1;                     // peso attuale in kg
    fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_TF1;                  // riempimento percentuale rispetto peso massimo
    fdbTags[2] = null; // FDB_HHL                   // SENSOR HHL
    fdbTags[3] = SignalRService.tagList.FDB_HL_TF1; // SENSOR HL           // a pc, livello alto
    fdbTags[4] = SignalRService.tagList.FDB_LL_TF1; // SENSOR LL           // a pc, livello basso
    fdbTags[5] = null; // FDB_LLL                   // SENSOR LLL
    fdbTags[6] = null; // FDB_HHL_SENSOR            // CALCOLATO HHL
    fdbTags[7] = SignalRService.tagList.FDB_HL_TF1; // CALCOLATO HL
    fdbTags[8] = SignalRService.tagList.FDB_LL_TF1; // CALCOLATO LL
    fdbTags[9] = null; // FDB_LLL_SENSOR            // CALCOLATO LLL
    fdbTags[10] = null; // FDB_PERCENTAGE_ACT
    fdbTags[11] = null; // FDB_RD_VAL_ACT
    fdbTags[12] = null; // FDB_RD_VOLUME_ACT
    fdbTags[13] = null; // FDB_CALLING
    fdbTags[14] = null; //SignalRService.tagList.T_ATTESA_SCARICO_TF1;
    fdbTags[15] = SignalRService.tagList.FDB_CHIAMATA_TF1;                 // TF1 in attesa di dosaggio
    fdbTags[16] = SignalRService.tagList.FDB_ML_TF1;                       // a pc, livello medio
    fdbTags[17] = null;
    fdbTags[18] = SignalRService.tagList.FDB_PORTATA_ACT_TF1;

    cmdTags = new Array(6);
    cmdTags[0] = null;
    cmdTags[1] = null;
    cmdTags[2] = null;
    cmdTags[3] = null;
    cmdTags[4] = SignalRService.tagList.PC_INCLUDI_TF1;                    // Da pulsante. Comanda l'invia di un nuovo stato
    cmdTags[5] = null;

    varieTags = new Array(22);
    varieTags[0] = SignalRService.tagList.PERC_TF1_HHL;//SENSOR HHL        //da pc, percentuale per livello altissimo TF1
    varieTags[1] = SignalRService.tagList.PERC_TF1_HL;//SENSOR HL          //da pc, percentuale per livello alto TF1
    varieTags[2] = SignalRService.tagList.PERC_TF1_LL;//SENSOR LL          //da pc, percentuale per livello basso TF1
    varieTags[3] = SignalRService.tagList.PERC_TF1_LLL;//SENSOR LL         //da pc, percentuale per livello bassissimo TF1
    varieTags[4] = null; // SET_TIME_SGOCCIOLAMENTO                        
    varieTags[5] = null; // SET_TIME_ATTESA_SCARICO                        
    varieTags[6] = null; // SET_RIF_INV                                    
    varieTags[7] = null; // SET_ANTICIPO_NUOVO_DOSAGGIO                    
    varieTags[8] = SignalRService.tagList.CAP_MAX_TF1;                     // capacità massima impostabile dall'utente (kg)
    varieTags[9] = null; // SET_RD_VAL_A_VUOTO                             
    varieTags[10] = null; // SET_RD_VAL_CONO_ALTO                          
    varieTags[11] = null; // SET_RD_VAL_FILO_HHL                           
    varieTags[12] = null; // SET_RD_VOLUME_CONO_ALTO                       
    varieTags[13] = null; // SET_RD_VOLUME_FILO_HHL                        
    varieTags[14] = null; // SET_DENSITA_PRODOTTO                          
    varieTags[15] = null; // SET_FUORI_ZERO                                
    varieTags[16] = null; // SET_T_MAX_SCARICO                             
    varieTags[17] = null; // SET_MOD_SP                                    
    varieTags[18] = null; //SignalRService.tagList.TM1_V_HIGH;              // Alta velocità estrazione
    varieTags[19] = null; //SignalRService.tagList.TM1_V_LOW;               // Bassa velocità estrazione
    varieTags[20] = null; //SignalRService.tagList.PC_TM1_SOGLIA_ANTICIPO;
    varieTags[21] = SignalRService.tagList.FONDOSCALA_TF1;                  // da pc_ fondoscala TF1

    this.TF1 = new HopperModel("TF1", "TRAMOGGIA 1 FORNO", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TF1);
    // #endregion

    // #region TF2
    almTags = new Array(20)
    almTags[0] = null; // ALM_TEMPO_CARICO
    almTags[1] = null; // ALM_TEMPO_SCARICO
    almTags[2] = SignalRService.tagList.FDB_ALM_COMM_TF2;                   // allarme comunicazione
    almTags[3] = null; // ALM_UNDER_LOAD                                    
    almTags[4] = null; // ALM_OVER_LOAD                                     
    almTags[5] = null; // ALM_ERRORE_PESO                                   
    almTags[6] = null; // ALM_NON_TARATO                                    
    almTags[7] = null; // ALM_FUNZIONE_DI_HOLD_ATTIVA                       
    almTags[8] = null; // ALM_SETUP_IN_CORSO                                
    almTags[9] = SignalRService.tagList.FDB_LLL_ALRM_TF2;                    // a pc, allarme livello basso
    almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_TF2;                   // bit 0 - errore cella
    almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_TF2;                   // bit 1 - avaria del convertitore AD
    almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_TF2;                   // bit 2 - peso massimo superato di 9 divisioni
    almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_TF2;                   // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_TF2;                   // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_TF2;                   // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[16] = SignalRService.tagList.FDB_ALM_TF2;                        // cumulativo allarme derivato dalla comunicazione
    almTags[17] = SignalRService.tagList.FDB_HHL_ALRM_TF2;                   // a pc, livello altissimo (allarme)
    almTags[18] = null;//SignalRService.tagList.FDB_ALM_NON_A_ZERO_TF2;      // per hmi, allarme bilancia non a zero per nuovo dosaggio
    almTags[19] = null;//SignalRService.tagList.FDB_ALM_PONTE_SU_TM1;

    fdbTags = new Array(19);
    fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_TF2;                        // peso attuale in kg
    fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_TF2;                     // riempimento percentuale rispetto peso massimo
    fdbTags[2] = null; // FDB_HHL                   // SENSOR HHL             
    fdbTags[3] = SignalRService.tagList.FDB_HL_TF2; // SENSOR HL              // a pc, livello alto
    fdbTags[4] = SignalRService.tagList.FDB_LL_TF2; // SENSOR LL              // a pc, livello basso
    fdbTags[5] = null; // FDB_LLL                   // SENSOR LLL
    fdbTags[6] = null; // FDB_HHL_SENSOR            // CALCOLATO HHL
    fdbTags[7] = SignalRService.tagList.FDB_HL_TF2; // CALCOLATO HL
    fdbTags[8] = SignalRService.tagList.FDB_LL_TF2; // CALCOLATO LL
    fdbTags[9] = null; // FDB_LLL_SENSOR            // CALCOLATO LLL
    fdbTags[10] = null; // FDB_PERCENTAGE_ACT
    fdbTags[11] = null; // FDB_RD_VAL_ACT
    fdbTags[12] = null; // FDB_RD_VOLUME_ACT
    fdbTags[13] = null; // FDB_CALLING
    fdbTags[14] = null; //SignalRService.tagList.T_ATTESA_SCARICO_TF2;
    fdbTags[15] = SignalRService.tagList.FDB_CHIAMATA_TF2;                     // TF2 in attesa di dosaggio
    fdbTags[16] = SignalRService.tagList.FDB_ML_TF2;                           // a pc, livello medio
    fdbTags[17] = null;
    fdbTags[18] = SignalRService.tagList.FDB_PORTATA_ACT_TF2;

    cmdTags = new Array(6);
    cmdTags[0] = null;
    cmdTags[1] = null;
    cmdTags[2] = null;
    cmdTags[3] = null;
    cmdTags[4] = SignalRService.tagList.PC_INCLUDI_TF2;                        // Da pulsante. Comanda l'invia di un nuovo stato
    cmdTags[5] = null;
    
    varieTags = new Array(22);                                                 
    varieTags[0] = SignalRService.tagList.PERC_TF2_HHL;//SENSOR HHL            //da pc, percentuale per livello altissimo TF2
    varieTags[1] = SignalRService.tagList.PERC_TF2_HL;//SENSOR HL              //da pc, percentuale per livello alto TF2
    varieTags[2] = SignalRService.tagList.PERC_TF2_LL;//SENSOR LL              //da pc, percentuale per livello basso TF2
    varieTags[3] = SignalRService.tagList.PERC_TF2_LLL;//SENSOR LL             //da pc, percentuale per livello bassissimo TF2
    varieTags[4] = null; // SET_TIME_SGOCCIOLAMENTO                            
    varieTags[5] = null; // SET_TIME_ATTESA_SCARICO                            
    varieTags[6] = null; // SET_RIF_INV                                        
    varieTags[7] = null; // SET_ANTICIPO_NUOVO_DOSAGGIO                        
    varieTags[8] = SignalRService.tagList.CAP_MAX_TF2;                         // capacità massima impostabile dall'utente (kg)
    varieTags[9] = null; // SET_RD_VAL_A_VUOTO
    varieTags[10] = null; // SET_RD_VAL_CONO_ALTO
    varieTags[11] = null; // SET_RD_VAL_FILO_HHL
    varieTags[12] = null; // SET_RD_VOLUME_CONO_ALTO
    varieTags[13] = null; // SET_RD_VOLUME_FILO_HHL
    varieTags[14] = null; // SET_DENSITA_PRODOTTO
    varieTags[15] = null; // SET_FUORI_ZERO
    varieTags[16] = null; // SET_T_MAX_SCARICO
    varieTags[17] = null; // SET_MOD_SP
    varieTags[18] = null; //SignalRService.tagList.TM1_V_HIGH;                // Alta velocità estrazione
    varieTags[19] = null; //SignalRService.tagList.TM1_V_LOW;                 // Bassa velocità estrazione
    varieTags[20] = null; //SignalRService.tagList.PC_TM1_SOGLIA_ANTICIPO;
    varieTags[21] = SignalRService.tagList.FONDOSCALA_TF2;                    // da pc_ fondoscala TF2

    this.TF2 = new HopperModel("TF2", "TRAMOGGIA 2 FORNO", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TF2);
    // #endregion

    // #region TM1
    almTags = new Array(20)
    almTags[0] = null; // ALM_TEMPO_CARICO
    almTags[1] = null; // ALM_TEMPO_SCARICO
    almTags[2] = SignalRService.tagList.FDB_ALM_COMM_TM1;                    // allarme comunicazione
    almTags[3] = null; // ALM_UNDER_LOAD                                     
    almTags[4] = null; // ALM_OVER_LOAD                                      
    almTags[5] = null; // ALM_ERRORE_PESO                                    
    almTags[6] = null; // ALM_NON_TARATO                                     
    almTags[7] = null; // ALM_FUNZIONE_DI_HOLD_ATTIVA                        
    almTags[8] = null; // ALM_SETUP_IN_CORSO                                 
    almTags[9] = SignalRService.tagList.FDB_LLL_ALRM_TM1;                     // a pc, allarme livello basso
    almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_TM1;                    // bit 0 - errore cella
    almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_TM1;                    // bit 1 - avaria del convertitore AD
    almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_TM1;                    // bit 2 - peso massimo superato di 9 divisioni
    almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_TM1;                    // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_TM1;                    // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_TM1;                    // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[16] = SignalRService.tagList.FDB_ALM_TM1;                         // cumulativo allarme derivato dalla comunicazione
    almTags[17] = SignalRService.tagList.FDB_HHL_ALRM_TM1;                    // a pc, livello altissimo (allarme)
    almTags[18] = null;//SignalRService.tagList.FDB_ALM_NON_A_ZERO_TM1;       // per hmi, allarme bilancia non a zero per nuovo dosaggio
    almTags[19] = SignalRService.tagList.FDB_ALM_PONTE_SU_TM1;

    fdbTags = new Array(19);
    fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_TM1;                        // peso attuale in kg
    fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_TM1;                     // riempimento percentuale rispetto peso massimo
    fdbTags[2] = null; // FDB_HHL                   // SENSOR HHL             
    fdbTags[3] = SignalRService.tagList.FDB_HL_TM1; // SENSOR HL              // a pc, livello alto
    fdbTags[4] = SignalRService.tagList.FDB_LL_TM1; // SENSOR LL              // a pc, livello basso
    fdbTags[5] = null; // FDB_LLL                   // SENSOR LLL             
    fdbTags[6] = null; // FDB_HHL_SENSOR            // CALCOLATO HHL          
    fdbTags[7] = SignalRService.tagList.FDB_HL_TM1; // CALCOLATO HL           
    fdbTags[8] = SignalRService.tagList.FDB_LL_TM1; // CALCOLATO LL           
    fdbTags[9] = null; // FDB_LLL_SENSOR            // CALCOLATO LLL          
    fdbTags[10] = null; // FDB_PERCENTAGE_ACT                                 
    fdbTags[11] = null; // FDB_RD_VAL_ACT                                     
    fdbTags[12] = null; // FDB_RD_VOLUME_ACT                                  
    fdbTags[13] = null; // FDB_CALLING                                        
    fdbTags[14] = null;//FDB_CD_ATTESA_SCARICO             
    fdbTags[15] = null;//SignalRService.tagList.FDB_CHIAMATA_TM1;              // TM1 in attesa di dosaggio
    fdbTags[16] = SignalRService.tagList.FDB_ML_TM1;                           // a pc, livello medio
    fdbTags[17] = SignalRService.tagList.FDB_TM1_PP;
    fdbTags[18] = null;

    cmdTags = new Array(6);
    cmdTags[0] = null;
    cmdTags[1] = null;
    cmdTags[2] = null;
    cmdTags[3] = null;
    cmdTags[4] = null; //SignalRService.tagList.PC_INCLUDI_TM1;              // Da pulsante. Comanda l'invia di un nuovo stato
    cmdTags[5] = null;

    varieTags = new Array(22);
    varieTags[0] = SignalRService.tagList.PERC_TM1_HHL;//SENSOR HHL          //da pc, percentuale per livello altissimo TM1
    varieTags[1] = SignalRService.tagList.PERC_TM1_HL;//SENSOR HL            //da pc, percentuale per livello alto TM1
    varieTags[2] = SignalRService.tagList.PERC_TM1_LL;//SENSOR LL            //da pc, percentuale per livello basso TM1
    varieTags[3] = SignalRService.tagList.PERC_TM1_LLL;//SENSOR LL           //da pc, percentuale per livello bassissimo TM1
    varieTags[4] = SignalRService.tagList.FDB_T_SGOCCIOLAMENTO_TM1;                          
    varieTags[5] = SignalRService.tagList.PC_T_ATTESA_SCARICO_TM1;           // Tempo da attendere per poter liberare la bilancia           
    varieTags[6] = null; // SET_RIF_INV                                     
    varieTags[7] = null; // SET_ANTICIPO_NUOVO_DOSAGGIO                     
    varieTags[8] = SignalRService.tagList.CAP_MAX_TM1;                       // capacità massima impostabile dall'utente (kg)
    varieTags[9] = null; // SET_RD_VAL_A_VUOTO
    varieTags[10] = null; // SET_RD_VAL_CONO_ALTO
    varieTags[11] = null; // SET_RD_VAL_FILO_HHL
    varieTags[12] = null; // SET_RD_VOLUME_CONO_ALTO
    varieTags[13] = null; // SET_RD_VOLUME_FILO_HHL
    varieTags[14] = null; // SET_DENSITA_PRODOTTO
    varieTags[15] = SignalRService.tagList.FZ_TM1;
    varieTags[16] = SignalRService.tagList.T_MAX_SCARICO_TM1;                // SET_T_MAX_SCARICO
    varieTags[17] = null; // SET_MOD_SP
    varieTags[18] = SignalRService.tagList.TM1_V_HIGH;                      // Alta velocità estrazione
    varieTags[19] = SignalRService.tagList.TM1_V_LOW;                       // Bassa velocità estrazione
    varieTags[20] = SignalRService.tagList.PC_TM1_SOGLIA_ANTICIPO;
    varieTags[21] = SignalRService.tagList.FONDOSCALA_TM1;                  // da pc_ fondoscala TM1
    

    this.TM1 = new HopperModel("TM1", "TRAMOGGIA MISCELATORE", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TM1);
    // #endregion

    // #region S100
    almTags = new Array(20)
    almTags[0] = null; // ALM_TEMPO_CARICO
    almTags[1] = null; // ALM_TEMPO_SCARICO  // MAX SCARICO
    almTags[2] = SignalRService.tagList.FDB_ALM_COMM_S100;                  // allarme comunicazione
    almTags[3] = null; // ALM_UNDER_LOAD                                    
    almTags[4] = null; // ALM_OVER_LOAD                                     
    almTags[5] = null; // ALM_ERRORE_PESO                                   
    almTags[6] = null; // ALM_NON_TARATO                                    
    almTags[7] = null; // ALM_FUNZIONE_DI_HOLD_ATTIVA                       
    almTags[8] = null; // ALM_SETUP_IN_CORSO                                
    almTags[9] = SignalRService.tagList.FDB_LLL_ALRM_S100;                   // a pc, allarme livello basso
    almTags[10] = SignalRService.tagList.FDB_ALM_BIT0_S100;                  // bit 0 - errore cella
    almTags[11] = SignalRService.tagList.FDB_ALM_BIT1_S100;                  // bit 1 - avaria del convertitore AD
    almTags[12] = SignalRService.tagList.FDB_ALM_BIT2_S100;                  // bit 2 - peso massimo superato di 9 divisioni
    almTags[13] = SignalRService.tagList.FDB_ALM_BIT3_S100;                  // bit 3 - peso lordo superiore al 110 % del fondoscala
    almTags[14] = SignalRService.tagList.FDB_ALM_BIT4_S100;                  // bit 4 - peso lordo oltre 999999 o inferiore a - 999999
    almTags[15] = SignalRService.tagList.FDB_ALM_BIT5_S100;                  // bit 5 - peso netto oltre 999999 o inferiore a - 999999
    almTags[16] = SignalRService.tagList.FDB_ALM_S100;                       // cumulativo allarme derivato dalla comunicazione
    almTags[17] = SignalRService.tagList.FDB_HHL_ALRM_S100;                  // a pc, livello altissimo (allarme)
    almTags[18] = null;//SignalRService.tagList.FDB_ALM_NON_A_ZERO_S100;     // per hmi, allarme bilancia non a zero per nuovo dosaggio
    almTags[19] = SignalRService.tagList.FDB_ALM_PONTE_SU_S100;

    fdbTags = new Array(19);
    fdbTags[0] = SignalRService.tagList.FDB_Q_ACT_S100;                      // peso attuale in kg
    fdbTags[1] = SignalRService.tagList.FDB_PERC_ACT_S100;                   // riempimento percentuale rispetto peso massimo
    fdbTags[2] = null; // FDB_HHL                                            // SENSOR HHL
    fdbTags[3] = SignalRService.tagList.FDB_HL_S100;                         // SENSOR HL     // a pc, livello alto
    fdbTags[4] = null;//SignalRService.tagList.FDB_LL_S100;                  // SENSOR LL     // a pc, livello basso
    fdbTags[5] = null; // FDB_LLL                                            // SENSOR LLL
    fdbTags[6] = null; // FDB_HHL_SENSOR                                     // CALCOLATO HHL
    fdbTags[7] = SignalRService.tagList.FDB_HL_S100;                         // CALCOLATO HL
    fdbTags[8] = null; //SignalRService.tagList.FDB_LL_S100;                 // CALCOLATO LL
    fdbTags[9] = null; // FDB_LLL_SENSOR                                     // CALCOLATO LLL
    fdbTags[10] = null; // FDB_PERCENTAGE_ACT
    fdbTags[11] = null; // FDB_RD_VAL_ACT
    fdbTags[12] = null; // FDB_RD_VOLUME_ACT
    fdbTags[13] = null; // FDB_CALLING
    fdbTags[14] = null; //SignalRService.tagList.PC_T_ATTESA_SCARICO_S100;
    fdbTags[15] = null;//SignalRService.tagList.FDB_CHIAMATA_S100;            // S100 in attesa di dosaggio
    fdbTags[16] = SignalRService.tagList.FDB_ML_S100;                         // a pc, livello medio
    fdbTags[17] = null;
    fdbTags[18] = null;

    cmdTags = new Array(6);
    cmdTags[0] = null;
    cmdTags[1] = SignalRService.tagList.PC_ESCLUDI_S100;
    cmdTags[2] = null;
    cmdTags[3] = null;
    cmdTags[4] = null; //SignalRService.tagList.PC_INCLUDI_S100;              // Da pulsante. Comanda l'invia di un nuovo stato
    cmdTags[5] = SignalRService.tagList.PC_BYPASS_LL_S100;                    // In realtà la variabile PC_BYPASS_LL_S100 non è descrittiva della funzione di questo
                                                                              // slot array. Viene utilizzata per forzare la PRESENZA PRODOTTO all'interno di S100.

    varieTags = new Array(22);
    varieTags[0] = SignalRService.tagList.PERC_S100_HHL;//SENSOR HHL          //da pc, percentuale per livello altissimo S100
    varieTags[1] = SignalRService.tagList.PERC_S100_HL;//SENSOR HL            //da pc, percentuale per livello alto S100
    varieTags[2] = SignalRService.tagList.PERC_S100_LL;//SENSOR LL            //da pc, percentuale per livello basso S100
    varieTags[3] = SignalRService.tagList.PERC_S100_LLL;//SENSOR LL           //da pc, percentuale per livello bassissimo S100
    varieTags[4] = null; // SET_TIME_SGOCCIOLAMENTO
    varieTags[5] = null; // SET_TIME_ATTESA_SCARICO
    varieTags[6] = null; // SET_RIF_INV
    varieTags[7] = null; // SET_ANTICIPO_NUOVO_DOSAGGIO
    varieTags[8] = SignalRService.tagList.CAP_MAX_S100;                       // capacità massima impostabile dall'utente (kg)
    varieTags[9] = null; // SET_RD_VAL_A_VUOTO
    varieTags[10] = null; // SET_RD_VAL_CONO_ALTO
    varieTags[11] = null; // SET_RD_VAL_FILO_HHL
    varieTags[12] = null; // SET_RD_VOLUME_CONO_ALTO
    varieTags[13] = null; // SET_RD_VOLUME_FILO_HHL
    varieTags[14] = null; // SET_DENSITA_PRODOTTO
    varieTags[15] = null; // SET_FUORI_ZERO
    varieTags[16] = SignalRService.tagList.T_MAX_SCARICO_S100;                // SET_T_MAX_SCARICO
    varieTags[17] = null; // SET_MOD_SP
    varieTags[18] = null;//SignalRService.tagList.S100_V_HIGH;                // Alta velocità estrazione
    varieTags[19] = null;//SignalRService.tagList.S100_V_LOW;                 // Bassa velocità estrazione
    varieTags[20] = null;//SignalRService.tagList.PC_S100_SOGLIA_ANTICIPO;
    varieTags[21] = SignalRService.tagList.FONDOSCALA_S100;                   // da pc_ fondoscala S100

    this.S100 = new HopperModel("S100", "TRAMOGGIA CARICO ROTTAME", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.S100);
    // #endregion





    //***************************************************************************************************************************************************************************
    //***************************************************************************************************************************************************************************
    //***************************************************************************************************************************************************************************





    // VECCHIA IMPLEMENTAZIONE DELLE BILANCE IN VPC_FORNO 2



    //// #region TF1

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TF1;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TF1;
    //almTags[2] = null;//SignalRService.tagList.FDB_ALM_COMM_QA_BH_TF1;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TF1;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TF1;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TF1;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TF1;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TF1;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TF1;
    //almTags[9] = SignalRService.tagList.FDB_ALM_TF1_LLL;

    //fdbTags = new Array(17);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_TF1_PESO_ACT;//ok
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_TF1_PERC_ACT;//ok
    //fdbTags[2] = SignalRService.tagList.BOOL_PLC_TF1_HHL; //SENSOR HHL
    //fdbTags[3] = SignalRService.tagList.BOOL_PLC_TF1_HL; //SENSOR HL
    //fdbTags[4] = SignalRService.tagList.BOOL_PLC_TF1_LL; //SENSOR LL
    //fdbTags[5] = SignalRService.tagList.BOOL_PLC_TF1_LLL; //SENSOR LLL
    //fdbTags[6] = SignalRService.tagList.BOOL_PLC_TF1_HHL; //CALCOLATO HHL
    //fdbTags[7] = SignalRService.tagList.BOOL_PLC_TF1_HL; //CALCOLATO HL
    //fdbTags[8] = SignalRService.tagList.BOOL_PLC_TF1_LL; //CALCOLATO LL
    //fdbTags[9] = SignalRService.tagList.BOOL_PLC_TF1_LLL; //CALCOLATO LLL
    //fdbTags[10] = SignalRService.tagList.REAL_PLC_TF1_RD_PERC_ACT;
    //fdbTags[11] = SignalRService.tagList.REAL_PLC_TF1_RD_VAL_ACT;
    //fdbTags[12] = SignalRService.tagList.REAL_PLC_TF1_RD_VOLUME_ACT;
    //fdbTags[13] = SignalRService.tagList.BOOL_PLC_TF1_IN_CHIAMATA;
    //fdbTags[14] = null;//SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TF1;
    //fdbTags[15] = SignalRService.tagList.BOOL_PLC_TF1_IN_CHIAMATA;
    //fdbTags[16] = SignalRService.tagList.BOOL_PLC_TF1_ML;

    //cmdTags = new Array(4)
    //cmdTags[0] = null;//SignalRService.tagList.PC_TF1_A_TEMPO;
    //cmdTags[1] = SignalRService.tagList.BOOL_PC_INCLUDI_TF1;

    //varieTags = new Array(20);
    //varieTags[0] = SignalRService.tagList.REAL_PC_TF1_SOGLIA_HHL;
    //varieTags[1] = SignalRService.tagList.REAL_PC_TF1_SOGLIA_HL;
    //varieTags[2] = SignalRService.tagList.REAL_PC_TF1_SOGLIA_LL;
    //varieTags[3] = SignalRService.tagList.REAL_PC_TF1_SOGLIA_LLL;
    //varieTags[4] = null;//SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TF1;
    //varieTags[5] = null;//SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TF1;
    //varieTags[6] = null;//SignalRService.tagList.INT_FROM_HMI_RIF_INV_TF1;
    //varieTags[7] = null;//SignalRService.tagList.REAL_PC_TF1_SOGLIA_ANTICIPO;
    //varieTags[8] = SignalRService.tagList.REAL_PC_TF1_PESO_MASSIMO;
    //varieTags[9] = SignalRService.tagList.REAL_PC_TF1_RD_VAL_A_VUOTO;
    //varieTags[10] = SignalRService.tagList.REAL_PC_TF1_RD_VAL_CONO_ALTO;
    //varieTags[11] = SignalRService.tagList.REAL_PC_TF1_RD_VAL_FILO_HHL;
    //varieTags[12] = SignalRService.tagList.REAL_PC_TF1_RD_VOLUME_CONO_ALTO;
    //varieTags[13] = SignalRService.tagList.REAL_PC_TF1_RD_VOLUME_FILO_HHL;
    //varieTags[14] = SignalRService.tagList.REAL_PC_TF1_DENSITA;
    //varieTags[15] = SignalRService.tagList.REAL_PC_TF1_FUORI_ZERO;
    //varieTags[16] = null;
    //varieTags[17] = null;//SignalRService.tagList.INT_PC_MOD_SP_TF1;
    //varieTags[18] = null;//SignalRService.tagList.INT_PC_RIF_INV_TF1_LENTO;
    //varieTags[19] = null;//SignalRService.tagList.INT_PC_RIF_INV_TF1_VELOCE;

    //this.TF1 = new HopperModel("TF1", "VERSO TAVERNELLE", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TF1);

    //// #endregion

    //// #region TF2

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TF2;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TF2;
    //almTags[2] = null;//SignalRService.tagList.FDB_ALM_COMM_QA_BH_TF2;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TF2;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TF2;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TF2;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TF2;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TF2;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TF2;
    //almTags[9] = SignalRService.tagList.FDB_ALM_TF2_LLL;

    //fdbTags = new Array(17);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_TF2_PESO_ACT;//ok
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_TF2_PERC_ACT;//ok
    //fdbTags[2] = SignalRService.tagList.BOOL_PLC_TF2_HHL; //SENSOR HHL
    //fdbTags[3] = SignalRService.tagList.BOOL_PLC_TF2_HL; //SENSOR HL
    //fdbTags[4] = SignalRService.tagList.BOOL_PLC_TF2_LL; //SENSOR LL
    //fdbTags[5] = SignalRService.tagList.BOOL_PLC_TF2_LLL; //SENSOR LLL
    //fdbTags[6] = SignalRService.tagList.BOOL_PLC_TF2_HHL; //CALCOLATO HHL
    //fdbTags[7] = SignalRService.tagList.BOOL_PLC_TF2_HL; //CALCOLATO HL
    //fdbTags[8] = SignalRService.tagList.BOOL_PLC_TF2_LL; //CALCOLATO LL
    //fdbTags[9] = SignalRService.tagList.BOOL_PLC_TF2_LLL; //CALCOLATO LLL
    //fdbTags[10] = SignalRService.tagList.REAL_PLC_TF2_RD_PERC_ACT;
    //fdbTags[11] = SignalRService.tagList.REAL_PLC_TF2_RD_VAL_ACT;
    //fdbTags[12] = SignalRService.tagList.REAL_PLC_TF2_RD_VOLUME_ACT;
    //fdbTags[13] = SignalRService.tagList.BOOL_PLC_TF2_IN_CHIAMATA;
    //fdbTags[14] = null;//SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TF2;
    //fdbTags[15] = SignalRService.tagList.BOOL_PLC_TF2_IN_CHIAMATA;
    //fdbTags[16] = SignalRService.tagList.BOOL_PLC_TF2_ML;

    //cmdTags = new Array(4)
    //cmdTags[0] = null;//SignalRService.tagList.PC_TF2_A_TEMPO;
    //cmdTags[1] = SignalRService.tagList.BOOL_PC_INCLUDI_TF2;

    //varieTags = new Array(20);
    //varieTags[0] = SignalRService.tagList.REAL_PC_TF2_SOGLIA_HHL;
    //varieTags[1] = SignalRService.tagList.REAL_PC_TF2_SOGLIA_HL;
    //varieTags[2] = SignalRService.tagList.REAL_PC_TF2_SOGLIA_LL;
    //varieTags[3] = SignalRService.tagList.REAL_PC_TF2_SOGLIA_LLL;
    //varieTags[4] = null;//SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TF2;
    //varieTags[5] = null;//SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TF2;
    //varieTags[6] = null;//SignalRService.tagList.INT_FROM_HMI_RIF_INV_TF2;
    //varieTags[7] = null;//SignalRService.tagList.REAL_PC_TF2_SOGLIA_ANTICIPO;
    //varieTags[8] = SignalRService.tagList.REAL_PC_TF2_PESO_MASSIMO;
    //varieTags[9] = SignalRService.tagList.REAL_PC_TF2_RD_VAL_A_VUOTO;
    //varieTags[10] = SignalRService.tagList.REAL_PC_TF2_RD_VAL_CONO_ALTO;
    //varieTags[11] = SignalRService.tagList.REAL_PC_TF2_RD_VAL_FILO_HHL;
    //varieTags[12] = SignalRService.tagList.REAL_PC_TF2_RD_VOLUME_CONO_ALTO;
    //varieTags[13] = SignalRService.tagList.REAL_PC_TF2_RD_VOLUME_FILO_HHL;
    //varieTags[14] = SignalRService.tagList.REAL_PC_TF2_DENSITA;
    //varieTags[15] = SignalRService.tagList.REAL_PC_TF2_FUORI_ZERO;
    //varieTags[16] = null;
    //varieTags[17] = null;//SignalRService.tagList.INT_PC_MOD_SP_TF2;
    //varieTags[18] = null;//SignalRService.tagList.INT_PC_RIF_INV_TF2_LENTO;
    //varieTags[19] = null;//SignalRService.tagList.INT_PC_RIF_INV_TF2_VELOCE;

    //this.TF2 = new HopperModel("TF2", "VERSO PIEGARO", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TF2);

    //// #endregion

    //// #region R1

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_R1;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_R1;
    //almTags[2] = null;//SignalRService.tagList.FDB_ALM_COMM_QA_BH_R1;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_R1;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_R1;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_R1;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_R1;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_R1;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_R1;
    //almTags[9] = null;//SignalRService.tagList.FDB_ALM_R1_LLL;

    //fdbTags = new Array(17);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_R1_PESO_ACT;//ok
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_R1_PERC_ACT;//ok
    //fdbTags[2] = SignalRService.tagList.BOOL_PLC_R1_HHL; //SENSOR HHL
    //fdbTags[3] = SignalRService.tagList.BOOL_PLC_R1_HL; //SENSOR HL
    //fdbTags[4] = SignalRService.tagList.BOOL_PLC_R1_LL; //SENSOR LL
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_R1_LLL; //SENSOR LLL
    //fdbTags[6] = SignalRService.tagList.BOOL_PLC_R1_HHL; //CALCOLATO HHL
    //fdbTags[7] = SignalRService.tagList.BOOL_PLC_R1_HL; //CALCOLATO HL
    //fdbTags[8] = SignalRService.tagList.BOOL_PLC_R1_LL; //CALCOLATO LL
    //fdbTags[9] = null;//SignalRService.tagList.BOOL_PLC_R1_LLL; //CALCOLATO LLL
    //fdbTags[10] = SignalRService.tagList.REAL_PLC_R1_RD_PERC_ACT;
    //fdbTags[11] = SignalRService.tagList.REAL_PLC_R1_RD_VAL_ACT;
    //fdbTags[12] = SignalRService.tagList.REAL_PLC_R1_RD_VOLUME_ACT;
    //fdbTags[13] = null;//SignalRService.tagList.BOOL_PLC_R1_IN_CHIAMATA;
    //fdbTags[14] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_R1R2;
    //fdbTags[15] = null;//SignalRService.tagList.BOOL_PLC_R1_IN_CHIAMATA;
    //fdbTags[16] = null;//SignalRService.tagList.BOOL_PLC_R1_ML;

    //cmdTags = new Array(4)
    //cmdTags[0] = null;//SignalRService.tagList.PC_R1_A_TEMPO;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_INCLUDI_R1;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_ABILITA_CARICO_R1;
    //cmdTags[3] = SignalRService.tagList.BOOL_PC_ABILITA_SCARICO_R1;

    //varieTags = new Array(20);
    //varieTags[0] = SignalRService.tagList.REAL_PC_R1_SOGLIA_HHL;
    //varieTags[1] = SignalRService.tagList.REAL_PC_R1_SOGLIA_HL;
    //varieTags[2] = SignalRService.tagList.REAL_PC_R1_SOGLIA_LL;
    //varieTags[3] = null;//SignalRService.tagList.REAL_PC_R1_SOGLIA_LLL;
    //varieTags[4] = null;//SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_R1;
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_R1R2;
    //varieTags[6] = null;//SignalRService.tagList.INT_FROM_HMI_RIF_INV_R1;
    //varieTags[7] = null;//SignalRService.tagList.REAL_PC_R1_SOGLIA_ANTICIPO;
    //varieTags[8] = SignalRService.tagList.REAL_PC_R1_PESO_MASSIMO;
    //varieTags[9] = SignalRService.tagList.REAL_PC_R1_RD_VAL_A_VUOTO;
    //varieTags[10] = SignalRService.tagList.REAL_PC_R1_RD_VAL_CONO_ALTO;
    //varieTags[11] = SignalRService.tagList.REAL_PC_R1_RD_VAL_FILO_HHL;
    //varieTags[12] = SignalRService.tagList.REAL_PC_R1_RD_VOLUME_CONO_ALTO;
    //varieTags[13] = SignalRService.tagList.REAL_PC_R1_RD_VOLUME_FILO_HHL;
    //varieTags[14] = SignalRService.tagList.REAL_PC_R1_DENSITA;
    //varieTags[15] = SignalRService.tagList.REAL_PC_R1_FUORI_ZERO;
    //varieTags[16] = null;
    //varieTags[17] = SignalRService.tagList.INT_PC_MOD_SP_R1;
    //varieTags[18] = SignalRService.tagList.INT_PC_RIF_INV_R1_LENTO;
    //varieTags[19] = SignalRService.tagList.INT_PC_RIF_INV_R1_VELOCE;

    //this.R1 = new HopperModel("R1", "ROTTAME INTERNO", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.R1);

    //// #endregion

    //// #region R2

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_R2;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_R2;
    //almTags[2] = null;//SignalRService.tagList.FDB_ALM_COMM_QA_BH_R2;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_R2;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_R2;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_R2;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_R2;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_R2;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_R2;
    //almTags[9] = null;//SignalRService.tagList.FDB_ALM_R2_LLL;

    //fdbTags = new Array(17);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_R2_PESO_ACT;//ok
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_R2_PERC_ACT;//ok
    //fdbTags[2] = SignalRService.tagList.BOOL_PLC_R2_HHL; //SENSOR HHL
    //fdbTags[3] = SignalRService.tagList.BOOL_PLC_R2_HL; //SENSOR HL
    //fdbTags[4] = SignalRService.tagList.BOOL_PLC_R2_LL; //SENSOR LL
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_R2_LLL; //SENSOR LLL
    //fdbTags[6] = SignalRService.tagList.BOOL_PLC_R2_HHL; //CALCOLATO HHL
    //fdbTags[7] = SignalRService.tagList.BOOL_PLC_R2_HL; //CALCOLATO HL
    //fdbTags[8] = SignalRService.tagList.BOOL_PLC_R2_LL; //CALCOLATO LL
    //fdbTags[9] = null;//SignalRService.tagList.BOOL_PLC_R2_LLL; //CALCOLATO LLL
    //fdbTags[10] = SignalRService.tagList.REAL_PLC_R2_RD_PERC_ACT;
    //fdbTags[11] = SignalRService.tagList.REAL_PLC_R2_RD_VAL_ACT;
    //fdbTags[12] = SignalRService.tagList.REAL_PLC_R2_RD_VOLUME_ACT;
    //fdbTags[13] = null;//SignalRService.tagList.BOOL_PLC_R2_IN_CHIAMATA;
    //fdbTags[14] = SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_R1R2;
    //fdbTags[15] = null;//SignalRService.tagList.BOOL_PLC_R2_IN_CHIAMATA;
    //fdbTags[16] = null;//SignalRService.tagList.BOOL_PLC_R2_ML;

    //cmdTags = new Array(4)
    //cmdTags[0] = null;//SignalRService.tagList.PC_R2_A_TEMPO;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_INCLUDI_R2;
    //cmdTags[2] = SignalRService.tagList.BOOL_PC_ABILITA_CARICO_R2;
    //cmdTags[3] = SignalRService.tagList.BOOL_PC_ABILITA_SCARICO_R2;

    //varieTags = new Array(20);
    //varieTags[0] = SignalRService.tagList.REAL_PC_R2_SOGLIA_HHL;
    //varieTags[1] = SignalRService.tagList.REAL_PC_R2_SOGLIA_HL;
    //varieTags[2] = SignalRService.tagList.REAL_PC_R2_SOGLIA_LL;
    //varieTags[3] = null;//SignalRService.tagList.REAL_PC_R2_SOGLIA_LLL;
    //varieTags[4] = null;//SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_R2;
    //varieTags[5] = SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_R1R2;
    //varieTags[6] = null;//SignalRService.tagList.INT_FROM_HMI_RIF_INV_R2;
    //varieTags[7] = null;//SignalRService.tagList.REAL_PC_R2_SOGLIA_ANTICIPO;
    //varieTags[8] = SignalRService.tagList.REAL_PC_R2_PESO_MASSIMO;
    //varieTags[9] = SignalRService.tagList.REAL_PC_R2_RD_VAL_A_VUOTO;
    //varieTags[10] = SignalRService.tagList.REAL_PC_R2_RD_VAL_CONO_ALTO;
    //varieTags[11] = SignalRService.tagList.REAL_PC_R2_RD_VAL_FILO_HHL;
    //varieTags[12] = SignalRService.tagList.REAL_PC_R2_RD_VOLUME_CONO_ALTO;
    //varieTags[13] = SignalRService.tagList.REAL_PC_R2_RD_VOLUME_FILO_HHL;
    //varieTags[14] = SignalRService.tagList.REAL_PC_R2_DENSITA;
    //varieTags[15] = SignalRService.tagList.REAL_PC_R2_FUORI_ZERO;
    //varieTags[16] = null;
    //varieTags[17] = SignalRService.tagList.INT_PC_MOD_SP_R2;
    //varieTags[18] = SignalRService.tagList.INT_PC_RIF_INV_R2_LENTO;
    //varieTags[19] = SignalRService.tagList.INT_PC_RIF_INV_R2_VELOCE;

    //this.R2 = new HopperModel("R2", "ROTTAME INTERNO", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.R2);

    //// #endregion

    //// #region TR1

    //almTags = new Array(10);
    //almTags[0] = SignalRService.tagList.FDB_ALM_TEMPO_CARICO_TR1;
    //almTags[1] = SignalRService.tagList.FDB_ALM_TEMPO_SCARICO_TR1;
    //almTags[2] = SignalRService.tagList.FDB_ALM_COMM_EIP_NODO_TR1;
    //almTags[3] = SignalRService.tagList.FDB_ALM_UNDER_LOAD_TR1;
    //almTags[4] = SignalRService.tagList.FDB_ALM_OVER_LOAD_TR1;
    //almTags[5] = SignalRService.tagList.FDB_ALM_ERRORE_PESO_TR1;
    //almTags[6] = SignalRService.tagList.FDB_ALM_NON_TARATO_TR1;
    //almTags[7] = SignalRService.tagList.FDB_ALM_FUNZIONE_DI_HOLD_ATTIVA_TR1;
    //almTags[8] = SignalRService.tagList.FDB_ALM_SETUP_IN_CORSO_TR1;
    //almTags[9] = null;//SignalRService.tagList.FDB_ALM_TR1_LLL;

    //fdbTags = new Array(17);
    //fdbTags[0] = SignalRService.tagList.REAL_PLC_TR1_PESO_ACT;//ok
    //fdbTags[1] = SignalRService.tagList.REAL_PLC_TR1_PERC_ACT;//ok
    //fdbTags[2] = SignalRService.tagList.BOOL_PLC_TR1_HHL; //SENSOR HHL
    //fdbTags[3] = SignalRService.tagList.BOOL_PLC_TR1_HL; //SENSOR HL
    //fdbTags[4] = SignalRService.tagList.BOOL_PLC_TR1_LL; //SENSOR LL
    //fdbTags[5] = null;//SignalRService.tagList.BOOL_PLC_TR1_LLL; //SENSOR LLL
    //fdbTags[6] = SignalRService.tagList.BOOL_PLC_TR1_HHL; //CALCOLATO HHL
    //fdbTags[7] = SignalRService.tagList.BOOL_PLC_TR1_HL; //CALCOLATO HL
    //fdbTags[8] = SignalRService.tagList.BOOL_PLC_TR1_LL; //CALCOLATO LL
    //fdbTags[9] = null;//SignalRService.tagList.BOOL_PLC_TR1_LLL; //CALCOLATO LLL
    //fdbTags[10] = SignalRService.tagList.REAL_PLC_TR1_RD_PERC_ACT;
    //fdbTags[11] = SignalRService.tagList.REAL_PLC_TR1_RD_VAL_ACT;
    //fdbTags[12] = SignalRService.tagList.REAL_PLC_TR1_RD_VOLUME_ACT;
    //fdbTags[13] = null;//SignalRService.tagList.BOOL_PLC_TR1_IN_CHIAMATA;
    //fdbTags[14] = null;//SignalRService.tagList.INT_FDB_CD_ATTESA_SCARICO_TR1;
    //fdbTags[15] = null;//SignalRService.tagList.BOOL_PLC_TR1_IN_CHIAMATA;
    //fdbTags[16] = null;//SignalRService.tagList.BOOL_PLC_TR1_ML;

    //cmdTags = new Array(4)
    //cmdTags[0] = null;//SignalRService.tagList.PC_TR1_A_TEMPO;
    //cmdTags[1] = null;//SignalRService.tagList.BOOL_PC_INCLUDI_TR1;

    //varieTags = new Array(20);
    //varieTags[0] = SignalRService.tagList.REAL_PC_TR1_SOGLIA_HHL;
    //varieTags[1] = SignalRService.tagList.REAL_PC_TR1_SOGLIA_HL;
    //varieTags[2] = SignalRService.tagList.REAL_PC_TR1_SOGLIA_LL;
    //varieTags[3] = null;//SignalRService.tagList.REAL_PC_TR1_SOGLIA_LLL;
    //varieTags[4] = SignalRService.tagList.INT_PC_T_SGOCCIOLAMENTO_TR1;
    //varieTags[5] = null;//SignalRService.tagList.INT_PC_T_ATTESA_SCARICO_TR1;
    //varieTags[6] = null;//SignalRService.tagList.INT_FROM_HMI_RIF_INV_TR1;
    //varieTags[7] = null;//SignalRService.tagList.REAL_PC_TR1_SOGLIA_ANTICIPO;
    //varieTags[8] = SignalRService.tagList.REAL_PC_TR1_PESO_MASSIMO;
    //varieTags[9] = SignalRService.tagList.REAL_PC_TR1_RD_VAL_A_VUOTO;
    //varieTags[10] = SignalRService.tagList.REAL_PC_TR1_RD_VAL_CONO_ALTO;
    //varieTags[11] = SignalRService.tagList.REAL_PC_TR1_RD_VAL_FILO_HHL;
    //varieTags[12] = SignalRService.tagList.REAL_PC_TR1_RD_VOLUME_CONO_ALTO;
    //varieTags[13] = SignalRService.tagList.REAL_PC_TR1_RD_VOLUME_FILO_HHL;
    //varieTags[14] = SignalRService.tagList.REAL_PC_TR1_DENSITA;
    //varieTags[15] = SignalRService.tagList.REAL_PC_TR1_FUORI_ZERO;
    //varieTags[16] = null;
    //varieTags[17] = null;//SignalRService.tagList.INT_PC_MOD_SP_TR1;
    //varieTags[18] = null;//SignalRService.tagList.INT_PC_RIF_INV_TR1_LENTO;
    //varieTags[19] = null;//SignalRService.tagList.INT_PC_RIF_INV_TR1_VELOCE;

    //this.TR1 = new HopperModel("TR1", "ROTTAME INTERNO", almTags, fdbTags, cmdTags, varieTags); this.hoppers.push(this.TR1);

    //// #endregion

  }

}
