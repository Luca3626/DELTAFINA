import { Component } from '@angular/core';

import { AppService } from '../app.service';
import { DeviceService } from '../services/device.service';
import { UserService } from '../services/user.service';
import { MotorModel } from '../models/device/motor.models';


@Component({
  selector: 'inverter', // tslint:disable-line
  templateUrl: './inverter.component.html'
})
export class InverterComponent {

  // Testo di ricerca su nome e descrizione del motore.
  filterVal: string = '';

  // Riferimenti digitati dall'operatore, uno per motore (chiave = nome motore).
  newManRef: { [motorName: string]: number } = {};
  newAutRef: { [motorName: string]: number } = {};

  constructor(private appService: AppService, private userService: UserService) {
    this.appService.pageTitle = 'Inverter';
  }

  // #region Motori sotto inverter (alimentati in tempo reale da SignalR)

  // Sono i motori che hanno anche il blocco udt_VFD del DB122.
  private get motorsWithVfd(): MotorModel[] {
    if (DeviceService.motorList == null)
      return [];
    return DeviceService.motorList.motors.filter(x => x.HAS_VFD);
  }

  get motors(): MotorModel[] {
    const filter = this.filterVal.trim().toUpperCase();
    if (filter == '')
      return this.motorsWithVfd;
    return this.motorsWithVfd.filter(x =>
      x.name.toUpperCase().indexOf(filter) >= 0 || x.description.toUpperCase().indexOf(filter) >= 0);
  }

  // Inverter che stanno segnalando qualcosa: contatori mostrati in testa alla pagina.
  get faultCount(): number {
    return this.motorsWithVfd.filter(x => x.VFD_HAS_FAULT).length;
  }

  get warningCount(): number {
    return this.motorsWithVfd.filter(x => x.VFD_HAS_WARNING).length;
  }

  // #endregion

  // Scrittura dei due riferimenti (i soli dati scrivibili del blocco udt_VFD),
  // con log del cambio parametro come negli altri popup.
  onManRefConfirm(motor: MotorModel): void {
    if (motor == null || motor.VFD_manRef == null) return;
    const value = this.newManRef[motor.name];
    if (value == null) return;
    try { this.userService.logParameterTagValues(motor.name.toUpperCase() + ": riferimento manuale inverter", motor.VFD_manRef, value, "%", this.appService.user); } catch (e) { }
    motor.VFD_MANUAL_REF = value;
  }

  onAutRefConfirm(motor: MotorModel): void {
    if (motor == null || motor.VFD_autRef == null) return;
    const value = this.newAutRef[motor.name];
    if (value == null) return;
    try { this.userService.logParameterTagValues(motor.name.toUpperCase() + ": riferimento automatico inverter", motor.VFD_autRef, value, "%", this.appService.user); } catch (e) { }
    motor.VFD_AUTO_REF = value;
  }

}
