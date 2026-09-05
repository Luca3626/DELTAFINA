import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CabinetAlarmService } from '../services/cabinet-alarm.service';
import { SignalRService } from '../signalr-client/signalr.service';
import { TagsList } from '../tags/tags-list';


@Component({
  selector: 'cabinet', // tslint:disable-line
  templateUrl: './cabinet.component.html',
  styleUrls: ['cabinet.css'],
})
export class CabinetComponent implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo: mostra/nasconde le etichette dei
  // quadri, sia sul fronte (layer ETICHETTE CABINET) sia in pianta (TOP VIEW LABELS).
  showName: boolean = true;

  // Apertura del menu "Comandi" nella testata. Il pannello non c'e' ancora (i quadri
  // non hanno tag sul PLC), il flag e' qui perche' la testata e' quella standard.
  cmdOpen: boolean = false;

  // Il dialog serve ai popup dei device: la dinamizzazione aprira' da qui i plate
  // (stesso contratto delle altre pagine sinottiche, vedi zona-2-1.component.ts).
  constructor(public dialog: MatDialog) { }

  async ngOnInit() {
    // Precarica il fronte quadro in allarme, cosi' al primo cambio di xlink:href
    // l'immagine e' gia' in cache e non si vede il flicker.
    [CabinetComponent.CABINET_ALARM].forEach(u => { var i = new Image(); i.src = u; });
  }

  // #region Immagini dei quadri
  // Il disegno monta lo stesso fronte quadro per tutte le postazioni: i quadri larghi
  // (C232, C233, C234, C235) sono due immagini affiancate, quindi lo stesso nome arriva
  // qui due volte. Il rosso e' il fronte con le spie in allarme.

  private static readonly CABINET_OK = "assets/svg/custom/quadro-automazione-fronte.svg";
  private static readonly CABINET_ALARM = "assets/svg/custom/quadro-automazione-fronte_rosso.svg";

  // Immagine di partenza dell'<animate>: sempre il quadro normale.
  // I nomi arrivano dal disegno: C123, C124, C230, C231, C232, C233, C234, C235.
  getCabinetImg(name: string): string {
    return CabinetComponent.CABINET_OK;
  }

  // Immagine di arrivo dell'<animate>: il quadro rosso solo se e' in allarme. Quando
  // non lo e', from e to coincidono e l'animazione non si vede - stesso trucco di
  // SVG_MOTOR_BASE / SVG_MOTOR_BASE_ALM sui motori delle altre pagine.
  getCabinetImgAlm(name: string): string {
    return this.isCabinetAlarm(name) ? CabinetComponent.CABINET_ALARM : CabinetComponent.CABINET_OK;
  }

  // #endregion

  // #region Allarmi dei quadri (DB121 - TO_HMI)
  // Un bit per quadro dentro la lista allarmi generale (alm010..alm015, alm033,
  // alm034): la mappa nome quadro -> tag sta in CabinetAlarmService. Fa lampeggiare
  // il fronte del quadro e il rettangolo corrispondente nella pianta.

  isCabinetAlarm(name: string): boolean {
    return CabinetAlarmService.inAlarm(name);
  }

  // #endregion

  // #region Liste device (alimentate in tempo reale da SignalR)
  // Per ora serve solo l'accesso ai tag: le liste device (motorList, valveList, ...)
  // si aggiungono qui da DeviceService quando il sinottico avra' device sopra.

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  // #endregion

}
