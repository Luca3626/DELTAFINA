import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MaphilightModule } from 'ng-maphilight'

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationLoginComponent } from './login/authentication-login.component';
//import { ServiceModule } from '../services/service.module';


// *******************************************************************************
// Libs

//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    //MaphilightModule,

    //ServiceModule,

    AuthenticationRoutingModule
  ],
  declarations: [
    AuthenticationLoginComponent
  ]
})
export class AuthenticationModule { }
