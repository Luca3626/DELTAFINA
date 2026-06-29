import { v4 as uuidv4 } from 'uuid';

export class ZoneDetailModel {
  id: number;
  zoneTypeId: number;
  zoneType: string;
  name: string;
  isEnabled: string;
  isDeleted: string;
  positionOrder: number;
  note: string;
}

export class ZoneModel {
  id: number;
  name: string;
  positionOrder: number;
}

export class ZoneSelectedModel {
  id: number;
  selected: boolean;
}

export class ZoneTypeModel {
  id: number;
  description: string;
  isEnabled: string;
  isDeleted: string;
  note: string;
}
