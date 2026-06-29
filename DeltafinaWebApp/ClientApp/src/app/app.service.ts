import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeSettingsService } from '../vendor/libs/theme-settings/theme-settings.service';

import { UserDetailModel } from './models/user.models';
import { UserService } from './services/user.service';
import { isDevMode } from '@angular/core';
import { environment } from '../environments/environment';
import { LayoutService } from './layout/layout.service';

@Injectable()
export class AppService {

  public user: UserDetailModel;
  public isStandAlonePc: boolean;


  constructor(private titleService: Title, private themeSettingsService: ThemeSettingsService, private userService: UserService, private layoutService: LayoutService) {

    //Aggiunto da me **************************************************
    this.user = new UserDetailModel();

    //this.themeSettingsService.setLayoutNavbarFixed(true);
    //if (this.themeSettingsService.options.material == true)
    //  this.themeSettingsService.options.material = false;//.setMaterial(true);
    //if (this.themeSettingsService.options.layoutNavbarFixed == false)
    //  this.themeSettingsService.setLayoutNavbarFixed(true);

    setTimeout(async () => {
      // Carica le informazioni dell'utente loggato    
      if (this.user.userId == null) {
        await this.initUser();
        //if (this.appService.user.userId == null) {
        //  //alert("Autenticazione fallita, utente non riconosciuto");
        //  this.router.navigate(['/auth/login']);
        //}
        //else
        //  this.router.navigate(['/waiting-room']);

        //if (this.user.userId == null) {
        //  //alert("Autenticazione fallita, utente non riconosciuto");
        //  this.router.navigate(['/auth/login']);
        //}
      }
    });
    /********************************************************************/
  }

  get isDevMode() {
    return !environment.production;
  }

  public async initUser() {
    this.user = await this.userService.getUserLogged();
  }

  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`${value} - DELTAFINA`);
  }

  // Check for RTL layout
  get isRTL(): boolean {
    return document.documentElement.getAttribute('dir') === 'rtl' ||
           document.body.getAttribute('dir') === 'rtl';
  }

  // Check if IE10
  get isIE10(): boolean {
    return (document as any).documentMode === 10;
  }

  // Layout navbar color
  get layoutNavbarBg(): string {
    return this.themeSettingsService.getOption('navbarBg') || 'navbar-theme';
  }

  // Layout sidenav color
  get layoutSidenavBg(): string {
    return this.themeSettingsService.getOption('sidenavBg') || 'sidenav-theme';
  }

  // Layout footer color
  get layoutFooterBg(): string {
    return this.themeSettingsService.getOption('footerBg') || 'footer-theme';
  }

  // Animate scrollTop
  scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement): void {
    if (element.scrollTop === to) { return; }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) { return c / 2 * t * t + b; }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }
}
