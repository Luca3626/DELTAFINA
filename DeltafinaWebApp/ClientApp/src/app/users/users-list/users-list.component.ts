import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

import { UserModel } from '../../models/user.models'
import { UserService } from '../../services/user.service'
import { FilterService } from '../../services/filter.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  isRTL: boolean;

  constructor(private http: HttpClient, private appService: AppService, private router: Router, private userService: UserService, public filterService: FilterService) {
    this.appService.pageTitle = 'User list - Pages';
    this.isRTL = appService.isRTL;
    this.loadData();
  }

  // Filters

  filterVerified = 'Any';
  filterRole = 'Any';
  filterStatus = 'Any';
  filterLatestActivity = [null, null];


  // Table

  // Options
  dataUrl = '/api/users/getlist';
  searchKeys = ['id', 'account', 'email', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  usersData: UserModel[] = [];
  originalUsersData: UserModel[] = [];

  async loadData() {
    this.originalUsersData = await this.userService.getAllByPortalFarmId(this.appService.user.portalFarmId, this.appService.user.userId);
    this.update();
    //this.http.get(this.dataUrl)
    //  .subscribe((data: any) => {
    //    this.originalUsersData = data.slice(0);
    //    this.update();
    //  });
  }

  update() {
    const data = this.applyFilters();

    this.totalItems = data.length;

    this.sort(data);
    this.usersData = this.paginate(data);
  }

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalUsersData) {

      isOk = true;

      if (this.filterService.userFilters.userName != null && this.filterService.userFilters.userName.length > 0 && (c.userName == null || !c.userName.toString().toUpperCase().match(this.filterService.userFilters.userName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.userFilters.email != null && this.filterService.userFilters.email.length > 0 && (c.email == null || !c.email.toString().toUpperCase().match(this.filterService.userFilters.email.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.userFilters.fullName != null && this.filterService.userFilters.fullName.length > 0 && (c.fullName == null || !c.fullName.toString().toUpperCase().match(this.filterService.userFilters.fullName.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.userFilters.userType != null && this.filterService.userFilters.userType.length > 0 && (c.userType == null || !c.userType.toString().toUpperCase().match(this.filterService.userFilters.userType.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.userFilters.phone != null && this.filterService.userFilters.phone.length > 0 && (c.phone == null || !c.phone.toString().toUpperCase().match(this.filterService.userFilters.phone.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.userFilters.mobile != null && this.filterService.userFilters.mobile.length > 0 && (c.mobile == null || !c.mobile.toString().toUpperCase().match(this.filterService.userFilters.mobile.toUpperCase()))) {
        isOk = false;
      }
      if (this.filterService.userFilters.city != null && this.filterService.userFilters.city.length > 0 && (c.city == null || !c.city.toString().toUpperCase().match(this.filterService.userFilters.city.toUpperCase()))) {
        isOk = false;
      }

      if (isOk && (this.appService.user.isSuperAdmin || this.appService.user.isSuperUser || this.appService.user.userTypeId > c.userTypeId || this.appService.user.userId == c.id))
        tempArray.push(c);
    }

    return tempArray;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  onKey(event: any) {

    if (event.target.name == 'fUserName')
      this.filterService.userFilters.userName = event.target.value;
    else if (event.target.name == 'fEmail')
      this.filterService.userFilters.email = event.target.value;
    else if (event.target.name == 'fFullName')
      this.filterService.userFilters.fullName = event.target.value;
    else if (event.target.name == 'fUserType')
      this.filterService.userFilters.userType = event.target.value;
    else if (event.target.name == 'fPhone')
      this.filterService.userFilters.phone = event.target.value;
    else if (event.target.name == 'fMobile')
      this.filterService.userFilters.mobile = event.target.value;
    else if (event.target.name == 'fCity')
      this.filterService.userFilters.city = event.target.value;

    this.update();
  }

  //update() {
  //  const data = this.filter(this.originalUsersData);

  //  this.totalItems = data.length;

  //  this.sort(data);
  //  this.usersData = this.paginate(data);
  //}

  //filter(data) {
  //  const filter = this.filterVal.toLowerCase();
  //  return !filter ?
  //    data.slice(0) :
  //    data.filter(d => {
  //      return Object.keys(d)
  //        .filter(k => this.searchKeys.includes(k))
  //        .map(k => String(d[k]))
  //        .join('|')
  //        .toLowerCase()
  //        .indexOf(filter) !== -1 || !filter;
  //    });
  //}

  sort(data: any) {
    data.sort((a: any, b: any) => {
      a = typeof(a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof(b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data: any) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key: any) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.applyFilters();
  }

  onBnNewClick() {
    this.router.navigate(['/users/users-edit']);
  }

  open(item: any) {
    this.router.navigate(['/users/users-edit/' + item.id]);
  }

  public removeFilters() {
    this.filterService.resetUserFilters();

    this.update();
  }

}
