import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { ZoneAlarmService } from 'src/app/services/zone-alarm.service';
import { ZoneCmdRow, ZONE_COMMANDS, zoneCmdTag, isZoneCmdOn } from 'src/app/services/zone-commands';

// Popup "Comandi di zona": tutte le zone dell'impianto in una tabella, con il modo
// operativo e lo stato di marcia di ognuna e i comandi per cambiarli.
//
// Sono gli stessi due bit che ogni pagina di zona ha nel menu "Comandi" della testata
// (State_off_ON e Mode_mn_AUT del DB120) e che global-cmd-plate commuta tutti insieme:
// la lista delle zone sta in services/zone-commands.ts e non e' ricopiata qui, cosi'
// le tre viste non possono comandare bit diversi.
//
// Lettura e scrittura come dappertutto: log del parametro e poi scrittura del tag.
// I comandi sono per zona, quindi non chiedono conferma - come i pulsanti della
// testata delle pagine; a chiederla e' il solo STOP globale, che ferma l'impianto.
@Component({
  selector: 'zone-cmd-plate',
  templateUrl: './zone-cmd-plate.component.html',
  styleUrls: ['zone-cmd-plate.css'],
})
export class ZoneCmdPlateComponent {

  readonly rows: ZoneCmdRow[] = ZONE_COMMANDS;

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<ZoneCmdPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // #region Stato attuale (DB120 - FROM_HMI)

  isStarted(row: ZoneCmdRow): boolean {
    return isZoneCmdOn(row.stateTag);
  }

  isAuto(row: ZoneCmdRow): boolean {
    return isZoneCmdOn(row.modeTag);
  }

  // Le zone senza bit di modo non mostrano i comandi MAN/AUTO.
  hasMode(row: ZoneCmdRow): boolean {
    return row.modeTag != null && row.modeTag != "";
  }

  // #endregion

  // #region Feedback cumulativi (DB121 - TO_HMI, gli stessi badge delle pagine di zona)

  allOn(row: ZoneCmdRow): boolean {
    return ZoneAlarmService.allOn(row.zone);
  }

  molAlarm(row: ZoneCmdRow): boolean {
    return ZoneAlarmService.molAlarm(row.zone);
  }

  dacAlarm(row: ZoneCmdRow): boolean {
    return ZoneAlarmService.dacAlarm(row.zone);
  }

  mccAlarm(row: ZoneCmdRow): boolean {
    return ZoneAlarmService.mccAlarm(row.zone);
  }

  // Zona 3.1 (Silo Fill): il PLC non pubblica un All_ON di zona ma uno per silo
  // (S1..S4), gli stessi bit della pagina Silo Fill.
  readonly SILOS: number[] = [1, 2, 3, 4];

  isSiloFill(row: ZoneCmdRow): boolean {
    return row.zone === '3_1';
  }

  siloAllOn(silo: number): boolean {
    return ZoneAlarmService.siloAllOn(silo);
  }

  // Vero se la cella feedback ha almeno un badge acceso: regola il trattino "niente
  // da segnalare" nel template.
  hasFeedback(row: ZoneCmdRow): boolean {
    if (this.allOn(row) || this.molAlarm(row) || this.dacAlarm(row) || this.mccAlarm(row))
      return true;
    return this.isSiloFill(row) && this.SILOS.some(s => this.siloAllOn(s));
  }

  // #endregion

  // #region Comandi

  private write(tagName: string, descrizione: string, valore: boolean): void {
    const tag = zoneCmdTag(tagName);
    if (tag == null) return; // bit non (ancora) presente in TagsList

    try { this.userService.logParameterTagValues(descrizione, tag, valore, "", this.appService.user); } catch (e) { }
    tag.value = valore;
  }

  onZoneMode(row: ZoneCmdRow, aut: boolean): void {
    this.write(row.modeTag, row.label + ": modo " + (aut ? "automatico" : "manuale"), aut);
  }

  onZoneState(row: ZoneCmdRow, start: boolean): void {
    this.write(row.stateTag, row.label + ": " + (start ? "start" : "stop"), start);
  }

  // #endregion

  onNoClick(): void {
    this.dialogRef.close();
  }

}
