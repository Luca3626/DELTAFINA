//import { v4 as uuidv4 } from 'uuid';

export class TrendDetailModel {
  tagLogName: string;
  plcName: string;
  zoneName: string;
  tagPlcName: string;
  description: string;
  timeCycleDetection: string;
  countCycleDetection: number;
  timeCycleForSave: string;
  countCycleForSave: number;
  hysteresisValue: number;
  hysteresisType: string;
  minValue: number;
  maxValue: number;
  roundDigit: number;
  enabled: boolean;
  creationDate: Date;
  lastUpdateDate: Date;
  userId: string;
  lastLog: Date;
  valueType: string;
  unit: string;
}

export class TrendModel {
  tagLogName: string;
  plcName: string;
  zoneName: string;
  tagPlcName: string;
  description: string;
  timeCycleForSave: string;
  enabled: boolean;
  lastLog: Date;
  valueType: string;
  unit: string;
}

export class TrendLogModel {
  tagLogName: string;
  plcName: string;
  zoneName: string;
  tagPlcName: string;
  description: string;
  logValue: number;
  logDate: Date;
  unit: string;
}

export class TrendQueryModel {
  zoneFilterList: Array<string>;
  plcFilterList: Array<string>;
  tagLogNameList: Array<string>;
  startDate: Date;
  endDate: Date;
}

//export class ZoneSelectedModel {
//  id: number;
//  selected: boolean;
//}

//export class ZoneTypeModel {
//  id: number;
//  description: string;
//  isEnabled: string;
//  isDeleted: string;
//  note: string;
//}
