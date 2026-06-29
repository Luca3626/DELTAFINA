import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel, ResultIntValue } from '../models/help.models';
import { TrendModel, TrendLogModel, TrendQueryModel, TrendDetailModel } from '../models/trend.models';

@Injectable()
export class TrendService {

  constructor(private http: HttpClient) { }

  async GetEnabledTrendList(): Promise<ValueLabelDisableModel> {
    let rValue: ValueLabelDisableModel = await this.http.get<ValueLabelDisableModel>('/api/trend/GetEnabledTrendList').toPromise();
    return rValue;
  }

  async GetTrends(): Promise<Array<TrendModel>> {
    let rValue: Array<TrendModel> = await this.http.get<Array<TrendModel>>('/api/trend/GetTrends').toPromise();
    return rValue;
  }

  async GetLogging(trendData: TrendQueryModel): Promise<Array<TrendLogModel>> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: Array<TrendLogModel> = await this.http.post<Array<TrendLogModel>>('/api/trend/GetLogging', trendData, { headers }).toPromise();//.then(result => {
    //  let resp: any = result;
    //  return resp;
    //});

    return response;
  }

  async getByTagLogName(value): Promise<TrendDetailModel> {
    let params = new HttpParams();
    params = params.append('tagLogName', value);
    let rValue: TrendDetailModel = await this.http.get<TrendDetailModel>('/api/trend/GetByTagLogName', { params: params }).toPromise();
    return rValue;
  }

  async update(trendData: TrendDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/trend/UpdateDetail', trendData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }


}
