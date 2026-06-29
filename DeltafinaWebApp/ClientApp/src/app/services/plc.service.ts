import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel, ResultIntValue } from '../models/help.models';

@Injectable()
export class PlcService {

  constructor(private http: HttpClient) { }

  async GetPlcList(): Promise<ValueLabelDisableModel[]> {
    let rValue: ValueLabelDisableModel[] = await this.http.get<ValueLabelDisableModel[]>('/api/plc/GetPlcList').toPromise();
    return rValue;
  }

  async GetPlcListByZoneId(zoneId): Promise<ValueLabelDisableModel[]> {
    let params = new HttpParams();
    params = params.append('zoneId', zoneId);
    let rValue: ValueLabelDisableModel[] = await this.http.get<ValueLabelDisableModel[]>('/api/plc/GetPlcListByZoneId', { params: params }).toPromise();
    return rValue;
  }

  async GetPlcListByZoneName(zone): Promise<ValueLabelDisableModel[]> {
    let params = new HttpParams();
    params = params.append('zone', zone);
    let rValue: ValueLabelDisableModel[] = await this.http.get<ValueLabelDisableModel[]>('/api/plc/GetPlcListByZoneName', { params: params }).toPromise();
    return rValue;
  }

  async GetTagstByPlc(plcName: string): Promise<ValueLabelDisableModel[]> {
    let params = new HttpParams();
    params = params.append('plcName', plcName);
    let rValue: ValueLabelDisableModel[] = await this.http.get<ValueLabelDisableModel[]>('/api/plc/GetTagstByPlc', { params: params }).toPromise();
    return rValue;
  }
}
