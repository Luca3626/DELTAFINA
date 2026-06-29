import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UrlService {

  constructor(private router: Router) { }

  getUrlFileUploadContracts(): string {
    return "/api/fileupload/UploadMoreFileContracts";
  }

  getUrlFileUploadMaintenances(): string {
    return "/api/fileupload/UploadMoreFileMaintenances";
  }

  getUrlFileUploadActivityMaintenances(): string {
    return "/api/fileupload/UploadMoreFileActivityMaintenances";
  }

  //goToFileUploadMaintenances() {
  //  this.router.navigate(['/api/fileupload/UploadMoreFileMaintenances']);
  //}

}
