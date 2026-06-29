import { TagsClient } from 'src/app/tags/tags-client';

export class ValveModel {
  public animal: string;
  public name: string;
  public nameTag: string;
  public description: string;

  public ALM_OPEN: TagsClient;
  public ALM_CLOSE: TagsClient;
  public ALM_STUCK_OPEN_CLOSE: TagsClient;
  public ALM_NO_AUT: TagsClient;

  public FDB_OPEN: TagsClient;
  public FDB_CLOSE: TagsClient;
  public FDB_LIMIT_SWITCH_OPEN: TagsClient;
  public FDB_LIMIT_SWITCH_CLOSE: TagsClient;

  public FDB_LOC: TagsClient;
  public FDB_REM: TagsClient;
  public FDB_MAN_REM: TagsClient;
  public FDB_AUT_REM: TagsClient;
  public FDB_READY_AUT_REM: TagsClient;
  public FDB_PRES_AVVISO: TagsClient;
  public FDB_PRES_ALLARME: TagsClient;

  public STATE: TagsClient;

  public CMD_MAN: TagsClient;
  public CMD_SEMI: TagsClient;
  public CMD_AUT: TagsClient;
  public CMD_OPEN: TagsClient;
  public CMD_CLOSE: TagsClient;
  public CMD_SIMULATION: TagsClient;

  public CMD_JOG_OPEN: TagsClient;
  public CMD_JOG_CLOSE: TagsClient;
  public CMD_RESET_ALARM: TagsClient;
  public CMD_RESET_STARTS_1: TagsClient;
  public CMD_RESET_STARTS_2: TagsClient;
  public CMD_RESET_TRIP_1: TagsClient;
  public CMD_RESET_TRIP_2: TagsClient;
  public CMD_DISABLE_LIMIT_SWITCH_OPEN: TagsClient;
  public CMD_DISABLE_LIMIT_SWITCH_CLOSE: TagsClient;

  public CMD_LOC: TagsClient;
  public CMD_REM: TagsClient;


  constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[], nameTag: string = null) {

    this.name = name;
    this.nameTag = nameTag;
    this.description = description;

    if (nameTag == null)
      this.nameTag = name;

    this.ALM_OPEN = almTags[0]; //OK
    this.ALM_CLOSE = almTags[1]; //OK
    this.ALM_STUCK_OPEN_CLOSE = almTags[2]; //OK
    this.ALM_NO_AUT = almTags[3]; //OK, NOREADYAUT

    this.FDB_OPEN = fdbTags[0]; //OK
    this.FDB_CLOSE = fdbTags[1]; //OK
    this.FDB_LIMIT_SWITCH_OPEN = fdbTags[2]; //OK
    this.FDB_LIMIT_SWITCH_CLOSE = fdbTags[3]; //OK

    this.FDB_LOC = fdbTags[4]; //NEW
    this.FDB_REM = fdbTags[5]; //NEW
    this.FDB_MAN_REM = fdbTags[6]; //NEW
    this.FDB_AUT_REM = fdbTags[7]; //NEW
    this.FDB_READY_AUT_REM = fdbTags[8]; //NEW
    this.FDB_PRES_AVVISO = fdbTags[9]; //NEW
    this.FDB_PRES_ALLARME = fdbTags[10]; //NEW

    this.CMD_MAN = cmdTags[0]; //OK, MANREM
    this.CMD_SEMI = cmdTags[1]; //MANCA
    this.CMD_AUT = cmdTags[2]; //OK, AUTREM
    this.CMD_OPEN = cmdTags[3]; //OK
    this.CMD_CLOSE = cmdTags[4]; //OK
    this.CMD_SIMULATION = cmdTags[5]; //OK

    this.CMD_JOG_OPEN = cmdTags[6]; //OK
    this.CMD_JOG_CLOSE = cmdTags[7]; //OK
    this.CMD_RESET_ALARM = cmdTags[8]; //OK
    this.CMD_RESET_STARTS_1 = cmdTags[9]; //OK
    this.CMD_RESET_STARTS_2 = cmdTags[10]; //OK
    this.CMD_RESET_TRIP_1 = cmdTags[11]; //OK
    this.CMD_RESET_TRIP_2 = cmdTags[12]; //OK
    this.CMD_DISABLE_LIMIT_SWITCH_OPEN = cmdTags[13]; //OK
    this.CMD_DISABLE_LIMIT_SWITCH_CLOSE = cmdTags[14]; //OK

    this.CMD_LOC = cmdTags[15]; //NEW
    this.CMD_REM = cmdTags[16]; //NEW

    this.STATE = varieTags[0]; //OK
  }

  get IsOpen(): boolean {
    return this.FDB_LIMIT_SWITCH_OPEN.value;
  }

  get STATE_STR(): string {
    switch (this.STATE.value) {
      case 102:
        return "MODALITA' NON SELEZIONATA ";
      case 104:
        return "NON ABILITATA";

      case 128:
        return "CHIUSA IN LOCALE";
      case 129:
        return "APERTA IN LOCALE";
      case 130:
        return "TENTATIVO APERTURA IN LOCALE";
      case 131:
        return "TENTATIVO CHIUSURA IN LOCALE";
      case 132:
        return "CHIUSA IN MANUALE DA REMOTO";
      case 133:
        return "APERTA IN MANUALE DA REMOTO";
      case 134:
        return "TENTATIVO APERTURA IN MANUALE DA REMOTO";
      case 135:
        return "TENTATIVO CHIUSURA IN MANUALE DA REMOTO";
      case 136:
        return "CHIUSA IN AUTOMATICO DA REMOTO";
      case 137:
        return "ATTESA START IN AUTOMATICO DA REMOTO";
      case 138:
        return "APERTA IN AUTOMATICO DA REMOTO";
      case 139:
        return "TENTATIVO APERTURA IN AUTOMATICO DA REMOTO";
      case 140:
        return "TENTATIVO CHIUSURA IN AUTOMATICO DA REMOTO";

      case 20:
        return "CHIUSA IN MANUALE";
      case 21:
        return "CHIUSA IN AUTOMATICO";
      case 22:
        return "CHIUSA IN SEMIAUTOMATICO";
      case 23:
        return "APERTA IN MANUALE";
      case 24:
        return "APERTA IN AUTOMATICO";
      case 25:
        return "APERTA IN SEMIAUTOMATICO";
      case 26:
        return "APERTURA JOG RIUSCITA";
      case 27:
        return "CHIUSURA JOG RIUSCITA";
      case 28:
        return "TENTATA APERTURA JOG";
      case 29:
        return "TENTATA CHIUSURA JOG";
      case 30:
        return "ATTESA START IN MANUALE";
      case 31:
        return "ATTESA START IN AUTOMATICO";
      case 32:
        return "ATTESA START IN SEMIAUTOMATICO";
      case 33:
        return "APRENDO IN MANUALE";
      case 34:
        return "APRENDO IN AUTOMATICO";
      case 35:
        return "APRENDO IN SEMIAUTOMATICO";
      case 36:
        return "CHIUDENDO IN MANUALE";
      case 37:
        return "CHIUDENDO IN AUTOMATICO";
      case 38:
        return "CHIUDENDO IN SEMIAUTOMATICO";

      case 45:
        return "POSIZIONE NON DEFINITA IN MANUALE";
      case 46:
        return "POSIZIONE NON DEFINITA IN SEMIAUTOMATICO";
      case 47:
        return "POSIZIONE NON DEFINITA IN AUTOMATICO";

      case 70:
        return "NON IN AUTOMATICO";

      case 80:
        return "ANOMALIA APERTURA";
      case 81:
        return "ANOMALIA CHIUSURA";
      case 82:
        return "ANOMALIA APERTURA CHIUSURA";
      case 83:
        return "ANOMALIA APERTURA CHIUSURA (HOME)";

      default:
        return "ERRORE";
    }
  }

  get LabelStyle(): string {
    switch (this.STATE.value) {
      //manuale e semiautomatico
      case 20:
      case 22:
      case 23:
      case 25:
      case 30:
      case 32:
      case 33:
      case 35:
      case 36:
      case 38:
      case 45:
      case 46:

      case 128:
      case 129:
      case 130:
      case 131:
      case 132:
      case 133:
      case 134:
      case 135:
        return "fill:darkorange;font-weight:bold;cursor:pointer";

      //altro
      case 102:
      case 104:
        return "fill:black;font-weight:normal;cursor:pointer";

      //Automatico
      case 21:
      case 24:
      case 26:
      case 27:
      case 28:
      case 29:
      case 31:
      case 34:
      case 37:
      case 47:

      case 136:
      case 137:
      case 138:
      case 139:
      case 140:
        return "fill:blue;font-weight:normal;cursor:pointer";

      case 70:
      case 80:
      case 81:
      case 82:
      case 83:
        return "fill:red;font-weight:bold;cursor:pointer";

      default:
        return "fill:red;font-weight:bold;cursor:pointer";
    }
  }

  get HasBypass(): boolean {
    var rValue = false;

    if (this.CMD_SIMULATION != null && this.CMD_SIMULATION.value)
      rValue = true;
    if (this.CMD_DISABLE_LIMIT_SWITCH_OPEN != null && this.CMD_DISABLE_LIMIT_SWITCH_OPEN.value)
      rValue = true;
    if (this.CMD_DISABLE_LIMIT_SWITCH_CLOSE != null && this.CMD_DISABLE_LIMIT_SWITCH_CLOSE.value)
      rValue = true;

    return rValue;
  }

  get SVG_2W_SIMPLE(): string {
    switch (+this.STATE.value) {

      case 102:
      case 104:
      case 20:
      case 21:
      case 22:
      case 27:
      case 29:
      case 30:
      case 31:
      case 32:
      case 36:
      case 37:
      case 38:
      case 45:
      case 46:
      case 47:

      case 128:
      case 132:
      case 136:
      case 137:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_blue.svg";

      case 23:
      case 25:
      case 33:
      case 35:

      case 129:
      case 130:
      case 131:
      case 133:
      case 134:
      case 135:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_yellow.svg";

      case 24:
      case 26:
      case 28:
      case 34:

      case 138:
      case 139:
      case 140:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_green.svg";

      default:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_blue.svg";
    }
  }

  get SVG_2W_SIMPLE_ALM(): string {
    switch (+this.STATE.value) {

      case 102:
      case 104:
      case 20:
      case 21:
      case 22:
      case 27:
      case 29:
      case 30:
      case 31:
      case 32:
      case 36:
      case 37:
      case 38:
      case 45:
      case 46:
      case 47:

      case 128:
      case 132:
      case 136:
      case 137:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_blue.svg";

      case 23:
      case 25:
      case 33:
      case 35:

      case 129:
      case 130:
      case 131:
      case 133:
      case 134:
      case 135:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_yellow.svg";

      case 24:
      case 26:
      case 28:
      case 34:

      case 138:
      case 139:
      case 140:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_green.svg";

      case 80:
      case 81:
      case 82:
      case 83:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_red.svg";

      default:
        return "../../assets/svg/groov/valve_3d_common2_nopipe_red.svg";
    }
  }

  get SVG_3W_SIMPLE(): string {
    switch (+this.STATE.value) {

      case 102:
      case 104:
      case 20:
      case 21:
      case 22:
      case 27:
      case 29:
      case 30:
      case 31:
      case 32:
      case 36:
      case 37:
      case 38:
      case 45:
      case 46:
      case 47:

      case 128:
      case 132:
      case 136:
      case 137:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_blue.svg";

      case 23:
      case 24:
      case 25:
      case 26:
      case 28:
      case 33:
      case 34:
      case 35:

      case 129:
      case 130:
      case 131:
      case 133:
      case 134:
      case 135:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_green.svg";

      default:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_blue.svg";
    }
  }

  get SVG_3W_SIMPLE_ALM(): string {
    switch (+this.STATE.value) {

      case 102:
      case 104:
      case 20:
      case 21:
      case 22:
      case 27:
      case 29:
      case 30:
      case 31:
      case 32:
      case 36:
      case 37:
      case 38:
      case 45:
      case 46:
      case 47:

      case 128:
      case 132:
      case 136:
      case 137:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_blue.svg";

      case 23:
      case 24:
      case 25:
      case 26:
      case 28:
      case 33:
      case 34:
      case 35:

      case 129:
      case 130:
      case 131:
      case 133:
      case 134:
      case 135:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_green.svg";

      case 80:
      case 81:
      case 82:
      case 83:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_red.svg";

      default:
        return "../../assets/svg/groov/valve_3d_3way1_nopipe_red.svg";
    }
  }

}
