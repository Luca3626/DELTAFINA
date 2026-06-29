import { TagsClient } from 'src/app/tags/tags-client';
//import * as delay from 'delay';

export class MotorModel {
  public animal: string;
  public name: string;
  public description: string;

  public ALM_FORWARD_OFF: TagsClient;
  public ALM_REVERSE_OFF: TagsClient;
  public ALM_FORWARD_STUCK: TagsClient;
  public ALM_REVERSE_STUCK: TagsClient;
  public ALM_THERMAL_BLOCK: TagsClient;
  public ALM_BREAKER: TagsClient;
  public ALM_OVERFLOW_FORWARD: TagsClient;
  public ALM_OVERFLOW_REVERSE: TagsClient;
  public ALM_CONTROL_ROTATION: TagsClient;
  public ALM_SAFETY: TagsClient;
  public ALM_FAULT_DEVICE: TagsClient;
  public ALM_SKID: TagsClient;
  public ALM_MAINTENANCE: TagsClient;
  public ALM_PTC: TagsClient;
  public ALM_FEED_INVERTER_ON: TagsClient;
  public ALM_FEED_INVERTER_OFF: TagsClient;
  public ALM_LIMIT_FORWARD: TagsClient;
  public ALM_LIMIT_REVERSE: TagsClient;
  public ALM_NO_AUT: TagsClient;

  public FDB_FORWARD: TagsClient;
  public FDB_REVERSE: TagsClient;
  public FDB_THERMAL_BLOCK: TagsClient;
  public FDB_BREAKER: TagsClient;
  public FDB_OVERFLOW_FORWARD: TagsClient;
  public FDB_OVERFLOW_REVERSE: TagsClient;
  public FDB_CONTROL_ROTATION: TagsClient;
  public FDB_PTC: TagsClient;
  public FDB_SAFETY: TagsClient;
  public FDB_LIMIT_FORWARD: TagsClient;
  public FDB_LIMIT_REVERSE: TagsClient;
  public FDB_FAULT_DEVICE: TagsClient;
  public FDB_SKID: TagsClient;
  public FDB_INV_ON: TagsClient;

  public FDB_LOC: TagsClient;
  public FDB_REM: TagsClient;
  public FDB_MAN_REM: TagsClient;
  public FDB_AUT_REM: TagsClient;
  public FDB_READY_AUT_REM: TagsClient;
  public FDB_PRES_AVVISO: TagsClient;
  public FDB_PRES_ALLARME: TagsClient;

  public STATE: TagsClient;

  //function delay(ms: number, result?: T) {
  //  return new Promise(resolve => setTimeout(() => resolve(result), ms));
  //}

  public set CMD_START_FORWARD(value) {

    //this.CMD_FWD_REV.value = false;
    this.CMD_STARTFWD.value = true;

    //(async () => {
    //  this.CMD_FWD_REV.value = false;

    //  await delay(100);

    //  this.CMD_START.value = true;
    //})();
  }

  public set CMD_START_REVERSE(value) {

    this.CMD_STARTREV.value = true;
    //this.CMD_START.value = true;

    //(async () => {
    //  this.CMD_FWD_REV.value = true;

    //  await delay(100);

    //  this.CMD_START.value = true;
    //})();
  }

  public CMD_START: TagsClient;
  public CMD_FWD_REV: TagsClient;
  public CMD_STOP: TagsClient;
  public CMD_MAN: TagsClient;
  public CMD_SEMI: TagsClient;
  public CMD_AUT: TagsClient;
  public CMD_SIMULATION: TagsClient;
  public CMD_JOG_FORWARD: TagsClient;
  public CMD_JOG_REVERSE: TagsClient;
  public CMD_RESET_ALARMS: TagsClient;
  public CMD_RESET_STARTS_1: TagsClient;
  public CMD_RESET_STARTS_2: TagsClient;
  public CMD_RESET_TRIP_1: TagsClient;
  public CMD_RESET_TRIP_2: TagsClient;

  public CMD_DISABLE_THERMAL_BLOCK: TagsClient;
  public CMD_DISABLE_CONTACTOR: TagsClient;
  public CMD_DISABLE_BREAKER: TagsClient;
  public CMD_DISABLE_CONTROL_ROTATION: TagsClient;
  public CMD_DISABLE_SAFETY: TagsClient;
  public CMD_FILTER_THERMAL_BLOCK: TagsClient;
  public CMD_FILTER_BREAKER: TagsClient;
  public CMD_FILTER_CONTROL_ROTATION: TagsClient;
  public CMD_FILTER_SKID: TagsClient;
  public CMD_FILTER_SAFETY: TagsClient;

  public CMD_STARTFWD: TagsClient;
  public CMD_STARTREV: TagsClient;
  public CMD_LOC: TagsClient;
  public CMD_REM: TagsClient;
  public CMD_RESET_SAFETY: TagsClient;

  public CMD_DISABLE_SKID: TagsClient;
  public CMD_DISABLE_OVERFLOW_FORWARD: TagsClient;
  public CMD_DISABLE_OVERFLOW_REVERSE: TagsClient;
  public CMD_DISABLE_PTC: TagsClient;
  public CMD_SERIAL_COMM: TagsClient;

  public FDB_STARTS_TRIP_1: TagsClient;
  public FDB_STARTS_TRIP_2: TagsClient;
  public FDB_STARTS_TOT: TagsClient;
  public FDB_TIME_TRIP_1: TagsClient;
  public FDB_TIME_TRIP_2: TagsClient;
  public FDB_TIME_TOT: TagsClient;
  public SET_MAINTENANCE_THRESHOLD: TagsClient;

  public SET_SOGLIA_PP: TagsClient;
  public SET_SOGLIA_MAX_TP: TagsClient

  get SET_HOURLY_MAINTENANCE_THRESHOLD() {
    return this.SET_MAINTENANCE_THRESHOLD.value;// / 3600;
  }

  set SET_HOURLY_MAINTENANCE_THRESHOLD(value) {
    this.SET_MAINTENANCE_THRESHOLD.value = value;// * 3600;
  }

  public CMD_SETPOINT: TagsClient;
  public FDB_SPEED: TagsClient;

  public Shadow: boolean = false;

  public FWD_TEXT: string = "FWD";
  public REV_TEXT: string = "REV";
  public INVERT_REV_FWD: boolean = false;

  //constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[],
  //  stateTag: TagsClient, setpointTag: TagsClient = null, currentSpeedTag: TagsClient = null) {

  constructor(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[])//,
  //stateTag: TagsClient, setpointTag: TagsClient = null, currentSpeedTag: TagsClient = null) {
  {

  //  this.base(name, description, almTags, fdbTags, cmdTags, varieTags, stateTag)

  //  this.CMD_SETPOINT = setpointTag;
  //  this.FDB_SPEED = currentSpeedTag;
  //}

  //base(name: string, description: string, almTags: TagsClient[], fdbTags: TagsClient[], cmdTags: TagsClient[], varieTags: TagsClient[], stateTag: TagsClient) {

    this.name = name;
    this.description = description;

    this.ALM_FORWARD_OFF = almTags[0]; //OK
    this.ALM_REVERSE_OFF = almTags[1]; //OK
    this.ALM_FORWARD_STUCK = almTags[2]; //OK
    this.ALM_REVERSE_STUCK = almTags[3]; //OK
    this.ALM_THERMAL_BLOCK = almTags[4]; //OK
    this.ALM_BREAKER = almTags[5]; //OK, SEZIONATORE
    this.ALM_OVERFLOW_FORWARD = almTags[6]; //OK
    this.ALM_OVERFLOW_REVERSE = almTags[7]; //OK
    this.ALM_CONTROL_ROTATION = almTags[8]; //OK
    this.ALM_SAFETY = almTags[9]; //OK, SICUREZZA LOCALE
    this.ALM_FAULT_DEVICE = almTags[10]; //OK, INVERTER
    this.ALM_SKID = almTags[11]; //OK
    this.ALM_MAINTENANCE = almTags[12]; //OK
    this.ALM_PTC = almTags[13]; //OK
    this.ALM_FEED_INVERTER_ON = almTags[14]; //MANCA
    this.ALM_FEED_INVERTER_OFF = almTags[15]; //MANCA
    this.ALM_LIMIT_FORWARD = almTags[16]; //OK
    this.ALM_LIMIT_REVERSE = almTags[17]; //OK
    this.ALM_NO_AUT = almTags[18]; //OK, NOREADYAUT

    this.FDB_FORWARD = fdbTags[0]; //OK
    this.FDB_REVERSE = fdbTags[1]; //OK
    this.FDB_THERMAL_BLOCK = fdbTags[2]; //OK
    this.FDB_BREAKER = fdbTags[3]; //OK, SEZIONATORE
    this.FDB_OVERFLOW_FORWARD = fdbTags[4]; //OK
    this.FDB_OVERFLOW_REVERSE = fdbTags[5]; //OK
    this.FDB_CONTROL_ROTATION = fdbTags[6]; //OK
    this.FDB_PTC = fdbTags[7]; //OK
    this.FDB_SAFETY = fdbTags[8]; //OK, SICUREZZA
    this.FDB_LIMIT_FORWARD = fdbTags[9]; //OK
    this.FDB_LIMIT_REVERSE = fdbTags[10]; //OK
    this.FDB_FAULT_DEVICE = fdbTags[11]; //MANCA
    this.FDB_SKID = fdbTags[12]; //OK
    this.FDB_INV_ON = fdbTags[13]; //MANCA
    this.FDB_LOC = fdbTags[14]; //NEW
    this.FDB_REM = fdbTags[15]; //NEW
    this.FDB_MAN_REM = fdbTags[16]; //NEW
    this.FDB_AUT_REM = fdbTags[17]; //NEW
    this.FDB_READY_AUT_REM = fdbTags[18]; //NEW
    this.FDB_PRES_AVVISO = fdbTags[19]; //NEW
    this.FDB_PRES_ALLARME = fdbTags[20]; //NEW
    this.FDB_SPEED = fdbTags[21]; //NEW, VelAct

    this.CMD_START = cmdTags[0]; //MANCA
    this.CMD_FWD_REV = cmdTags[1]; //MANCA
    this.CMD_STOP = cmdTags[2]; //OK
    this.CMD_MAN = cmdTags[3]; //OK, MANREM
    this.CMD_SEMI = cmdTags[4]; //MANCA
    this.CMD_AUT = cmdTags[5]; //OK, AUTREM
    this.CMD_SIMULATION = cmdTags[6]; //OK
    this.CMD_JOG_FORWARD = cmdTags[7]; //MANCA
    this.CMD_JOG_REVERSE = cmdTags[8]; //MANCA
    this.CMD_RESET_ALARMS = cmdTags[9]; //OK
    this.CMD_RESET_STARTS_1 = cmdTags[10]; //OK
    this.CMD_RESET_STARTS_2 = cmdTags[11]; //OK
    this.CMD_RESET_TRIP_1 = cmdTags[12]; //OK
    this.CMD_RESET_TRIP_2 = cmdTags[13]; //OK
    this.CMD_DISABLE_THERMAL_BLOCK = cmdTags[14]; //OK
    this.CMD_DISABLE_CONTACTOR = cmdTags[15]; //OK
    this.CMD_DISABLE_BREAKER = cmdTags[16]; //OK, sezionatore
    this.CMD_DISABLE_CONTROL_ROTATION = cmdTags[17]; //OK
    this.CMD_DISABLE_SAFETY = cmdTags[18]; //OK, SICUREZZA LOCALE, MASSIMA ATTENZIONE!!, LASCIARLO SOLO A TAG NON FACILMENTE RAGGIUNGIBILE!!
    this.CMD_FILTER_THERMAL_BLOCK = cmdTags[19]; //MANCA
    this.CMD_FILTER_BREAKER = cmdTags[20]; //MANCA
    this.CMD_FILTER_CONTROL_ROTATION = cmdTags[21]; //MANCA
    this.CMD_FILTER_SKID = cmdTags[22]; //MANCA
    this.CMD_FILTER_SAFETY = cmdTags[23]; //MANCA
    this.CMD_STARTFWD = cmdTags[24]; //NEW
    this.CMD_STARTREV = cmdTags[25]; //NEW
    this.CMD_LOC = cmdTags[26]; //NEW
    this.CMD_REM = cmdTags[27]; //NEW
    this.CMD_RESET_SAFETY = cmdTags[28]; //NEW
    this.CMD_DISABLE_SKID = cmdTags[29]; //NEW
    this.CMD_DISABLE_OVERFLOW_FORWARD = cmdTags[30]; //NEW
    this.CMD_DISABLE_OVERFLOW_REVERSE = cmdTags[31]; //NEW
    this.CMD_DISABLE_PTC = cmdTags[32]; //NEW
    this.CMD_SERIAL_COMM = cmdTags[33];

    this.FDB_STARTS_TRIP_1 = varieTags[0]; //OK
    this.FDB_STARTS_TRIP_2 = varieTags[1]; //OK
    this.FDB_STARTS_TOT = varieTags[2]; //OK
    this.FDB_TIME_TRIP_1 = varieTags[3]; //OK
    this.FDB_TIME_TRIP_2 = varieTags[4]; //OK
    this.FDB_TIME_TOT = varieTags[5]; //OK
    this.SET_MAINTENANCE_THRESHOLD = varieTags[6]; //OK, SogliaSecondi_Trip1
    this.STATE = varieTags[7];//OK STATO
    this.CMD_SETPOINT = varieTags[8]; //OK, ManRefSpeed
    this.SET_SOGLIA_PP = varieTags[9];
    this.SET_SOGLIA_MAX_TP = varieTags[10];
    
  }

  get STATE_STR(): string {
    switch (this.STATE.value) {
      case 103:
        return "FERMO IN MANUALE";
      case 104:
        return "MODALITA' NON SELEZIONATA";
      case 105:
        return "NON ABILITATO";

      case 107:
        return "FERMO IN LOCALE";
      case 108:
        return "TENTATIVO AVVIAMENTO IN LOCALE";
      case 109:
        return "TENTATIVO AVVIAMENTO IN LOCALE REV";
      case 110:
        return "AVVIATO IN LOCALE";
      case 111:
        return "AVVIATO IN LOCALE REV";
      case 112:
        return "FERMO IN MANUALE DA REMOTO";
      case 113:
        return "TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO";
      case 114:
        return "TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO REV";
      case 115:
        return "AVVIATO IN MANUALE DA REMOTO";
      case 116:
        return "AVVIATO IN MANUALE DA REMOTO REV";
      case 117:
        return "ATTESA START IN AUTOMATICO DA REMOTO";
      case 118:
        return "FERMO IN AUTOMATICO DA REMOTO";
      case 119:
        return "TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO";
      case 120:
        return "TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO REV";
      case 121:
        return "AVVIATO IN AUTOMATICO DA REMOTO";
      case 122:
        return "AVVIATO IN AUTOMATICO DA REMOTO REV";

      case 0:
        return "FERMO IN MANUALE";
      case 1:
        return "FERMO IN AUTOMATICO";
      case 2:
        return "FERMO IN SEMIAUTOMATICO";
      case 3:
        return "ATTESA START IN MANUALE";
      case 4:
        return "ATTESA START IN AUTOMATICO";
      case 5:
        return "ATTESA START IN SEMIAUTOMATICO";
      case 6:
        return "AVVIAMENTO JOG RIUSCITO";
      case 7:
        return "AVVIAMENTO JOG REV RIUSCITO";
      case 8:
        return "TENTATO AVVIAMENTO JOG";
      case 9:
        return "TENTATO AVVIAMENTO JOG REV";
      case 10:
        return "AVVIATO IN MANUALE";
      case 11:
        return "AVVIATO IN AUTOMATICO";
      case 12:
        return "AVVIATO IN SEMIAUTOMATICO";
      case 13:
        return "AVVIATO IN MANUALE REV";
      case 14:
        return "AVVIATO IN AUTOMATICO REV";
      case 15:
        return "AVVIATO IN SEMIAUTOMATICO REV";
      case 16:
        return "FERMO";

      case 50:
        return "MANCATA RISPOSTA CONTATTORE (FWD)";
      case 51:
        return "MANCATA RISPOSTA CONTATTORE (REV)";
      case 52:
        return "SEZIONATORE APERTO";
      case 53:
        return "CONTROLLO SBANDAMENTO";
      case 54:
        return "TROPPO PIENO (FWD)";
      case 55:
        return "CONTROLLO GIRI";
      case 56:
        return "BLOCCO TERMICO";
      case 57:
        return "FAULT INVERTER";
      case 58:
        return "SICUREZZA CARTER";
      case 59:
        return "TROPPO PIENO (REV)";
      case 60:
        return "CONTATTORE BLOCCATO (FWD)";
      case 61:
        return "CONTATTORE BLOCCATO (REV)";
      case 62:
        return "INVERTER NON RISPONDE";
      case 63:
        return "INVERTER SEMPRE ON";
      case 64:
        return "SICUREZZA DI CAMPO";
      case 65:
        return "CIRCUITO DI SICUREZZA NON RIPRISTINATO";
      case 66:
        return "PASTICCA TERMICA";
      case 67:
        return "EXTRACORSA (FWD)";
      case 68:
        return "EXTRACORSA (REV)";
      case 69:
        return "CARTER APERTI";
      case 70:
        return "NON IN AUTOMATICO";
      case 71:
        return "SICUREZZA GLOBALE";
      case 72:
        return "SICUREZZA DI ZONA";
      case 73:
        return "SICUREZZA UTENZA";
      case 74:
        return "FAULT ATTUATORE";

      default:
        return "ERRORE";
    }
  }

  get LabelStyle(): string {
    switch (this.STATE.value) {
      //manuale e semiautomatico
      case 103:
      case 0:
      case 2:
      case 3:
      case 5:
      case 10:
      case 12:
      case 13:
      case 15:

      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
        return "fill:darkorange;font-weight:bold;cursor:pointer";

      //altro
      case 104:
      case 105:
        return "fill:black;font-weight:normal;cursor:pointer";

      //Automatico
      case 1:
      case 4:
      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:
      case 16:

      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return "fill:blue;font-weight:normal;cursor:pointer";

      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
        return "fill:red;font-weight:bold;cursor:pointer";

      default:
        return "fill:red;font-weight:bold;cursor:pointer";
    }
  }

  get HasBypass(): boolean {
    var rValue = false;

    if (this.CMD_SIMULATION != null && this.CMD_SIMULATION.value)
      rValue = true;
    if (this.CMD_DISABLE_THERMAL_BLOCK != null && this.CMD_DISABLE_THERMAL_BLOCK.value)
      rValue = true;
    if (this.CMD_DISABLE_CONTACTOR != null && this.CMD_DISABLE_CONTACTOR.value)
      rValue = true;
    if (this.CMD_DISABLE_BREAKER != null && this.CMD_DISABLE_BREAKER.value)
      rValue = true;
    if (this.CMD_DISABLE_CONTROL_ROTATION != null && this.CMD_DISABLE_CONTROL_ROTATION.value)
      rValue = true;
    if (this.CMD_DISABLE_SAFETY != null && this.CMD_DISABLE_SAFETY.value)
      rValue = true;
    if (this.CMD_FILTER_THERMAL_BLOCK != null && this.CMD_FILTER_THERMAL_BLOCK.value)
      rValue = true;
    if (this.CMD_FILTER_BREAKER != null && this.CMD_FILTER_BREAKER.value)
      rValue = true;
    if (this.CMD_FILTER_CONTROL_ROTATION != null && this.CMD_FILTER_CONTROL_ROTATION.value)
      rValue = true;
    if (this.CMD_FILTER_SKID != null && this.CMD_FILTER_SKID.value)
      rValue = true;
    if (this.CMD_FILTER_SAFETY != null && this.CMD_FILTER_SAFETY.value)
      rValue = true;

    if (this.CMD_DISABLE_SKID != null && this.CMD_DISABLE_SKID.value)
      rValue = true;
    if (this.CMD_DISABLE_OVERFLOW_FORWARD != null && this.CMD_DISABLE_OVERFLOW_FORWARD.value)
      rValue = true;
    if (this.CMD_DISABLE_OVERFLOW_REVERSE != null && this.CMD_DISABLE_OVERFLOW_REVERSE.value)
      rValue = true;
    if (this.CMD_DISABLE_PTC != null && this.CMD_DISABLE_PTC.value)
      rValue = true;

    return rValue;
  }

  get RUNNING(): boolean {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        return false;

      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:

      case 108:
      case 109:
      case 110:
      case 111:
      case 113:
      case 114:
      case 115:
      case 116:
      case 119:
      case 120:
      case 121:
      case 122:
        return true;

      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 71:
      case 72:
      case 73:
      case 74:
        return false;

      case 70:
        if (this.FDB_FORWARD.value || this.FDB_REVERSE.value)
          return true;
        else
          return false;

      default:
        return false;
    }
  }

  get OUT_ALARM(): boolean {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
        return false;

      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:

      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return false;

      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
        return true;

      default:
        return false;
    }
  }

  get SVG_PUMP(): string {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        return "../../assets/svg/groov/pump1_blue.svg";

      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:

      case 119:
      case 120:
      case 121:
      case 122:
        return "../../assets/svg/groov/pump1_green.svg";

      case 10:
      case 12:
      case 13:
      case 15:

      case 108:
      case 109:
      case 110:
      case 111:
      case 113:
      case 114:
      case 115:
      case 116:
        return "../../assets/svg/groov/pump1_yellow.svg";

      default:
        return "../../assets/svg/groov/pump1_blue.svg";
    }
  }

  get SVG_PUMP_ALM(): string {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        return "../../assets/svg/groov/pump1_blue.svg";

      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:

      case 119:
      case 120:
      case 121:
      case 122:
        return "../../assets/svg/groov/pump1_green.svg";

      case 10:
      case 12:
      case 13:
      case 15:

      case 108:
      case 109:
      case 110:
      case 111:
      case 113:
      case 114:
      case 115:
      case 116:
        return "../../assets/svg/groov/pump1_yellow.svg";

      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
        return "../../assets/svg/groov/pump1_red.svg";

      default:
        return "../../assets/svg/groov/pump1_red.svg";
    }
  }

  get SVG_MIXER(): string {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        return "../../assets/svg/groov/mixer1_blu.svg";

      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:

      case 119:
      case 120:
      case 121:
      case 122:
        return "../../assets/svg/groov/mixer1_green.svg";

      case 10:
      case 12:
      case 13:
      case 15:
        return "../../assets/svg/groov/mixer1_yellow.svg";

      default:
        return "../../assets/svg/groov/mixer1_blu.svg";
    }
  }

  get SVG_MIXER_ALM(): string {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        return "../../assets/svg/groov/mixer1_blu.svg";

      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:

      case 119:
      case 120:
      case 121:
      case 122:
        return "../../assets/svg/groov/mixer1_green.svg";

      case 10:
      case 12:
      case 13:
      case 15:

      case 108:
      case 109:
      case 110:
      case 111:
      case 113:
      case 114:
      case 115:
      case 116:
        return "../../assets/svg/groov/mixer1_yellow.svg";

      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
        return "../../assets/svg/groov/mixer1_red.svg";

      default:
        return "../../assets/svg/groov/mixer1_red.svg";
    }
  }

  get SVG_MOTOR(): string {
    if (this.STATE != null) {
      switch (+this.STATE.value) {

        case 103:
        case 104:
        case 105:
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 16:

        case 107:
        case 112:
        case 117:
        case 118:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_blue.svg";
          else
            return "../../assets/svg/groov/motor2_blue.svg";

        case 6:
        case 7:
        case 8:
        case 9:
        case 11:
        case 14:

        case 119:
        case 120:
        case 121:
        case 122:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_green.svg";
          else
            return "../../assets/svg/groov/motor2_green.svg";

        case 10:
        case 12:
        case 13:
        case 15:

        case 108:
        case 109:
        case 110:
        case 111:
        case 113:
        case 114:
        case 115:
        case 116:
          return "../../assets/svg/groov/motor2_yellow.svg";

        case 70:
          if (this.RUNNING) {
            if (this.Shadow)
              return "../../assets/svg/groov/motor2_yellow.svg";
            else
              return "../../assets/svg/groov/motor2_yellow.svg";
          }
          else {
            if (this.Shadow)
              return "../../assets/svg/groov/motor2_shadow_blue.svg";
            else
              return "../../assets/svg/groov/motor2_blue.svg";
          }

        default:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_blue.svg";
          else
            return "../../assets/svg/groov/motor2_blue.svg";
      }
    }
    else
      return "../../assets/svg/groov/motor2_blue.svg";
  }

  get SVG_MOTOR_ALM(): string {
    if (this.STATE != null) {
      switch (+this.STATE.value) {

        case 103:
        case 104:
        case 105:
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 16:

        case 107:
        case 112:
        case 117:
        case 118:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_blue.svg";
          else
            return "../../assets/svg/groov/motor2_blue.svg";

        case 6:
        case 7:
        case 8:
        case 9:
        case 11:
        case 14:

        case 119:
        case 120:
        case 121:
        case 122:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_green.svg";
          else
            return "../../assets/svg/groov/motor2_green.svg";

        case 10:
        case 12:
        case 13:
        case 15:

        case 108:
        case 109:
        case 110:
        case 111:
        case 113:
        case 114:
        case 115:
        case 116:
          return "../../assets/svg/groov/motor2_yellow.svg";

        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 71:
        case 72:
        case 73:
        case 74:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_red.svg";
          else
            return "../../assets/svg/groov/motor2_red.svg";

        case 70:
          if (!this.RUNNING) {
            if (this.Shadow)
              return "../../assets/svg/groov/motor2_shadow_red.svg";
            else
              return "../../assets/svg/groov/motor2_red.svg";
          }
          else
            return "../../assets/svg/groov/motor2_yellow.svg";

        default:
          if (this.Shadow)
            return "../../assets/svg/groov/motor2_shadow_red.svg";
          else
            return "../../assets/svg/groov/motor2_red.svg";
      }
    }
    else {
      if (this.Shadow)
        return "../../assets/svg/groov/motor2_shadow_blue.svg";
      else
        return "../../assets/svg/groov/motor2_blue.svg";
    }
  }

  get SVG_BLOWER(): string {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        if (this.Shadow)
          return "../../assets/svg/groov/blower_blue.svg";
        else
          return "../../assets/svg/groov/blower_blue.svg";

      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:

      case 119:
      case 120:
      case 121:
      case 122:
        return "../../assets/svg/groov/blower_green.svg";

      case 10:
      case 12:
      case 13:
      case 15:

      case 108:
      case 109:
      case 110:
      case 111:
      case 113:
      case 114:
      case 115:
      case 116:
        return "../../assets/svg/groov/blower_yellow.svg";

      default:
        if (this.Shadow)
          return "../../assets/svg/groov/blower_blue.svg";
        else
          return "../../assets/svg/groov/blower_blue.svg";
    }
  }

  get SVG_BLOWER_ALM(): string {
    switch (+this.STATE.value) {

      case 103:
      case 104:
      case 105:
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 16:

      case 107:
      case 112:
      case 117:
      case 118:
        if (this.Shadow)
          return "../../assets/svg/groov/blower_blue.svg";
        else
          return "../../assets/svg/groov/blower_blue.svg";

      case 6:
      case 7:
      case 8:
      case 9:
      case 11:
      case 14:

      case 119:
      case 120:
      case 121:
      case 122:
        return "../../assets/svg/groov/blower_green.svg";

      case 10:
      case 12:
      case 13:
      case 15:

      case 108:
      case 109:
      case 110:
      case 111:
      case 113:
      case 114:
      case 115:
      case 116:
        return "../../assets/svg/groov/blower_yellow.svg";

      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
        if (this.Shadow)
          return "../../assets/svg/groov/blower_red.svg";
        else
          return "../../assets/svg/groov/blower_red.svg";

      default:
        if (this.Shadow)
          return "../../assets/svg/groov/blower_red.svg";
        else
          return "../../assets/svg/groov/blower_red.svg";
    }
  }

}
