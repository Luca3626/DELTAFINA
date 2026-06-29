import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotorModel } from 'src/app/models/device/motor.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'motor-rev-plate',
  templateUrl: './motor-rev-plate.component.html',
  styleUrls: ['motor-rev-plate.css'],
})
export class MotorRevPlateComponent {

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<MotorRevPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  get RevText(): string {
    if (this.data.motor.name == "BT54")
      return this.data.motor.FWD_TEXT.toUpperCase();
    else
      return this.data.motor.REV_TEXT.toUpperCase();
  }

  get FwdText(): string {
    if (this.data.motor.name == "BT54")
      return this.data.motor.REV_TEXT.toUpperCase();
    else
      return this.data.motor.FWD_TEXT.toUpperCase();
  }

  onMANClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Utenza in manuale", this.data.motor.CMD_MAN, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_MAN.value = true;
  }

  onLOC_OFF_Click(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in remoto", this.data.motor.CMD_REM, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_REM.value = true;
  }

  onLOC_ON_Click(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": utenza in locale", this.data.motor.CMD_LOC, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_LOC.value = true;
  }

  onSEMIClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Utenza in semi automatico", this.data.motor.CMD_SEMI, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_SEMI.value = true;
  }

  onAUTClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Utenza in automatico", this.data.motor.CMD_AUT, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_AUT.value = true;
  }

  onSTART_FWD_Click(): void {
    console.log('this.data:', this.data);
    console.log("premuto forward");
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Start FWD", this.data.motor.CMD_STARTFWD , true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_START_FORWARD = true;
  }

  onSTART_REV_Click(): void {
    console.log('this.data:', this.data);
    console.log("premuto reverse");
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Start REV", this.data.motor.CMD_STARTREV, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_START_REVERSE = true;
  }

  onSTOPClick(): void {
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Stop", this.data.motor.CMD_STOP, true, "", this.appService.user); } catch (e) { }
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

}
