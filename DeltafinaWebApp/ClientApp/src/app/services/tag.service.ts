import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel, ResultDisplayValue } from '../models/help.models';
import { KeywordDetailModel } from '../models/tag.models';

@Injectable()
export class KeywordService {

  constructor(private http: HttpClient) { }

  async update(tagData: KeywordDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/keywords/UpdateDetail', tagData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }
  
  //async getAll(): Promise<Array<KeywordModel>> {
  //  let rValue: Array<KeywordModel> = await this.http.get<Array<KeywordModel>>('/api/keywords/getlist').toPromise();
  //  return rValue;
  //}

  //async getAllByPortalFarmId(portalFarmId: string): Promise<Array<KeywordModel>> {
  //  let params = new HttpParams();
  //  params = params.append('portalFarmId', portalFarmId);
  //  let rValue: Array<KeywordModel> = await this.http.get<Array<KeywordModel>>('/api/keywords/GetListByPortalFarmId', { params: params }).toPromise();
  //  return rValue;
  //}

  //async getById(id: any): Promise<KeywordDetailModel> {
  //  let params = new HttpParams();
  //  params = params.append('id', id);
  //  let rValue: KeywordDetailModel = await this.http.get<KeywordDetailModel>('/api/keywords/GetById', { params: params }).toPromise();
  //  return rValue;
  //}

  async getMaintenanceListByPortalFarmId(portalFarmId: string): Promise<Array<ResultDisplayValue>> {
    let params = new HttpParams();
    params = params.append('portalFarmId', portalFarmId);
    let rValue: Array<ResultDisplayValue> = await this.http.get<Array<ResultDisplayValue>>('/api/keywords/GetMaintenanceListByPortalFarmId', { params: params }).toPromise();
    return rValue;
  }

}
