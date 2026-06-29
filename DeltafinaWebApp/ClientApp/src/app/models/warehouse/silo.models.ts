import { WarehouseModel } from './warehouse.models';

export class SiloModel extends WarehouseModel {
  id: string;
  progressiveId: number;
  code: string;
  name: string;
  capacity: number;
  volume: number;
  isLoadEnabled: boolean;
  isUnloadEnabled: boolean;
  warehouseTypeId: number;
  warehouseType: string;
  materialId: string;
  materialCode: string;
  material: string;
  isDeleted: boolean;

  constructor() {
    super();
    this.warehouseTypeId = 1;
    this.warehouseType = "SILO";
  }
}
