import { extend } from 'chartist';

export class KeywordDetailModel {
  id: string;
  keywordMasterId: number;
  keywordMaster: string;
  name: string;
  description: string;
  enabled: string;
  deleted: string;
  portalFarmId: string;
  portalFarm: string;
}

export class KeywordDetailMaintenanceModel extends KeywordDetailModel {
  constructor() {
    super();
    this.keywordMasterId = 1;//maintenance
    this.keywordMaster = "Maintenance";
  }
}
