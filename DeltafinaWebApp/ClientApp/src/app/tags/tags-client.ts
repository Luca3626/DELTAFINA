import { trigger } from '@angular/animations';
import { type } from 'os';

export enum VAR_TYPE_Enum {
  BIT,
  BYTE,
  INT16,
  UINT16,
  INT32,
  INT64,
  FLOAT,
  DOUBLE,
  STRING,
  S5TIME
}

export enum IO_Enum {
  IN,
  OUT,
  IN_OUT
}

interface ILiteEvent<T> {
  on(handler: { (data?: T): void }): void;
  off(handler: { (data?: T): void }): void;
}

class LiteEvent<T> implements ILiteEvent<T> {
  private handlers: { (data?: T): void; }[] = [];

  public on(handler: { (data?: T): void }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (data?: T): void }): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public trigger(data?: T) {
    this.handlers.slice(0).forEach(h => h(data));
  }

  public expose(): ILiteEvent<T> {
    return this;
  }
}

export class TagsClient {

  private readonly onValueChanged = new LiteEvent<object>();
  //private readonly onLogout = new LiteEvent<void>();

  public get ValueChanged() { return this.onValueChanged.expose(); }
  //public get LoggedOut() { return this.onLogout.expose(); }


  id: number;
  name: string;
  //value: object;
  address: string;
  plc_name: string;
  sequence: number;
  new_data: boolean;
  date: Date;
  time_span: string;
  client_visible: boolean;
  //SRV_VALUE: object;
  retain: boolean;
  get_retain: boolean;
  type: VAR_TYPE_Enum;
  io: IO_Enum;
  actValue: any;
  oldValue: any;

  get typeStr(): string {

    switch (this.type) {
      case 0:
        return "BIT";
      case 1:
        return "BYTE";
      case 2:
        return "INT16";
      case 3:
        return "UINT16";
      case 4:
        return "INT32";
      case 5:
        return "INT64";
      case 6:
        return "FLOAT";
      case 7:
        return "DOUBLE";
      case 8:
        return "STRING";
      case 9:
        return "S5TIME";

      default:
        return "ND";
    }
  }

  get value(): any {
    return this.actValue;
  }
  set value(value: any) {
    if (typeof value === "undefined") {
      console.log("ERROR, TAG VALUE UNDEFINED!!");
      alert('ERROR, TAG VALUE UNDEFINED!!');
    }
    else if (value == null) {
      console.log("ERROR, TAG VALUE NULL!!");
      alert('ERROR, TAG VALUE NULL!!');
    }
    else {
      //Chiamo il servizio server per la modifica del dato
      this.oldValue = this.actValue;
      this.actValue = value;
      this.onValueChanged.trigger(value);
    }

    ////Chiamo il servizio server per la modifica del dato
    //this.oldValue = this.actValue;
    //this.actValue = value;
    //this.onValueChanged.trigger(value);
  }

  constructor(id: number, name: string, address: string, plc_name: string, sequence: number, var_type: VAR_TYPE_Enum, io_type: IO_Enum) {
    this.id = id;
    this.name = name;
    this.address = address;
    //this.var_type = var_type;
    this.sequence = sequence;
    this.plc_name = plc_name;
    this.type = var_type;
    this.io = io_type;
    switch (this.type) {
      case VAR_TYPE_Enum.BIT:
        this.actValue = false;
        break;
      case VAR_TYPE_Enum.STRING:
        this.actValue = "";
        break;
      default:
        this.actValue = 0;
        break;
    }
  }

}
