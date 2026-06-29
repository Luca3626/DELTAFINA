export class MaterialDetailModel {
  id: string;
  materialType: string;
  materialTypeId: number;
  code: string;
  name: string;
  description: string;
  specificWeight: number;
  specificWeight_UdM: string;
  thresholdWarningTemp: number;
  thresholdAlarmTemp: number;
  unityOfMeasure: string;
  outTotalPercentageRecipe: boolean;
  isEnabled: boolean;
  isDeleted: boolean;
}

export class MaterialModel {
  id: string;
  materialTypeId: number;
  code: string;
  name: string;
  outTotalPercentageRecipe: boolean;
}
