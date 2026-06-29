import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { SiloModel } from '../models/warehouse/silo.models';

@Injectable()
export class SiloService {

  constructor(private http: HttpClient) { }

  async update(data: SiloModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/silos/UpdateDetail', data, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }
  
  async getAll(): Promise<Array<SiloModel>> {
    let rValue: Array<SiloModel> = await this.http.get<Array<SiloModel>>('/api/silos/getlist').toPromise();
    return rValue;
  }
  
  //async getAllByPortalFarmId(portalFarmId: string): Promise<Array<SiloModel>> {
  //  let params = new HttpParams();
  //  params = params.append('portalFarmId', portalFarmId);
  //  let rValue: Array<SiloModel> = await this.http.get<Array<SiloModel>>('/api/silos/GetListByPortalFarmId', { params: params }).toPromise();
  //  return rValue;
  //}

  async getValueLabelDisabledList(): Promise<Array<ValueLabelDisableModel>> {
    let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/silos/GetResultValueLabelDisabledList').toPromise();
    return rValue;
  }

  //async getValueLabelDisabledListByPortalFarmId(portalFarmId: string): Promise<Array<ValueLabelDisableModel>> {
  //  let params = new HttpParams();
  //  params = params.append('portalFarmId', portalFarmId);
  //  let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/silos/GetResultValueLabelDisabledListByPortalFarmId', { params: params }).toPromise();
  //  return rValue;
  //}

  async getById(id: any): Promise<SiloModel> {
    let params = new HttpParams();
    params = params.append('id', id);
    let rValue: SiloModel = await this.http.get<SiloModel>('/api/silos/GetById', { params: params }).toPromise();
    return rValue;
  }

  async getByCode(code: any): Promise<SiloModel> {
    let params = new HttpParams();
    params = params.append('code', code);
    let rValue: SiloModel = await this.http.get<SiloModel>('/api/silos/GetByCode', { params: params }).toPromise();
    return rValue;
  }

  async getByName(name: any): Promise<SiloModel> {
    let params = new HttpParams();
    params = params.append('name', name);
    let rValue: SiloModel = await this.http.get<SiloModel>('/api/silos/GetByName', { params: params }).toPromise();
    return rValue;
  }

}
