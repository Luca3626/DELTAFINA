
export class RecipeModel {
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
}

export class RecipeWarehouseModel {
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
}
