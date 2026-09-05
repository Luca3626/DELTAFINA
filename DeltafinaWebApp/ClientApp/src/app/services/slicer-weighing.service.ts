import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SlicerWeighingModel } from '../models/slicer-weighing.models';

// Lettura del registro pesate casse (tabella SlicerWeighings). Le date viaggiano come
// "aaaa-mm-gg" nella query string, non come Date nel corpo JSON: il filtro e' su giornate
// produttive intere e cosi' non c'e' un fuso orario che sposti gli estremi.
@Injectable()
export class SlicerWeighingService {

  constructor(private http: HttpClient) { }

  async getWeighings(lineCode: string, dateFrom: string, dateTo: string): Promise<Array<SlicerWeighingModel>> {

    let params = new HttpParams();
    params = params.append('lineCode', lineCode);
    params = params.append('dateFrom', dateFrom);
    params = params.append('dateTo', dateTo);

    let rValue: Array<SlicerWeighingModel> =
      await this.http.get<Array<SlicerWeighingModel>>('/api/slicer/GetWeighings', { params: params }).toPromise();

    return rValue;
  }

}
