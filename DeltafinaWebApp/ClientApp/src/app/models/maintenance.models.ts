import { ResultDisplayValue } from '../models/help.models';

export class MaintenanceActivityDetailModel {
  id: string;
  registrationDate: Date;
  description: string;
  planned: boolean;
  state: string;
  planningId: string;
  fromDate: Date;
  toDate: Date;
  repetitionTypeId: number;
  repetitionType: string;
  adviseTypeId: number;
  adviseType: string;
  users: Array<any>;
  contacts: Array<any>;
  otherUploadedFiles: Array<any>;
  note: string;
  toDoSended: boolean;
  completedSended: boolean;
}

export class MaintenanceActivityModel {
  id: string;
  description: string;
  planned: string;
  state: string;
  fromDate: string;
  toDate: string;
  repetitionType: string;
  adviseType: string;
  users: Array<any>;
  contacts: Array<any>;
  toDoSended: boolean;
  completedSended: boolean;
  //deadlineTypeId: number;//0-non scaduta; 1-in corso; 2-scaduta
}
