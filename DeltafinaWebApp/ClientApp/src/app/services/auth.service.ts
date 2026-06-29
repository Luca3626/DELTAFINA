import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse } from '../models/help.models';
import { LoginModel } from '../models/auth.models';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(data: LoginModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/Account/Login', data, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }

}
