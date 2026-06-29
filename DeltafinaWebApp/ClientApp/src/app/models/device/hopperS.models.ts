import { TagsClient } from 'src/app/tags/tags-client';
//import * as delay from 'delay';

export class HopperSModel {
  public animal: string;
  public name: string;
  public description: string;

  public FDB_LL: TagsClient;

  public CMD_ESCLUDE: TagsClient;
  public CMD_ABILITA_VIBRATORE: TagsClient;
  public CMD_SIMULA_MINIMO: TagsClient;

  public SET_VELOCITA_SCARICO: TagsClient;
  //public SET_RIF_INV: TagsClient;


  constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[]) {

    this.name = name;
    this.description = description;

    this.FDB_LL = fdbTags[0];

    this.CMD_ESCLUDE = cmdTags[0];
    this.CMD_ABILITA_VIBRATORE = cmdTags[1];
    this.CMD_SIMULA_MINIMO = cmdTags[2];

    this.SET_VELOCITA_SCARICO = varieTags[0];
    //this.SET_RIF_INV = varieTags[0];
  }

}
