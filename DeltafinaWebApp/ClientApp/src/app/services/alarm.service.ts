import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse } from '../models/help.models';
import { AlarmModel, AlarmSettingModel, AlarmSettingGroupActionModel, AlarmQueryModel } from '../models/alarm.models';

@Injectable()
export class AlarmService {

  public plcStateOk: boolean = true;
  public databaseStateOk: boolean = true;

  constructor(private http: HttpClient) { }

  async getListFilteredByPLC(plcs: any): Promise<Array<AlarmModel>> {

    let params = new HttpParams();
    params = params.append('plcs', plcs);

    let rValue: Array<AlarmModel> = await this.http.get<Array<AlarmModel>>('/api/alarm/GetListFilteredByPLC', { params: params }).toPromise();
      //.subscribe((data: any) => {
      //  rValue = data.slice(0);
      //  //this.originalUsersData = data.slice(0);
      //  //this.update();
      //});
    return rValue;
  }

  async getListFilteredByZones(zones: any): Promise<Array<AlarmModel>> {

    let params = new HttpParams();
    params = params.append('zones', zones);

    let rValue: Array<AlarmModel> = await this.http.get<Array<AlarmModel>>('/api/alarm/GetListFilteredByZones', { params: params }).toPromise();

    return rValue;
  }

  async getLast3(): Promise<Array<AlarmModel>> {

    let rValue: Array<AlarmModel> = await this.http.get<Array<AlarmModel>>('/api/alarm/GetLast3').toPromise();

    return rValue;
  }

  async getAllActiveAlarms(): Promise<Array<AlarmModel>> {

    let rValue: Array<AlarmModel> = await this.http.get<Array<AlarmModel>>('/api/alarm/GetAllActiveAlarms').toPromise();

    return rValue;
  }

  async GetAlarmSettingListByZone(zones: Array<string>): Promise<Array<AlarmSettingModel>> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: Array<AlarmSettingModel> = await this.http.post<Array<AlarmSettingModel>>('/api/alarm/GetAlarmSettingListByZone', zones, { headers }).toPromise();//.then(result => {
    //  let resp: any = result;
    //  return resp;
    //});

    return response;
  }

  async GetAlarmSettingList(): Promise<Array<AlarmSettingModel>> {

    //const headers = new HttpHeaders()
    //  .set("Content-Type", "application/json");

    let response: Array<AlarmSettingModel> = await this.http.get<Array<AlarmSettingModel>>('/api/alarm/GetAlarmSettingList').toPromise();//.then(result => {
    //  let resp: any = result;
    //  return resp;
    //});

    return response;
  }

  async UpdateAlarmSettings(alarmData: AlarmSettingGroupActionModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post<GenericResponse>('/api/alarm/UpdateAlarmSettings', alarmData, { headers }).toPromise();//.then(result => {
    //  let resp: any = result;
    //  return resp;
    //});

    return response;
  }

  async GetAlarmsFiltered(alarmData: AlarmQueryModel): Promise<Array<AlarmModel>> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: Array<AlarmModel> = await this.http.post<Array<AlarmModel>>('/api/alarm/GetAlarmsFiltered', alarmData, { headers }).toPromise();

    return response;
  }

  async getPlcState(plcName: string): Promise<boolean> {

    let params = new HttpParams();
    params = params.append('plcName', plcName);
    let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/alarm/GetPlcState', { params: params }).toPromise();

    return rValue.status == "Success" ? true : false;
  }

  async getDatabaseState(): Promise<boolean> {

    let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/alarm/CheckDatabase').toPromise();

    return rValue.status == "Success" ? true : false;
  }

  async getIsStandAlonePc(): Promise<boolean> {

    let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/alarm/GetIsStandAlone').toPromise();

    return rValue.value.toString().toLowerCase()  == "true" ? true : false;
  }

  //async getById(id): Promise<UserDetailModel> {

  //  ////let reqParams: URLSearchParams = new URLSearchParams();
  //  ////reqParams.set('id', id);

  //  //let headers = new Headers();
  //  //headers.append('Content-Type', 'application/json');
  //  //headers.append('id', id);
  //  //let params = new URLSearchParams();
  //  //params.append("id", id)

  //  //const opts = { params: new HttpParams({ fromString: "_page=1&_limit=10" }) };
  //  let params = new HttpParams();
  //  params = params.append('userid', id);
  //  //params = params.append('_limit', 10);

  //  let rValue: UserDetailModel = await this.http.get<UserDetailModel>('/api/users/GetById', { params: params }).toPromise();
  //  //.subscribe((data: any) => {
  //  //  rValue = data.slice(0);
  //  //  //this.originalUsersData = data.slice(0);
  //  //  //this.update();
  //  //});

  //  return rValue;
  //}


  //async getList(): Promise<Array<UserModel>> {
  //  let rValue: Array<UserModel> = await this.http.get<Array<UserModel>>('/api/users/getlist').toPromise();//((data: any) => {
  //    //  this.originalUsersData = data.slice(0);
  //    //  this.update();
  //    //});
  //  return rValue;
  //}

}
