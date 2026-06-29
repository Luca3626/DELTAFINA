
export class WarehouseModel {
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
}
