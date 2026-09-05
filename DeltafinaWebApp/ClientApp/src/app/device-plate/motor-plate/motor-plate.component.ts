import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotorModel } from 'src/app/models/device/motor.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'motor-plate',
  templateUrl: './motor-plate.component.html',
  styleUrls: ['motor-plate.css'],
})
export class MotorPlateComponent {

  newSET_SOGLIA_PP: number;
  newSET_SOGLIA_MAX_TP: number;

  // Riferimenti dell'inverter digitati dall'operatore (tab Inverter).
  newManRef: number;
  newAutRef: number;

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<MotorPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // ManAut: man=0, AUT=1 (toggle unico)
  onMANClick(): void {
    if (this.data.motor.CMD_MAN_AUT == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in manuale", this.data.motor.CMD_MAN_AUT, false, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_MAN_AUT.value = false;
  }

  onAUTClick(): void {
    if (this.data.motor.CMD_MAN_AUT == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in automatico", this.data.motor.CMD_MAN_AUT, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_MAN_AUT.value = true;
  }

  // Marcia manuale: ManCmdFwd e' un toggle (true = marcia, false = stop)
  onSTARTClick(): void {
    if (this.data.motor.CMD_MAN_FWD == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in start", this.data.motor.CMD_MAN_FWD, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_START_FORWARD = true;
  }

  onSTOPClick(): void {
    if (this.data.motor.CMD_MAN_FWD == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in stop", this.data.motor.CMD_MAN_FWD, false, "", this.appService.user); } catch (e) { }
    this.data.motor.STOP_MANUAL();
  }

  // Inverter (DB122 - VFD): i due riferimenti sono i soli dati scrivibili del blocco.
  onManRefConfirm(): void {
    if (this.data.motor.VFD_manRef == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": riferimento manuale inverter", this.data.motor.VFD_manRef, this.newManRef, "%", this.appService.user); } catch (e) { }
    this.data.motor.VFD_MANUAL_REF = this.newManRef;
  }

  onAutRefConfirm(): void {
    if (this.data.motor.VFD_autRef == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": riferimento automatico inverter", this.data.motor.VFD_autRef, this.newAutRef, "%", this.appService.user); } catch (e) { }
    this.data.motor.VFD_AUTO_REF = this.newAutRef;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
