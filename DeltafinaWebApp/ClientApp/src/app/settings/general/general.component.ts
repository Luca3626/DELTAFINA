import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';

import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from 'src/app/tags/tags-list';
import { TagsClient } from 'src/app/tags/tags-client';
import { UserService } from 'src/app/services/user.service';
import { SettingRow, SettingArea, SETUP_AREAS } from '../setup-settings';


@Component({
  selector: 'general', // tslint:disable-line
  templateUrl: './general.component.html',
  styleUrls: [
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
  `]
})
export class GeneralComponent implements OnInit {

  readonly TITLE: string = "Impostazioni | Parametri";

  myTitle: string = "Parametri";

  private sub: any;
  private tagLogName: string;

  name: string;

  // #region Parametri DB120 (FROM_HMI) divisi per area
  // La lista sta in settings/setup-settings.ts: la usa anche il pannello
  // "Configurazione percorsi e linee" disegnato sul sinottico della dashboard.
  readonly AREAS: SettingArea[] = SETUP_AREAS;

  // #endregion

  // #region Lettura / scrittura dei bit

  // La TagsList viene costruita da SignalRService: finche' non c'e' la riga resta
  // semplicemente spenta invece di far esplodere il template.
  private tag(name: string): TagsClient {
    const list: any = SignalRService.tagList;
    return list == null ? null : list[name];
  }

  isOn(row: SettingRow): boolean {
    const tag = this.tag(row.tag);
    return tag == null ? false : this.isTrue(tag.value);
  }

  // Testo della colonna ATTUALE in base alla semantica del singolo bit
  stateTxt(row: SettingRow): string {
    return this.isOn(row) ? row.on : row.off;
  }

  onToggle(area: SettingArea, row: SettingRow, newValue: any): void {

    const tag = this.tag(row.tag);
    if (tag == null) return; // bit non (ancora) presente in TagsList

    const value: boolean = this.isTrue(newValue);
    const description: string = area.logPrefix + (row.code ? " " + row.code : "") + ": " + row.text;

    try {
      this.userService.logParameterTagValues(description, tag, value ? row.on : row.off, "", this.appService.user);
    } catch (e) { }

    tag.value = value;
  }

  // #endregion

  constructor(private appService: AppService, calendar: NgbCalendar, private userService: UserService) {

    this.appService.pageTitle = this.TITLE;
  }

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  isTrue(value: any): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  async ngOnInit() {
  }

  ngOnDestroy() {
  }

}
