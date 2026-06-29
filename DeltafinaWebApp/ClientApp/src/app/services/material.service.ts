import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { MaterialDetailModel, MaterialModel } from '../models/material.models';


@Injectable()
export class MaterialService {

  constructor(private http: HttpClient) { }

  async update(data: MaterialDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/materials/UpdateDetail', data, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }
  
  async getAll(): Promise<Array<MaterialModel>> {
    let rValue: Array<MaterialModel> = await this.http.get<Array<MaterialModel>>('/api/materials/getlist').toPromise();
    return rValue;
  }
  
  //async getAllByPortalFarmId(portalFarmId: string): Promise<Array<SiloModel>> {
  //  let params = new HttpParams();
  //  params = params.append('portalFarmId', portalFarmId);
  //  let rValue: Array<SiloModel> = await this.http.get<Array<SiloModel>>('/api/silos/GetListByPortalFarmId', { params: params }).toPromise();
  //  return rValue;
  //}

  async getValueLabelDisabledList(): Promise<Array<ValueLabelDisableModel>> {
    let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/materials/GetResultValueLabelDisabledList').toPromise();
    return rValue;
  }

  //async getValueLabelDisabledListByPortalFarmId(portalFarmId: string): Promise<Array<ValueLabelDisableModel>> {
  //  let params = new HttpParams();
  //  params = params.append('portalFarmId', portalFarmId);
  //  let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/silos/GetResultValueLabelDisabledListByPortalFarmId', { params: params }).toPromise();
  //  return rValue;
  //}

  async getById(id: any): Promise<MaterialDetailModel> {
    let params = new HttpParams();
    params = params.append('id', id);
    let rValue: MaterialDetailModel = await this.http.get<MaterialDetailModel>('/api/materials/GetById', { params: params }).toPromise();
    return rValue;
  }

}
