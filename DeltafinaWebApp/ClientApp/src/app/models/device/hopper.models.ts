import { TagsClient } from 'src/app/tags/tags-client';
//import * as delay from 'delay';

export class HopperModel {
  public animal: string;
  public name: string;
  public description: string;

  public ALM_TEMPO_CARICO: TagsClient;
  public ALM_TEMPO_SCARICO: TagsClient;
  public ALM_COMM: TagsClient;
  public ALM_UNDER_LOAD: TagsClient;
  public ALM_OVER_LOAD: TagsClient;
  public ALM_ERRORE_PESO: TagsClient;
  public ALM_NON_TARATO: TagsClient;
  public ALM_FUNZIONE_DI_HOLD_ATTIVA: TagsClient;
  public ALM_SETUP_IN_CORSO: TagsClient;
  public ALM_LLL: TagsClient;
  public ALM_ERRORE_CELLA;
  public ALM_AVARIA_CONVERTITORE;
  public ALM_PESO_MAX_SUPERATO;
  public ALM_PESO_LORDO_FONDOSCALA_ERROR;
  public ALM_PESO_LORDO_ERROR;
  public ALM_PESO_NETTO_ERROR;
  public ALM_CUMULATIVO;
  public ALM_HHL;     
  public ALM_NON_ZERO;
  public ALM_PONTE_SU;


  public FDB_PESO_ACT: TagsClient;
  public FDB_PERC_ACT: TagsClient;
  public FDB_HHL: TagsClient;
  public FDB_HL: TagsClient;
  public FDB_LL: TagsClient;
  public FDB_LLL: TagsClient;
  public FDB_HHL_SENSOR: TagsClient;
  public FDB_HL_SENSOR: TagsClient;
  public FDB_LL_SENSOR: TagsClient;
  public FDB_LLL_SENSOR: TagsClient;
  public FDB_PERCENTAGE_ACT: TagsClient;
  public FDB_RD_VAL_ACT: TagsClient;
  public FDB_RD_VOLUME_ACT: TagsClient;
  public FDB_CALLING: TagsClient;
  public FDB_CD_ATTESA_SCARICO: TagsClient;
  public FDB_IN_CHIAMATA: TagsClient;
  public FDB_ML: TagsClient;
  public FDB_PRESENZA_PRODOTTO: TagsClient;
  public FDB_PORTATA: TagsClient;

  public CMD_ESCLUDE_LL: TagsClient;
  public CMD_ESCLUDE: TagsClient;
  public CMD_ENABLE_LOAD: TagsClient;
  public CMD_ENABLE_UNLOAD: TagsClient;
  public CMD_INCLUDE: TagsClient;
  public CMD_FORZA_PP: TagsClient;

  public SET_HHL: TagsClient;
  public SET_HL: TagsClient;
  public SET_LL: TagsClient;
  public SET_LLL: TagsClient;
  public SET_TIME_SGOCCIOLAMENTO: TagsClient;
  public SET_TIME_ATTESA_SCARICO: TagsClient;
  public SET_RIF_INV: TagsClient;
  public SET_ANTICIPO_NUOVO_DOSAGGIO: TagsClient;
  public SET_PESO_MASSIMO: TagsClient;

  public STATE: TagsClient;

  public SET_RD_VAL_A_VUOTO: TagsClient;
  public SET_RD_VAL_CONO_ALTO: TagsClient;
  public SET_RD_VAL_FILO_HHL: TagsClient;
  public SET_RD_VOLUME_CONO_ALTO: TagsClient;
  public SET_RD_VOLUME_FILO_HHL: TagsClient;
  public SET_DENSITA_PRODOTTO: TagsClient;
  public SET_FUORI_ZERO: TagsClient;
  public SET_T_MAX_SCARICO: TagsClient;
  public SET_MOD_SP: TagsClient;
  public SET_RIF_INV_LENTO: TagsClient;
  public SET_RIF_INV_VELOCE: TagsClient;
  public SET_SOGLIA_ANTICIPO: TagsClient;
  public SET_FONDOSCALA: TagsClient;

  constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[]) {

    this.name = name;
    this.description = description;

    this.ALM_TEMPO_CARICO = almTags[0];
    this.ALM_TEMPO_SCARICO = almTags[1];
    this.ALM_COMM = almTags[2]; 
    this.ALM_UNDER_LOAD = almTags[3];
    this.ALM_OVER_LOAD = almTags[4];
    this.ALM_ERRORE_PESO = almTags[5];
    this.ALM_NON_TARATO = almTags[6];
    this.ALM_FUNZIONE_DI_HOLD_ATTIVA = almTags[7];
    this.ALM_SETUP_IN_CORSO = almTags[8];
    this.ALM_LLL = almTags[9];
    this.ALM_ERRORE_CELLA = almTags[10]; 
    this.ALM_AVARIA_CONVERTITORE = almTags[11]; 
    this.ALM_PESO_MAX_SUPERATO = almTags[12]; 
    this.ALM_PESO_LORDO_FONDOSCALA_ERROR = almTags[13]; 
    this.ALM_PESO_LORDO_ERROR = almTags[14]; 
    this.ALM_PESO_NETTO_ERROR = almTags[15]; 
    this.ALM_CUMULATIVO = almTags[16]; 
    this.ALM_HHL = almTags[17]; 
    this.ALM_NON_ZERO = almTags[18];
    this.ALM_PONTE_SU = almTags[19];     

    this.FDB_PESO_ACT = fdbTags[0];
    this.FDB_PERC_ACT = fdbTags[1];
    this.FDB_HHL_SENSOR = fdbTags[2];
    this.FDB_HL_SENSOR = fdbTags[3];
    this.FDB_LL_SENSOR = fdbTags[4];
    this.FDB_LLL_SENSOR = fdbTags[5];
    this.FDB_HHL = fdbTags[6];
    this.FDB_HL = fdbTags[7];
    this.FDB_LL = fdbTags[8];
    this.FDB_LLL = fdbTags[9];
    this.FDB_PERCENTAGE_ACT = fdbTags[10];
    this.FDB_RD_VAL_ACT = fdbTags[11];
    this.FDB_RD_VOLUME_ACT = fdbTags[12];
    this.FDB_CALLING = fdbTags[13];
    this.FDB_CD_ATTESA_SCARICO = fdbTags[14];
    this.FDB_IN_CHIAMATA = fdbTags[15];
    this.FDB_ML = fdbTags[16];
    this.FDB_PRESENZA_PRODOTTO = fdbTags[17];
    this.FDB_PORTATA = fdbTags[18];

    this.FDB_RD_VAL_ACT = fdbTags[11];
    this.FDB_RD_VOLUME_ACT = fdbTags[12];

    this.CMD_ESCLUDE_LL = cmdTags[0];
    this.CMD_ESCLUDE = cmdTags[1];
    this.CMD_ENABLE_LOAD = cmdTags[2];
    this.CMD_ENABLE_UNLOAD = cmdTags[3];
    this.CMD_INCLUDE = cmdTags[4];
    this.CMD_FORZA_PP = cmdTags[5];

    this.SET_HHL = varieTags[0];
    this.SET_HL = varieTags[1];
    this.SET_LL = varieTags[2];
    this.SET_LLL = varieTags[3];
    this.SET_TIME_SGOCCIOLAMENTO = varieTags[4];
    this.SET_TIME_ATTESA_SCARICO = varieTags[5];
    this.SET_RIF_INV = varieTags[6];
    this.SET_ANTICIPO_NUOVO_DOSAGGIO = varieTags[7];
    this.SET_PESO_MASSIMO = varieTags[8];
    this.SET_RD_VAL_A_VUOTO = varieTags[9];
    this.SET_RD_VAL_CONO_ALTO = varieTags[10];
    this.SET_RD_VAL_FILO_HHL = varieTags[11];
    this.SET_RD_VOLUME_CONO_ALTO = varieTags[12];
    this.SET_RD_VOLUME_FILO_HHL = varieTags[13];
    this.SET_DENSITA_PRODOTTO = varieTags[14];
    this.SET_FUORI_ZERO = varieTags[15];
    this.SET_T_MAX_SCARICO = varieTags[16];
    this.SET_MOD_SP = varieTags[17];
    this.SET_RIF_INV_LENTO = varieTags[18];
    this.SET_RIF_INV_VELOCE = varieTags[19];
    this.SET_SOGLIA_ANTICIPO = varieTags[20];
    this.SET_FONDOSCALA = varieTags[21];
  }

  get InAlarm(): boolean {
    if (this.ALM_TEMPO_CARICO != null && this.ALM_TEMPO_CARICO.value)
      return true;
    else if (this.ALM_TEMPO_SCARICO != null && this.ALM_TEMPO_SCARICO.value)
      return true;
    else if (this.ALM_COMM != null && this.ALM_COMM.value)
      return true;
    else if (this.ALM_UNDER_LOAD != null && this.ALM_UNDER_LOAD.value)
      return true;
    else if (this.ALM_OVER_LOAD != null && this.ALM_OVER_LOAD.value)
      return true;
    else if (this.ALM_ERRORE_PESO != null && this.ALM_ERRORE_PESO.value)
      return true;
    else if (this.ALM_NON_TARATO != null && this.ALM_NON_TARATO.value)
      return true;
    else if (this.ALM_FUNZIONE_DI_HOLD_ATTIVA != null && this.ALM_FUNZIONE_DI_HOLD_ATTIVA.value)
      return true;
    else if (this.ALM_SETUP_IN_CORSO != null && this.ALM_SETUP_IN_CORSO.value)
      return true;
    else if (this.ALM_LLL != null && this.ALM_LLL.value)
      return true;
    else if (this.ALM_ERRORE_CELLA != null && this.ALM_ERRORE_CELLA.value)
      return true;
    else if (this.ALM_AVARIA_CONVERTITORE != null && this.ALM_AVARIA_CONVERTITORE.value)
      return true;
    else if (this.ALM_PESO_MAX_SUPERATO != null && this.ALM_PESO_MAX_SUPERATO.value)
      return true;
    else if (this.ALM_PESO_LORDO_FONDOSCALA_ERROR != null && this.ALM_PESO_LORDO_FONDOSCALA_ERROR.value)
      return true;
    else if (this.ALM_PESO_LORDO_ERROR != null && this.ALM_PESO_LORDO_ERROR.value)
      return true;
    else if (this.ALM_PESO_NETTO_ERROR != null && this.ALM_PESO_NETTO_ERROR.value)
      return true;
    else if (this.ALM_CUMULATIVO != null && this.ALM_CUMULATIVO.value)
      return true;
    else if (this.ALM_HHL != null && this.ALM_HHL.value && this.name !== "TM1")
      return true;
    else if (this.ALM_NON_ZERO != null && this.ALM_NON_ZERO.value)
      return true;
    else if (this.ALM_PONTE_SU != null && this.ALM_PONTE_SU.value)
      return true;
    else
      return false;
  } 
}
