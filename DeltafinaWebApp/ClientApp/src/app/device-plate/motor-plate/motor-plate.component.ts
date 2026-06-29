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

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<MotorPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onMANClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in manuale", this.data.motor.CMD_MAN, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_MAN.value = true;
  }

  onSEMIClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in semi automatico", this.data.motor.CMD_SEMI, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_SEMI.value = true;
  }

  onLOC_OFF_Click(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in remoto", this.data.motor.CMD_REM, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_REM.value = true;
  }

  onLOC_ON_Click(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in locale", this.data.motor.CMD_LOC, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_LOC.value = true;
  }

  onAUTClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in automatico", this.data.motor.CMD_AUT, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_AUT.value = true;
  }

  onSTARTClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in start", this.data.motor.CMD_STARTFWD, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_START_FORWARD = true;
  }

  onSTOPClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in stop", this.data.motor.CMD_STOP, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_STOP.value = true;
  }

  onNoClick(): void {

    this.dialogRef.close();
  }

  onResetStarts1(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Reset partenza 1 ", this.data.motor.CMD_RESET_STARTS_1, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_RESET_STARTS_1.value = true;
  }

  onResetStarts2(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Reset partenza 2 ", this.data.motor.CMD_RESET_STARTS_2, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_RESET_STARTS_2.value = true;
  }

  onResetTrip1(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Reset contatore 1 ", this.data.motor.CMD_RESET_TRIP_1, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_RESET_TRIP_1.value = true;
  }

  onResetTrip2(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Reset contatore 2 ", this.data.motor.CMD_RESET_TRIP_2, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_RESET_TRIP_2.value = true;
  }

  newSpeed: number;
  onSpeedConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Velocità in MANUALE", this.data.motor.CMD_SETPOINT, this.newSpeed, "%", this.appService.user); } catch (e) { }
    this.data.motor.CMD_SETPOINT.value = this.newSpeed;
  }

  onSET_SOGLIA_PPConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Impostazioni soglia presenza prodotto", this.data.motor.SET_SOGLIA_PP, this.newSET_SOGLIA_PP, "", this.appService.user); } catch (e) { }
    this.data.motor.SET_SOGLIA_PP.value = this.newSET_SOGLIA_PP;
  }

  onSET_SOGLIA_MAX_TPConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Impostazioni soglia troppo prodotto", this.data.motor.SET_SOGLIA_MAX_TP, this.newSET_SOGLIA_MAX_TP, "", this.appService.user); } catch (e) { }
    this.data.motor.SET_SOGLIA_MAX_TP.value = this.newSET_SOGLIA_MAX_TP;
  }

}
