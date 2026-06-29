
export class DosingDetailModel {
  id: string;
  number: number;
  endDate: Date;
  recipeId: string;
  recipeProgressiveId: number;
  recipe: string;
  destionationId: string;
  destionationProgressiveId: number;
  destionation: string;
  materialId: string;
  materialCode: string;
  material: string;
  unity: string;
  siloId: string;
  siloProgressiveId: number;
  silo: string;
  siloCode: string;
  actualSiloQuantity: number;
  scaleId: string;
  scaleProgressiveId: number;
  scale: string;
  dosedQuantity: number;
  requestedQuantityInMix: number;
  repetitionInMix: number;
  requestedQuantityNoMix: number;
  repetitionNoMix: number;
  note: string;
}

export class DosingTotalizerModel {
  id: string;
  totalNumber: number;
  registrationDate: Date;
  materialId: string;
  materialCode: string;
  material: string;
  unity: string;
  siloId: string;
  siloProgressiveId: number;
  silo: string;
  totalDosedQuantity: number;
  totalRequestedQuantity: number;
}

export class DosingWorkshiftTotalizerModel {
  id: string;
  workshift: string;
  totalNumber: number;
  registrationDate: Date;
  materialId: string;
  materialCode: string;
  material: string;
  unity: string;
  siloId: string;
  siloProgressiveId: number;
  silo: string;
  totalDosedQuantity: number;
  totalRequestedQuantity: number;
}
