import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationLoginComponent } from './login/authentication-login.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: AuthenticationLoginComponent }
  ])],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
