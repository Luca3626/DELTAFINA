import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { MaintenanceActivityModel, MaintenanceActivityDetailModel } from '../models/maintenance.models';

@Injectable()
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  async getActivityList(): Promise<Array<MaintenanceActivityModel>> {
    let rValue: Array<MaintenanceActivityModel> = await this.http.get<Array<MaintenanceActivityModel>>('/api/maintenances/GetMaintenanceActivityListByPortalFarmId').toPromise();
    return rValue;
  }

  async getActivityById(id: any): Promise<MaintenanceActivityDetailModel> {
    let params = new HttpParams();
    params = params.append('id', id);
    let rValue: MaintenanceActivityDetailModel = await this.http.get<MaintenanceActivityDetailModel>('/api/maintenances/GetMaintenanceActivityById', { params: params }).toPromise();
    return rValue;
  }

  async updateActivity(activityData: MaintenanceActivityDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/maintenances/UpdateDetailMaintenanceActivity', activityData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }

  async deleteActivityById(id: any): Promise<GenericResponse> {
    let params = new HttpParams();
    params = params.append('id', id);
    let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/maintenances/DeleteMaintenanceActivity', { params: params }).toPromise();
    return rValue;
  }

  async deleteActivityFileById(id: any): Promise<GenericResponse> {
    let params = new HttpParams();
    params = params.append('id', id);
    let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/fileupload/DeleteMoreFileActivityMaintenances', { params: params }).toPromise();
    return rValue;
  }

  async getMaintenanceActivityToDoNext3Items(): Promise<Array<MaintenanceActivityModel>> {
    let rValue: Array<MaintenanceActivityModel> = await this.http.get<Array<MaintenanceActivityModel>>('/api/maintenances/GetMaintenanceActivityToDoNext3Items').toPromise();
    return rValue;
  }

}
