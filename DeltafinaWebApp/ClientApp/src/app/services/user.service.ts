import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';
import { UserDetailModel, UserModel, LogParameter } from '../models/user.models';
import { TagsClient } from '../tags/tags-client';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  async update(userData: UserDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/users/UpdateUser', userData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }

  async logParameterTagValues(description, tag: TagsClient, newValue, unity, user: UserDetailModel): Promise<GenericResponse> {

    let logParam: LogParameter = new LogParameter();
    logParam.description = description;
    logParam.tagName = tag.name;
    logParam.oldValue = tag.value.toString();
    logParam.newValue = newValue;
    logParam.unity = unity;
    logParam.userId = user.userId;
    logParam.user = user.fullName;

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/users/LogParameter', logParam, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }

  async logParameterValues(description, tagName, oldValue, newValue, unity, userId, user): Promise<GenericResponse> {

    let logParam: LogParameter = new LogParameter();
    logParam.description = description;
    logParam.tagName = tagName;
    logParam.oldValue = oldValue;
    logParam.newValue = newValue;
    logParam.unity = unity;
    logParam.userId = userId;
    logParam.user = user;

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/users/LogParameter', logParam, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }

  async logParameterModel(logParam: LogParameter): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/users/LogParameter', logParam, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
    });

    return response;
  }
  
  async addLoginInfo(userData: UserDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/users/AddLoginInfo', userData, { headers }).toPromise().then(result => {
      let resp: any = result;
      return resp;
      //if (resp.status == "Success")
      //  this.router.navigate(['/users/users-list']);
      //else {
      //  this.toastrService["success"]("Prova", "Editazione Utente", this.options);
      //}
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

  async updateWithLogin(userData: UserDetailModel): Promise<GenericResponse> {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let response: GenericResponse = await this.http.post('/api/users/UpdateUserWithLogin', userData, { headers }).toPromise().then(result => {
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
  
  async getAll(): Promise<Array<UserModel>> {
    let rValue: Array<UserModel> = await this.http.get<Array<UserModel>>('/api/users/getlist').toPromise();
      //.subscribe((data: any) => {
      //  rValue = data.slice(0);
      //  //this.originalUsersData = data.slice(0);
      //  //this.update();
      //});
    return rValue;
  }

  async getAllByPortalFarmId(portalFarmId: string, userId: string): Promise<Array<UserModel>> {
    let params = new HttpParams();
    params = params.append('portalFarmId', portalFarmId);
    params = params.append('userId', userId);
    let rValue: Array<UserModel> = await this.http.get<Array<UserModel>>('/api/users/GetListByPortalFarmId', { params: params }).toPromise();
    return rValue;
  }

  async getById(id: any): Promise<UserDetailModel> {
    let params = new HttpParams();
    params = params.append('userid', id);

    let rValue: UserDetailModel = await this.http.get<UserDetailModel>('/api/users/GetById', { params: params }).toPromise();

    return rValue;
  }

  async getUserLogged(): Promise<UserDetailModel> {
    let rValue: UserDetailModel = await this.http.get<UserDetailModel>('/api/users/GetUser').toPromise();
    return rValue;
  }

  async getStaffsListByPortalFarmId(portalFarmId: string): Promise<Array<ValueLabelDisableModel>> {
    let params = new HttpParams();
    params = params.append('portalFarmId', portalFarmId);
    let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/users/getStaffsListByPortalFarmId', { params: params }).toPromise();
    return rValue;
  }

  async getUsersListByPortalFarmId(portalFarmId: string): Promise<Array<ValueLabelDisableModel>> {
    let params = new HttpParams();
    params = params.append('portalFarmId', portalFarmId);
    let rValue: Array<ValueLabelDisableModel> = await this.http.get<Array<ValueLabelDisableModel>>('/api/users/getUsersListByPortalFarmId', { params: params }).toPromise();
    return rValue;
  }

  async getUserTypeByUserTypeId(userTypeId: number): Promise<Array<ValueLabelDisableModel>> {

    let rValue: Array<ValueLabelDisableModel> = new Array<ValueLabelDisableModel>();

    switch (userTypeId) {
      case 1:
        break;
      case 2:
        rValue.push({ label: "GUEST", value: "1", disabled: false });
        rValue.push({ label: "SFAFF", value: "2", disabled: false });
        break;
      case 3:
        rValue.push({ label: "GUEST", value: "1", disabled: false });
        rValue.push({ label: "SFAFF", value: "2", disabled: false });
        rValue.push({ label: "ADMIN", value: "3", disabled: false });
        break;
      case 4:
        rValue.push({ label: "GUEST", value: "1", disabled: false });
        rValue.push({ label: "SFAFF", value: "2", disabled: false });
        rValue.push({ label: "ADMIN", value: "3", disabled: false });
        //rValue.push({ label: "SUPER USER", value: "4", disabled: false });
        break;
      case 5:
        rValue.push({ label: "GUEST", value: "1", disabled: false });
        rValue.push({ label: "SFAFF", value: "2", disabled: false });
        rValue.push({ label: "ADMIN", value: "3", disabled: false });
        rValue.push({ label: "SUPER USER", value: "4", disabled: false });
        rValue.push({ label: "SUPER ADMIN", value: "5", disabled: false });
        break;
      
      default:
    }

    return rValue;
  }

}
