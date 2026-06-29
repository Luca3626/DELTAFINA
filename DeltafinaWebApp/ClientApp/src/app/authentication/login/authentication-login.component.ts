import { Component } from '@angular/core';
import { AppService } from '../../app.service';

import { LoginModel } from '../../models/auth.models';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';//AGGGIUNTO

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: [
    '../../../vendor/styles/pages/authentication.scss'
  ]
})
export class AuthenticationLoginComponent {

  credentials: LoginModel = new LoginModel();
  public isRemberMeChecked: boolean = false;


  constructor(private appService: AppService, private authService: AuthService, private router: Router) {
    this.appService.pageTitle = 'Autenticazione';

    if (localStorage.getItem("rememberMe") == null) {
      localStorage.setItem("rememberMe", "false");
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
    }
    else {
      this.credentials.email = localStorage.getItem("username");
      this.credentials.password = localStorage.getItem("password");
      this.credentials.rememberMe = localStorage.getItem("rememberMe").toLowerCase() == 'true';
      this.isRemberMeChecked = this.credentials.rememberMe;
    }
  }

  onItemChange(event) {
    this.isRemberMeChecked = event.currentTarget.checked;

    if (this.isRemberMeChecked)
      localStorage.setItem('rememberMe', "true");

    else {
      //localStorage.setItem('username', "");
      //localStorage.setItem('password', "");
      localStorage.setItem('rememberMe', "false");
    }
  }

  async doLogin() {

    let response: any = await this.authService.login(this.credentials);
    if (response.status == "Succeded") {
      if (this.isRemberMeChecked) {
        localStorage.setItem('username', this.credentials.email);
        localStorage.setItem('password', this.credentials.password);
        localStorage.setItem('rememberMe', String(this.credentials.rememberMe));
      }
      else {
        localStorage.setItem('username', "");
        localStorage.setItem('password', "");
        localStorage.setItem('rememberMe', "false");
      }
      // Carica le informazioni dell'utente loggato
      await this.appService.initUser();
      if (this.appService.user.userId == null)
        alert("Autenticazione fallita, utente non riconosciuto");
      else {
        this.router.navigate(['/']);
        //if (this.appService.user.portalFarmId?.length > 0)
        //  this.router.navigate(['/']);
        //else
        //  this.router.navigate(['/portal-farms']);
      }
    }
    else
      alert("Autenticazione fallita");//this.showToast("error", response.value, "Editazione utente");
  }

}
