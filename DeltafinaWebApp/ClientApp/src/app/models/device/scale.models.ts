import { TagsClient } from 'src/app/tags/tags-client';
//import * as delay from 'delay';

export class ScaleModel {
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
  public ALM_NON_A_ZERO: TagsClient;
  public ALM_ERRORE_CELLA;
  public ALM_AVARIA_CONVERTITORE;
  public ALM_PESO_MAX_SUPERATO;
  public ALM_PESO_LORDO_FONDOSCALA_ERROR;
  public ALM_PESO_LORDO_ERROR;
  public ALM_PESO_NETTO_ERROR;
  public ALM_CUMULATIVO;

  public FDB_PESO_ACT: TagsClient;
  public FDB_PERC_ACT: TagsClient;
  public FDB_CD_ATTESA_SCARICO: TagsClient;
  public FDB_PesoLordo: TagsClient;
  public FDB_FUORI_ZERO: TagsClient;

  public CMD_NUOVO_STATO: TagsClient;

  public SET_SILO_PRIORITY: TagsClient;
  public SET_MOD_SP: TagsClient;
  public SET_T_MAX_CARICO: TagsClient;
  public SET_T_MAX_SCARICO: TagsClient;
  public SET_T_SGOCCIOLAMENTO: TagsClient;
  public SET_T_ATTESA_SCARICO: TagsClient;
  public SET_RIF_INV_LENTO: TagsClient;
  public SET_RIF_INV_VELOCE: TagsClient;
  public SET_PESO_MASSIMO: TagsClient;
  public SET_FUORI_ZERO: TagsClient;
  public SET_VOLO: TagsClient;
  public SET_P_RALLENTAMENTO: TagsClient;
  public SET_CAP_MAX: TagsClient;
  public SET_NUOVO_STATO: TagsClient;
  public SET_ABIL_ACQUA: TagsClient;
  //public SET_HL: TagsClient;

  public STATE: TagsClient;


  constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[],
    stateTag: TagsClient) {

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
    this.ALM_NON_A_ZERO = almTags[9];
    this.ALM_ERRORE_CELLA = almTags[10];
    this.ALM_AVARIA_CONVERTITORE = almTags[11];
    this.ALM_PESO_MAX_SUPERATO = almTags[12];
    this.ALM_PESO_LORDO_FONDOSCALA_ERROR = almTags[13];
    this.ALM_PESO_LORDO_ERROR = almTags[14];
    this.ALM_PESO_NETTO_ERROR = almTags[15];
    this.ALM_CUMULATIVO = almTags[16];

    this.FDB_PESO_ACT = fdbTags[0];
    this.FDB_PERC_ACT = fdbTags[1];
    this.FDB_CD_ATTESA_SCARICO = fdbTags[2];
    this.FDB_PesoLordo = fdbTags[3];
    this.FDB_FUORI_ZERO = fdbTags[4];

    this.CMD_NUOVO_STATO = cmdTags[0];

    this.SET_SILO_PRIORITY = varieTags[0];
    this.SET_MOD_SP = varieTags[1];
    this.SET_T_MAX_CARICO = varieTags[2];
    this.SET_T_MAX_SCARICO = varieTags[3];
    this.SET_T_SGOCCIOLAMENTO = varieTags[4];
    this.SET_T_ATTESA_SCARICO = varieTags[5];
    this.SET_RIF_INV_LENTO = varieTags[6];
    this.SET_RIF_INV_VELOCE = varieTags[7];
    this.SET_PESO_MASSIMO = varieTags[8];
    this.SET_FUORI_ZERO = varieTags[9];  
    this.SET_VOLO = varieTags[10];
    this.SET_P_RALLENTAMENTO = varieTags[11];
    this.SET_CAP_MAX = varieTags[12];
    this.SET_NUOVO_STATO = varieTags[13];
    this.SET_ABIL_ACQUA = varieTags[14]
    
    //this.SET_HL = varieTags[13];

    this.STATE = stateTag;
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
    else if (this.ALM_NON_A_ZERO != null && this.ALM_NON_A_ZERO.value)
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
    else
      return false;
  }

  get STATE_STR(): string {
    switch (this.STATE.value) {

      case 0:
        return "NESSUNA OPERAZIONE";
      case 1:
        return "PESATA DA MISCELARE: CARICO";
      case 2:
        if (this.FDB_CD_ATTESA_SCARICO != null)
          return "PESATA DA MISCELARE: CARICO COMPLETATO, ATTESA SCARICO: " + this.FDB_CD_ATTESA_SCARICO.value + " s";
        else
          return "PESATA DA MISCELARE: CARICO COMPLETATO, ATTESA SCARICO";
      case 3:
        return "PESATA DA MISCELARE: SCARICO";
      case 4:
        return "PESATA DA MISCELARE: SCARICO COMPLETATO, VERIFICA RIPETIZIONI";
      //case 5:
      //  return "PESATA DA NON MISCELARE: CARICO";
      //case 6:
      //  if (this.FDB_CD_ATTESA_SCARICO != null)
      //    return "PESATA DA NON MISCELARE: CARICO COMPLETATO, ATTESA SCARICO: " + this.FDB_CD_ATTESA_SCARICO.value + " s";
      //  else
      //    return "PESATA DA NON MISCELARE: CARICO COMPLETATO, ATTESA SCARICO";
      //case 7:
      //  return "PESATA DA NON MISCELARE: SCARICO";
      //case 8:
      //  return "PESATA DA NON MISCELARE: SCARICO COMPLETATO, VERIFICA RIPETIZIONI";
      //case 9:
      //  return "ERRORE PLC";
      case 10:
        return "FINE PESATE E SCARICHI";

      default:
        return "ERRORE";
    }
  }

}
