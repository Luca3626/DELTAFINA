import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';

import * as numeral from 'numeral';


@Component({
  selector: 'ui-user-view', // tslint:disable-line
  templateUrl: './users-view.component.html',
  styleUrls: ['../../../vendor/styles/pages/users.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersViewComponent {
  isRTL: boolean;

  //
  // Alerts
  //

  public alerts: Array<IAlert> = [];
  public darkAlerts: Array<IAlert> = [];
  public bs4Toasts: any = [];
  public translucentBs4Toasts: any = [];

  //
  // ngx-toastr
  //

  title = '';
  message = '';
  type = 'success';
  tapToDismiss = true;
  closeButton = false;
  progressBar = false;
  preventDuplicates = false;
  newestOnTop = false;
  progressAnimation = 'decreasing';
  positionClass = 'toast-top-right';

  curMsgIndex = -1;

  constructor(private appService: AppService, public toastrService: ToastrService) {
    this.appService.pageTitle = 'View user - Pages';
    this.isRTL = appService.isRTL;
  }

  //
  // Alerts
  //

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public closeDarkAlert(darkAlert: IAlert) {
    const index: number = this.darkAlerts.indexOf(darkAlert);
    this.darkAlerts.splice(index, 1);
  }

  //
  // Toasts
  //

  public closeBs4Toast(toast: any) {
    const index: number = this.bs4Toasts.indexOf(toast);
    this.bs4Toasts.splice(index, 1);
  }

  public closeTranslucentBs4Toast(toast: any) {
    const index: number = this.translucentBs4Toasts.indexOf(toast);
    this.translucentBs4Toasts.splice(index, 1);
  }

  //
  // ngx-toastr
  //

  getMessage() {
    const msgs = [
      'My name is Inigo Montoya. You killed my father. Prepare to die!',
      'Are you the six fingered man?',
      'Inconceivable!',
      'I do not think that means what you think it means.',
      'Have fun storming the castle!',
    ];

    this.curMsgIndex++;

    if (this.curMsgIndex === msgs.length) { this.curMsgIndex = 0; }

    return msgs[this.curMsgIndex];
  }

  showToast() {
    const options = {
      tapToDismiss: this.tapToDismiss,
      closeButton: this.closeButton,
      progressBar: this.progressBar,
      progressAnimation: this.progressAnimation,
      positionClass: this.positionClass,
      rtl: this.appService.isRTL
    };

    // `newestOnTop` and `preventDuplicates` options must be set on global config
    this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
    this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;

    //this.toastrService[this.type](this.message || this.getMessage(), this.title, options);
  }

  clearToasts() {
    this.toastrService.clear();
  }



    userData = {
    avatar: '5-small.png',
    name: 'Nelle Maxwell',
    username: 'nmaxwell',
    email: 'nmaxwell@mail.com',
    company: 'Company Ltd.',
    id: 3425433,
    registered: '01/23/2017',
    latestActivity: '01/23/2018',
    verified: true,
    role: 1,
    status: 1,

    permissions: [
      { module: 'Users', read: true, write: false, create: false, delete: false },
      { module: 'Articles', read: true, write: true, create: true, delete: false },
      { module: 'Staff', read: false, write: false, create: false, delete: false }
    ],

    // Statistics
    posts: 25,
    followers: 534,
    following: 236,

    info: {
      birthday: 'May 3, 1995',
      country: 'Canada',
      languages: ['English'],
      phone: '+0 (123) 456 7891',
      website: '',
      music: ['Rock', 'Alternative', 'Electro', 'Drum & Bass', 'Dance'],
      movies: [
        'The Green Mile', 'Pulp Fiction', 'Back to the Future', 'WALL·E',
        'Django Unchained', 'The Truman Show', 'Home Alone', 'Seven Pounds'
      ],

      twitter: 'https://twitter.com/user',
      facebook: 'https://www.facebook.com/user',
      google: '',
      linkedin: '',
      instagram: 'https://www.instagram.com/user'
    }
  };

  formatInt(v: any) {
    return numeral(v).format('0,0');
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}


//import { Component } from '@angular/core';
//import { AppService } from '../../app.service';
//import * as numeral from 'numeral';

//import { ToastrService } from 'ngx-toastr';

//@Component({
//  selector: 'app-users-view',
//  templateUrl: './users-view.component.html',
//  styleUrls: ['../../../vendor/styles/pages/users.scss',
//    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss']
//})
//export class UsersViewComponent {
//  isRTL: boolean;





//  //
//  // ngx-toastr
//  //

//  title = '';
//  message = '';
//  type = 'success';
//  tapToDismiss = true;
//  closeButton = false;
//  progressBar = false;
//  preventDuplicates = false;
//  newestOnTop = false;
//  progressAnimation = 'decreasing';
//  positionClass = 'toast-top-right';

//  curMsgIndex = -1;

//  //
//  // ngx-toastr
//  //

//  getMessage() {
//    const msgs = [
//      'My name is Inigo Montoya. You killed my father. Prepare to die!',
//      'Are you the six fingered man?',
//      'Inconceivable!',
//      'I do not think that means what you think it means.',
//      'Have fun storming the castle!',
//    ];

//    this.curMsgIndex++;

//    if (this.curMsgIndex === msgs.length) { this.curMsgIndex = 0; }

//    return msgs[this.curMsgIndex];
//  }

//  showToast() {
//    const options = {
//      tapToDismiss: this.tapToDismiss,
//      closeButton: this.closeButton,
//      progressBar: this.progressBar,
//      progressAnimation: this.progressAnimation,
//      positionClass: this.positionClass,
//      rtl: this.appService.isRTL
//    };

//    // `newestOnTop` and `preventDuplicates` options must be set on global config
//    this.toastrService.toastrConfig.newestOnTop = this.newestOnTop;
//    this.toastrService.toastrConfig.preventDuplicates = this.preventDuplicates;

//    this.toastrService[this.type](this.message || this.getMessage(), this.title, options);
//  }










//  constructor(private appService: AppService, public toastrService: ToastrService) {
//    this.appService.pageTitle = 'View user - Pages';
//    this.isRTL = appService.isRTL;
//  }

//  userData = {
//    avatar: '5-small.png',
//    name: 'Nelle Maxwell',
//    username: 'nmaxwell',
//    email: 'nmaxwell@mail.com',
//    company: 'Company Ltd.',
//    id: 3425433,
//    registered: '01/23/2017',
//    latestActivity: '01/23/2018',
//    verified: true,
//    role: 1,
//    status: 1,

//    permissions: [
//      { module: 'Users', read: true, write: false, create: false, delete: false },
//      { module: 'Articles', read: true, write: true, create: true, delete: false },
//      { module: 'Staff', read: false, write: false, create: false, delete: false }
//    ],

//    // Statistics
//    posts: 25,
//    followers: 534,
//    following: 236,

//    info: {
//      birthday: 'May 3, 1995',
//      country: 'Canada',
//      languages: ['English'],
//      phone: '+0 (123) 456 7891',
//      website: '',
//      music: ['Rock', 'Alternative', 'Electro', 'Drum & Bass', 'Dance'],
//      movies: [
//        'The Green Mile', 'Pulp Fiction', 'Back to the Future', 'WALL·E',
//        'Django Unchained', 'The Truman Show', 'Home Alone', 'Seven Pounds'
//      ],

//      twitter: 'https://twitter.com/user',
//      facebook: 'https://www.facebook.com/user',
//      google: '',
//      linkedin: '',
//      instagram: 'https://www.instagram.com/user'
//    }
//  };

//  formatInt(v) {
//    return numeral(v).format('0,0');
//  }
//}
