//import { v4 as uuidv4 } from 'uuid';

export class GenericResponse {
  status: string = "";
  value: object = new Object();
}

export class DaysOfWeekModel {
  id: number = 0;
  shortName: string = "";
}

export class SpecialDaysModel {
  id: number = 0;
  name: string = "";
  day: number = 0;
  month: number = 0;
  positionOrder: number = 0;
  userId: string;//uuidv4();
}

export class ValueLabelDisableModel {
  value: string;
  label: string;
  disabled: boolean;
}

export class DaysSelectedModel {
  id: number = 0;
  name: string = "";
  selected: boolean = false;
}

export class TimeModel {
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
}

export class ResultIntValue {
  value: number = 0;
  label: string = "";
}

export class ResultIdName {
  id: string;
  name: string;
}

export class ResultDisplayValue {
  display: string;
  value: string;
}
