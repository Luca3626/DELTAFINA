import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { DosingDetailModel, DosingTotalizerModel, DosingWorkshiftTotalizerModel } from '../models/dosing.models';

@Injectable()
export class DosingService {

  constructor(private http: HttpClient) { }

  async getLast(take): Promise<Array<DosingDetailModel>> {
    let params = new HttpParams();
    params = params.append('take', take);
    let rValue: Array<DosingDetailModel> = await this.http.get<Array<DosingDetailModel>>('/api/dosing/GetLastDetail', { params: params }).toPromise();
    return rValue;
  }

  async getListByDay(date: Date): Promise<Array<DosingDetailModel>> {
    let params = new HttpParams();
    params = params.append('date', date.toLocaleDateString('it-IT'));
    let rValue: Array<DosingDetailModel> = await this.http.get<Array<DosingDetailModel>>('/api/dosing/GetDetailListByDate', { params: params }).toPromise();
    return rValue;
  }

  async getDetailListByRange(dateFrom: Date, dateTo: Date): Promise<Array<DosingDetailModel>> {
    let params = new HttpParams();
    params = params.append('dateFrom', dateFrom.toLocaleDateString('it-IT') + " " + dateFrom.toLocaleTimeString('it-IT'));
    params = params.append('dateto', dateTo.toLocaleDateString('it-IT') + " " + dateTo.toLocaleTimeString('it-IT'));
    let rValue: Array<DosingDetailModel> = await this.http.get<Array<DosingDetailModel>>('/api/dosing/GetDetailListByRange', { params: params }).toPromise();
    return rValue;
  }

  async getWorkshiftTotalizerListByDay(date: Date): Promise<Array<DosingWorkshiftTotalizerModel>> {
    let params = new HttpParams();
    params = params.append('date', date.toLocaleDateString('it-IT'));
    let rValue: Array<DosingWorkshiftTotalizerModel> = await this.http.get<Array<DosingWorkshiftTotalizerModel>>('/api/dosing/getWorkshiftTotalizerListByDay', { params: params }).toPromise();
    return rValue;
  }

  async getWorkshiftTotalizerListByRange(dateFrom: Date, dateTo: Date): Promise<Array<DosingWorkshiftTotalizerModel>> {
    let params = new HttpParams();
    params = params.append('dateFrom', dateFrom.toLocaleDateString('it-IT') + " " + dateFrom.toLocaleTimeString('it-IT'));
    params = params.append('dateto', dateTo.toLocaleDateString('it-IT') + " " + dateTo.toLocaleTimeString('it-IT'));
    let rValue: Array<DosingWorkshiftTotalizerModel> = await this.http.get<Array<DosingWorkshiftTotalizerModel>>('/api/dosing/GetWorkshiftTotalizerListByRange', { params: params }).toPromise();
    return rValue;
  }

  //async getByBarcode(barcode: any): Promise<BinDetailModel> {
  //  let params = new HttpParams();
  //  params = params.append('barcode', barcode);
  //  let rValue: BinDetailModel = await this.http.get<BinDetailModel>('/api/bins/GetByBarcode', { params: params }).toPromise();
  //  return rValue;
  //}

  //async update(binData: BinDetailModel): Promise<GenericResponse> {

  //  const headers = new HttpHeaders()
  //    .set("Content-Type", "application/json");

  //  let response: GenericResponse = await this.http.post('/api/bins/UpdateDetail', binData, { headers }).toPromise().then(result => {
  //    let resp: any = result;
  //    return resp;
  //  });

  //  return response;
  //}

  //async delete(barcode: any): Promise<GenericResponse> {
  //  let params = new HttpParams();
  //  params = params.append('barcode', barcode);
  //  let rValue: GenericResponse = await this.http.get<GenericResponse>('/api/bins/Delete', { params: params }).toPromise();
  //  return rValue;
  //}

}
