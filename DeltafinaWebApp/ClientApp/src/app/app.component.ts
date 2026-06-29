import { Component, HostListener } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AppService } from './app.service';
import { LayoutService } from './layout/layout.service';

import { SignalRService } from './signalr-client/signalr.service';
import { DeviceService } from './services/device.service';
import { AlarmService } from './services/alarm.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host { display: block; }']
})
export class AppComponent {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key.toLowerCase() == "r") {
      SignalRService.tagList.PC_RESET_ALLARMI.value = true;
      SignalRService.tagList.PC_NEW_ALARM.value = false;
    }
    else if (event.key.toLowerCase() == "t") {
      SignalRService.tagList.PC_TACITA_ALLARMI.value = true;
      SignalRService.tagList.PC_NEW_ALARM.value = false;
    }
  }


  constructor(private router: Router, private appService: AppService, private layoutService: LayoutService, private signalrService: SignalRService, private deviceService: DeviceService,
    private alarmService: AlarmService) {

    //if (this.appService.isDevMode) {
      this.appService.user.userId = '1165b310-9eeb-4052-a831-c800e5225d21';
      this.appService.user.portalFarmId = '2b9b9fb3-1d4f-410c-b822-00a669261d29';
      this.appService.user.portalFarmId = '2b9b9fb3-1d4f-410c-b822-00a669261d29';
      this.appService.user.userTypeId = 1;
      this.appService.user.name = "DELTAFINA";
      this.appService.user.surname = "GUEST";
    //}

    if ((this.appService.user == null || this.appService.user.userId == null || this.appService.user.userId == ''))// && !this.appService.isDevMode)
      this.router.navigate(['/auth/login']);


    // Subscribe to router events to handle page transition
    this.router.events.subscribe(this.navigationInterceptor.bind(this));

    // Disable animations and transitions in IE10 to increase performance
    if (typeof (document as any).documentMode === 'number' && (document as any).documentMode < 11) {
      const style = document.createElement('style');
      style.textContent = `
        * {
          -ms-animation: none !important;
          animation: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`;
      document.head.appendChild(style);
    }

    this.checkIsStandAlonePc();
  }

  async checkIsStandAlonePc() {
    this.appService.isStandAlonePc = await this.alarmService.getIsStandAlonePc();
  }

  private navigationInterceptor(e: RouterEvent): void {
    if (e instanceof NavigationStart) {
      // Set loading state
      document.body.classList.add('app-loading');
    }

    if (e instanceof NavigationEnd) {
      // Scroll to top of the page
      this.appService.scrollTop(0, 0);
    }

    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      // On small screens collapse sidenav
      if (this.layoutService.isSmallScreen() && !this.layoutService.isCollapsed()) {
        setTimeout(() => this.layoutService.setCollapsed(true, true), 10);
      }

      // Remove loading state
      document.body.classList.remove('app-loading');

      // Remove initial splash screen
      const splashScreen = document.querySelector('.app-splash-screen');
      if (splashScreen) {
        (splashScreen as any).style.opacity = 0;
        setTimeout(() =>
          splashScreen && splashScreen.parentNode && splashScreen.parentNode.removeChild(splashScreen)
          , 300);
      }
    }
  }

  //onKey(event: any) {

  //  alert("CIAO");
  //}

}
