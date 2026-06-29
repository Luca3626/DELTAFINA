import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { PortalFarmDetailModel, PortalFarmModel } from '../models/portal-farm.models';

@Injectable()
export class PortalFarmService {

  constructor(private http: HttpClient) { }

  async update(userData: PortalFarmDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/portalFarms/UpdateDetail', userData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;

      //if (resp.status == "Success") {
      //  //this.userData.userId = resp.value;        
      //}
      //else
      //  return resp;
    });//,
    //response => {
    //  return { status: "error", value: response };
    //  //console.log("POST call in error", response);
    //});//,
    //() => {
    //  console.log("The POST observable is now completed.");
    //});

    return response;
  }
  
  async getAll(): Promise<Array<PortalFarmModel>> {
    let rValue: Array<PortalFarmModel> = await this.http.get<Array<PortalFarmModel>>('/api/portalFarms/getlist').toPromise();
      //.subscribe((data: any) => {
      //  rValue = data.slice(0);
      //  //this.originalPortalFarmsData = data.slice(0);
      //  //this.update();
      //});
    return rValue;
  }

  async getValueLabelDisabledList(): Promise<Array<ValueLabelDisableModel>> {
    let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/portalFarms/GetResultValueLabelDisabledModelList').toPromise();
    //.subscribe((data: any) => {
    //  rValue = data.slice(0);
    //  //this.originalPortalFarmsData = data.slice(0);
    //  //this.update();
    //});
    return rValue;
  }

  async getById(id: any): Promise<PortalFarmDetailModel> {

    ////let reqParams: URLSearchParams = new URLSearchParams();
    ////reqParams.set('id', id);

    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //headers.append('id', id);
    //let params = new URLSearchParams();
    //params.append("id", id)

    //const opts = { params: new HttpParams({ fromString: "_page=1&_limit=10" }) };
    let params = new HttpParams();
    params = params.append('id', id);
    //params = params.append('_limit', 10);

    let rValue: PortalFarmDetailModel = await this.http.get<PortalFarmDetailModel>('/api/portalFarms/GetById', { params: params }).toPromise();
    //.subscribe((data: any) => {
    //  rValue = data.slice(0);
    //  //this.originalPortalFarmsData = data.slice(0);
    //  //this.update();
    //});

    return rValue;
  }

}
