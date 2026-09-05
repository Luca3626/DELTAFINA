import { Component, Input, AfterViewInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { LayoutService } from '../layout.service';
import { CabinetAlarmService } from '../../services/cabinet-alarm.service';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styleUrls: ['./layout-sidenav.component.css'],
  styles: [':host { display: block; }']
})
export class LayoutSidenavComponent implements AfterViewInit {
  @Input() orientation = 'vertical';

  @HostBinding('class.layout-sidenav') hostClassVertical = false;
  @HostBinding('class.layout-sidenav-horizontal') hostClassHorizontal = false;
  @HostBinding('class.flex-grow-0') hostClassFlex = false;

  constructor(private router: Router, public appService: AppService, private layoutService: LayoutService) {
    // Set host classes
    this.hostClassVertical = this.orientation !== 'horizontal';
    this.hostClassHorizontal = !this.hostClassVertical;
    this.hostClassFlex = this.hostClassHorizontal;
  }

  ngAfterViewInit(): void {
    // Safari bugfix
    this.layoutService._redrawLayoutSidenav();
  }

  getClasses(): string {
    let bg = this.appService.layoutSidenavBg;

    if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '');
    }

    return `${this.orientation === 'horizontal' ? 'container-p-x ' : ''} bg-${bg}`;
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  isMenuActive(url: string): boolean {
    return this.router.isActive(url, false);
  }

  isMenuOpen(url: string): boolean {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }

  toggleSidenav(): void {
    this.layoutService.toggleCollapsed();
  }

  get ShowAziendeDelPortale() {
    return this.appService.user.isSuperAdmin;
  }

  get ShowAziende() {
    return this.appService.user.userTypeId >= 2;
  }

  get ShowContatti() {
    return this.appService.user.userTypeId >= 2;
  }

  get ShowSiti() {
    return this.appService.user.userTypeId > 2;
  }

  get ShowUtenti() {
    return this.appService.user.userTypeId >= 2;
  }

  // Allarme quadri elettrici (alm010..015, alm033, alm034 del DB121): basta un quadro
  // in allarme e la voce "Cabinets" del menu lampeggia, cosi' si vede anche stando su
  // un'altra pagina. Il lampeggio e' in layout-sidenav.component.css.
  get cabinetAlarm(): boolean {
    return CabinetAlarmService.anyAlarm();
  }
}
