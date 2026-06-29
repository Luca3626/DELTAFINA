
export class AlarmModel {
  machineUser: string;
  tagName: string;
  plcName: string;
  textLang1: string;
  textLang2: string;
  textLang3: string;
  state: string;
  dateIN: Date;
  dateOUT: Date;
  DateACK: Date;
  category: string;
  zone: string;
  //isOn: boolean;
  id: number;

  constructor() {
  }
}

export class AlarmNotifyToModel {
  notifyToId: number;
  notifyToValue: string;
  notifyToRecipient: string;
  delayOnAlarm: number;
  alarmThreshold: number;
  lastUpdateDate: Date;

  constructor() {
  }
}

export class AlarmUserModel {
  userId: string;
  user: string;
  delayOnAlarm: number;
  alarmThreshold: number;
  lastUpdateDate: Date;

  constructor() {
  }
}

export class AlarmSettingModel extends AlarmModel {

  selected: boolean;
  machineUser: string;
  tagName: string;
  plcName: string;
  textLang: string;
  zone: string;
  //isOn: boolean;
  id: number;

  alarmNotifyToUserOnAlarmList: string;
  alarmNotifyToOnAlarmList: string;

  alarmNotifyToUserOnResetList: string;
  alarmNotifyToOnResetList: string;

  constructor() {
    super();
  }
}

export class AlarmSettingGroupActionModel {
  alarms: Array<AlarmSettingModel>;

  alarmNotifyToUserOnAlarmList: Array<string>;
  alarmNotifyToOnAlarmList: Array<string>;

  alarmNotifyToUserOnResetList: Array<string>;
  alarmNotifyToOnResetList: Array<string>;

  constructor() {
  }
}

export class AlarmQueryModel {
  from: Date;
  to: Date;
  queryText: string;
  state: string;

  constructor() {
  }
}
