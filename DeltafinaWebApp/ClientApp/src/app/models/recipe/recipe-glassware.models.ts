
export class RecipeGlasswareModel {
  id: string;
  progressiveId: number;
  code: string;
  name: string;
  note: string;
  isEnabled: boolean;
  isDeleted: boolean;
  materialId: string;
  material: string;
  recipeTypeId: string;
  recipeType: string;
  userId: string;
  creationDate: Date;
  lastUpdateDate: Date;

  timeMixWater: number;
  timeMixing: number;
  components: Array<RecipeWarehouseGlasswareModel>;
}

export class RecipeWarehouseGlasswareModel {
  id: string;
  recipeId: string;
  recipe: string;
  siloId: string;
  silo: string;
  materialId: string;
  material: string;
  unityOfMeasure: string;
  isEnabled: boolean;
  isDeleted: boolean;
  userId: string;
  creationDate: Date;
  lastUpdateDate: Date;
  rowIndex: number;

  quantityMix: number;
  repetition: number;
  quantityNotMix: number;
  repetitionNotMix: number;
}
