import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel, ResultIntValue } from '../models/help.models';

@Injectable()
export class ZoneService {

  constructor(private http: HttpClient) { }

  async GetDisabledZoneACOOLList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneACOOLList').toPromise();
    return rValue;
  }

  async GetDisabledZoneACOOLListByRecipeId(recipeId): Promise<ValueLabelDisableModel> {
    let params = new HttpParams();
    params = params.append('recipeId', recipeId);
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneACOOLListByRecipeId', { params: params }).toPromise();
    return rValue;
  }

  async GetDisabledZoneUTAList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneUTAList').toPromise();
    return rValue;
  }

  async GetDisabledZoneUTAListByRecipeId(recipeId): Promise<ValueLabelDisableModel> {
    let params = new HttpParams();
    params = params.append('recipeId', recipeId);
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneUTAListByRecipeId', { params: params }).toPromise();
    return rValue;
  }

  async GetDisabledZoneRECList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneRECList').toPromise();
    return rValue;
  }

  async GetDisabledZoneRECListByRecipeId(recipeId): Promise<ValueLabelDisableModel> {
    let params = new HttpParams();
    params = params.append('recipeId', recipeId);
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneRECListByRecipeId', { params: params }).toPromise();
    return rValue;
  }

  async GetDisabledZoneLuxPLList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneLuxPLList').toPromise();
    return rValue;
  }

  async GetDisabledZoneLuxPLListByRecipeId(recipeId): Promise<ValueLabelDisableModel> {
    let params = new HttpParams();
    params = params.append('recipeId', recipeId);
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneLuxPLListByRecipeId', { params: params }).toPromise();
    return rValue;
  }

  async GetDisabledZoneLuxPPList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneLuxPPList').toPromise();
    return rValue;
  }

  async GetDisabledZoneLuxPPListByRecipeId(recipeId): Promise<ValueLabelDisableModel> {
    let params = new HttpParams();
    params = params.append('recipeId', recipeId);
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneLuxPPListByRecipeId', { params: params }).toPromise();
    return rValue;
  }

  async GetDisabledZoneFancoilList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneFancoilList').toPromise();
    return rValue;
  }

  async GetDisabledZoneFancoilListByRecipeId(recipeId): Promise<ValueLabelDisableModel> {
    let params = new HttpParams();
    params = params.append('recipeId', recipeId);
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/zone/GetDisabledZoneFancoilListByRecipeId', { params: params }).toPromise();
    return rValue;
  }

  async GetZones(): Promise<ResultIntValue[]> {
    return await this.http.get<ResultIntValue[]>('/api/zone/GetZones').toPromise();
  }

  async GetZoneTypeList(): Promise<ValueLabelDisableModel[]> {
    let rValue: ValueLabelDisableModel[] = await this.http.get<ValueLabelDisableModel[]>('/api/zone/GetZoneTypeList').toPromise();
    return rValue;
  }

  async GetZonesByZoneType(zoneTypeId): Promise<ValueLabelDisableModel[]> {
    let params = new HttpParams();
    params = params.append('zoneTypeId', zoneTypeId);
    let rValue: ValueLabelDisableModel[] = await this.http.get<ValueLabelDisableModel[]>('/api/zone/GetZonesByZoneType', { params: params }).toPromise();
    return rValue;
  }

}
