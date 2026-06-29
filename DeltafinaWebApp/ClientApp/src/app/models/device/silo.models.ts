import { TagsClient } from 'src/app/tags/tags-client';
//import * as delay from 'delay';

export class SiloModel {
  public animal: string;
  public name: string;
  public description: string;

  public ALM_RD: TagsClient;

  public FDB_RD_VAL_ACT: TagsClient;
  public FDB_RD_VOLUME_ACT: TagsClient;
  public FDB_RD_PESO_ACT: TagsClient;
  public FDB_PERCENTAGE_ACT: TagsClient;
  public FDB_COUNT_DOWN_TIME_NUOVO_CARICO: TagsClient;
  public FDB_FC: TagsClient;
  public FDB_HL: TagsClient;
  public FDB_SOVRAPRESSIONE_OK: TagsClient;
  public FDB_BOCCHETTONE_IMPEGNATO: TagsClient;
  public FDB_PRESSIONE_FILTRO_CARICO_ACT: TagsClient;
  public FDB_STATO_CARICO: TagsClient;

  public CMD_ABILITA_SILO: TagsClient;
  public CMD_ABILITA_RIEMPIMENTO: TagsClient;

  public SET_RD_VAL_A_VUOTO: TagsClient;
  public SET_RD_VAL_CONO_ALTO: TagsClient;
  public SET_RD_VAL_FILO_HHL: TagsClient;
  public SET_RD_VOLUME_CONO_ALTO: TagsClient;
  public SET_RD_VOLUME_FILO_HHL: TagsClient;
  public SET_DENSITA_PRODOTTO: TagsClient;
  public SET_RIF_INV_LENTO: TagsClient;
  public SET_RIF_INV_VELOCE: TagsClient;
  public SET_VOLO: TagsClient;
  public SET_P_RALLENTAMENTO: TagsClient;
  public SET_HL: TagsClient;
  public SET_SOGLIA_ALLARME_FILTRO_CARICO: TagsClient;
  public SET_MOD_SP: TagsClient;
  public SET_T_PAUSA: TagsClient;
  public SET_T_LAVORO: TagsClient;

  constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[]) {

    this.name = name;
    this.description = description;

    this.ALM_RD = almTags[0];

    this.FDB_RD_VAL_ACT = fdbTags[0];
    this.FDB_RD_VOLUME_ACT = fdbTags[1];
    this.FDB_RD_PESO_ACT = fdbTags[2];
    this.FDB_PERCENTAGE_ACT = fdbTags[3];
    this.FDB_COUNT_DOWN_TIME_NUOVO_CARICO = fdbTags[4];
    this.FDB_FC = fdbTags[5];
    this.FDB_HL = fdbTags[6];
    this.FDB_SOVRAPRESSIONE_OK = fdbTags[7];
    this.FDB_BOCCHETTONE_IMPEGNATO = fdbTags[8];
    this.FDB_PRESSIONE_FILTRO_CARICO_ACT = fdbTags[9];
    this.FDB_STATO_CARICO = fdbTags[10];

    this.CMD_ABILITA_SILO = cmdTags[0];
    this.CMD_ABILITA_RIEMPIMENTO = cmdTags[1];

    this.SET_RD_VAL_A_VUOTO = varieTags[0];
    this.SET_RD_VAL_CONO_ALTO = varieTags[1];
    this.SET_RD_VAL_FILO_HHL = varieTags[2];
    this.SET_RD_VOLUME_CONO_ALTO = varieTags[3];
    this.SET_RD_VOLUME_FILO_HHL = varieTags[4];
    this.SET_DENSITA_PRODOTTO = varieTags[5];
    this.SET_RIF_INV_LENTO = varieTags[6];
    this.SET_RIF_INV_VELOCE = varieTags[7];
    this.SET_VOLO = varieTags[8];
    this.SET_P_RALLENTAMENTO = varieTags[9];
    this.SET_HL = varieTags[10];
    this.SET_SOGLIA_ALLARME_FILTRO_CARICO = varieTags[11];
    this.SET_MOD_SP = varieTags[12];
    this.SET_T_PAUSA = varieTags[13];
    this.SET_T_LAVORO = varieTags[14];
    }

    /*
     * "1 - PRONTO PER ABILITAZIONE
        2 - CARICO ABILITATO, ATTESA IMPEGNO BOCCHETTONE
        3 - AVVIAMENTO, ATTESA ASPIRATORE
        4 - CARICO IN CORSO
        5 - PULIZIA
        10 - CARICO NON EFFETTUABILE PER TROPPO PIENO DIGITALE
        11 - CARICO NON EFFETTUABILE PER TROPPO PIENO ANALOGICO
        12 - CARICO NON EFFETTUABILE PER ALTA PRESSIONE SILO
        13 - CARICO NON EFFETTUABILE PER ASPIRATORE IN ALLARME"

        */

    get StatoCaricoStr(): string {
        switch (+this.FDB_STATO_CARICO.value) {
            case 1:
                return "PRONTO PER ABILITAZIONE";
            case 2:
                return "CARICO ABILITATO, ATTESA IMPEGNO BOCCHETTONE";
            case 3:
                return "AVVIAMENTO, ATTESA ASPIRATORE";
            case 4:
                return "CARICO IN CORSO";
            case 5:
                return "PULIZIA";
            case 10:
                return "CARICO NON EFFETTUABILE PER TROPPO PIENO DIGITALE";
            case 11:
                return "CARICO NON EFFETTUABILE PER TROPPO PIENO ANALOGICO";
            case 12:
                return "CARICO NON EFFETTUABILE PER ALTA PRESSIONE SILO";
            case 13:
                return "CARICO NON EFFETTUABILE PER ASPIRATORE IN ALLARME";

            default:
                return "ERRORE PLC";
        }
    }

}
