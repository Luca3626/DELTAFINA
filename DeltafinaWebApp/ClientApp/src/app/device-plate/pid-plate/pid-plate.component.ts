import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { PidModel } from 'src/app/models/device/pid.models';
import { AnalogModel } from 'src/app/models/device/analog.models';
import { DeviceService } from 'src/app/services/device.service';
import { PlateChartSeries } from '../plate-chart/plate-chart.component';

@Component({
  selector: 'pid-plate',
  templateUrl: './pid-plate.component.html',
  styleUrls: ['pid-plate.css'],
})
export class PidPlateComponent {

  // Valori digitati dall'operatore, scritti sul PLC dai pulsanti di conferma.
  newSetpoint: number;
  newKp: number;
  newKd: number;
  newCycleTime: number;
  newManValue: number;

  // Tracce del grafico storico. Il TagLogName da configurare in TagsToSave e' il nome
  // del tag stesso (client e server condividono la stessa TagsList), quindi si legge
  // direttamente dal tag. Calcolate una volta sola qui nel costruttore: se fossero un
  // getter, ogni giro di change detection passerebbe un array nuovo al grafico e
  // farebbe ripartire la query storica.
  chartSeries: PlateChartSeries[];

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<PidPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const pid: PidModel = data.pid;
    // PV e SP condividono la scala (stessa UdM), l'uscita va sul secondo asse in %.
    this.chartSeries = [
      { tagLogName: pid.PV != null ? pid.PV.name : null, label: 'Process value', unit: pid.unit, color: '#3b82f6' },
      { tagLogName: pid.SP != null ? pid.SP.name : null, label: 'Setpoint', unit: pid.unit, color: '#10b981' },
      { tagLogName: pid.OUT != null ? pid.OUT.name : null, label: 'Uscita', unit: '%', color: '#f59e0b' }
    ];

    this.analog = DeviceService.analogOfPid(pid);
  }

  get pid(): PidModel {
    return this.data.pid;
  }


  // #region Schede PID / Analog

  // Scheda aperta, aggiornata dal (navChange) del ngbNav: serve al solo titolo del
  // popup, che sulla scheda Analog prende il nome dell'analogica invece del loop.
  schedaAttiva: string = "PID";

  // L'ingresso analogico che fa da process value al loop (colonna C del foglio PIDs).
  // Null se il loop non ne ha uno o se non e' ancora in AnalogList: in quel caso la
  // scheda Analog non viene proprio disegnata. Risolto una volta sola nel costruttore
  // (come chartSeries): da getter lo rileggerebbe il *ngIf a ogni giro di change
  // detection, e la lista non cambia mai dopo l'avvio.
  analog: AnalogModel;

  get titolo(): string {
    if (this.schedaAttiva == "ANALOG" && this.analog != null)
      return this.analog.name.toUpperCase();
    return this.pid.name.toUpperCase();
  }

  // #endregion

  // #region Abilitazione comando manuale (bit enMan)

  get CmdManuale(): boolean {
    if (this.pid.enMan != null)
      return this.pid.enMan.value;
    else
      return null;
  }

  set CmdManuale(value) {
    try { this.userService.logParameterTagValues(this.pid.name.toUpperCase() + ": abilita comando manuale", this.pid.enMan, value, "", this.appService.user); } catch (e) { }
    this.pid.MANUAL_ENABLED = value;
  }

  // #endregion

  // #region Conferma parametri (log del cambio parametro, poi scrittura sul PLC)

  onSetpointConfirm(): void {
    try { this.userService.logParameterTagValues(this.pid.name.toUpperCase() + ": setpoint", this.pid.SP, this.newSetpoint, this.pid.unit, this.appService.user); } catch (e) { }
    this.pid.SETPOINT = this.newSetpoint;
  }

  onManValueConfirm(): void {
    try { this.userService.logParameterTagValues(this.pid.name.toUpperCase() + ": valore manuale", this.pid.ManValue, this.newManValue, "%", this.appService.user); } catch (e) { }
    this.pid.MANUAL_VALUE = this.newManValue;
  }

  onKpConfirm(): void {
    try { this.userService.logParameterTagValues(this.pid.name.toUpperCase() + ": guadagno proporzionale kP", this.pid.kP, this.newKp, "", this.appService.user); } catch (e) { }
    this.pid.KP = this.newKp;
  }

  onKdConfirm(): void {
    try { this.userService.logParameterTagValues(this.pid.name.toUpperCase() + ": guadagno derivativo kD", this.pid.kD, this.newKd, "", this.appService.user); } catch (e) { }
    this.pid.KD = this.newKd;
  }

  onCycleTimeConfirm(): void {
    try { this.userService.logParameterTagValues(this.pid.name.toUpperCase() + ": tempo di ciclo", this.pid.CycleT, this.newCycleTime, "s", this.appService.user); } catch (e) { }
    this.pid.CYCLE_TIME = this.newCycleTime;
  }

  // #endregion

  onNoClick(): void {
    this.dialogRef.close();
  }
}
