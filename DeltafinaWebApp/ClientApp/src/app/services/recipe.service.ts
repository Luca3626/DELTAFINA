import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { RecipeGlasswareModel } from '../models/recipe/recipe-glassware.models';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  async update(recipeData: RecipeGlasswareModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/recipe/UpdateRecipe', recipeData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }

  async delete(recipeData: RecipeGlasswareModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    try {

      let response: GenericResponse = await this.http.post('/api/recipe/DeleteRecipe', recipeData, { headers }).toPromise().then(result => {
        let resp: any = result;
        return resp;
      });

      return response;

    } catch (e) {
      let resp = new GenericResponse();
      resp.status = "Failed";
      resp.value = e.message;
      return resp;
    }
  }

  async getForNew(): Promise<RecipeGlasswareModel> {
    let rValue: RecipeGlasswareModel = await this.http.get<RecipeGlasswareModel>('/api/recipe/GetForNew').toPromise();
    return rValue;
  }

  async getById(id): Promise<RecipeGlasswareModel> {
    let params = new HttpParams();
    params = params.append('recipeId', id);
    let rValue: RecipeGlasswareModel = await this.http.get<RecipeGlasswareModel>('/api/recipe/GetById', { params: params }).toPromise();
    return rValue;
  }

  async getByProgressiveId(id): Promise<RecipeGlasswareModel> {
    let params = new HttpParams();
    params = params.append('progressiveId', id);
    let rValue: RecipeGlasswareModel = await this.http.get<RecipeGlasswareModel>('/api/recipe/GetRecipeByProgressiveId', { params: params }).toPromise();
    return rValue;
  }

  async getAll(): Promise<Array<RecipeGlasswareModel>> {
    let rValue: Array<RecipeGlasswareModel> = await this.http.get<Array<RecipeGlasswareModel>>('/api/recipe/getlist').toPromise();
    return rValue;
  }

  async run(id): Promise<GenericResponse> {
    let params = new HttpParams();
    params = params.append('recipeId', id);
    let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/recipe/RunRecipe', { params: params }).toPromise();
    return rValue;
  }

}
