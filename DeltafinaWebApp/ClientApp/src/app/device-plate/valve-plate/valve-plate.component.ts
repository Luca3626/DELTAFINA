import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotorModel } from 'src/app/models/device/motor.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'valve-plate',
  templateUrl: './valve-plate.component.html',
  styleUrls: ['valve-plate.css'],
})
export class ValvePlateComponent {

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<ValvePlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onMANClick(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": utenza in manuale", this.data.valve.CMD_MAN, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_MAN.value = true;
  }

  onSEMIClick(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": utenza in semi automatico", this.data.valve.CMD_SEMI, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_SEMI.value = true;
  }

  onLOC_OFF_Click(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": utenza in remoto", this.data.valve.CMD_REM, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_REM.value = true;
  }

  onLOC_ON_Click(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": utenza in locale", this.data.valve.CMD_LOC, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_LOC.value = true;
  }

  onAUTClick(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": utenza in automatico", this.data.valve.CMD_AUT, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_AUT.value = true;
  }

  onAPRIClick(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": Valvola aperta", this.data.valve.CMD_OPEN, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_OPEN.value = true;
  }

  onCHIUDIClick(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": Valvola chiusa", this.data.valve.CMD_CLOSE, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_CLOSE.value = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onResetStarts1(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": Reset partenza 1 ", this.data.valve.CMD_RESET_STARTS_1, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_RESET_STARTS_1.value = true;
  }

  onResetStarts2(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": Reset partenza 2 ", this.data.valve.CMD_RESET_STARTS_2, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_RESET_STARTS_2.value = true;
  }

  onResetTrip1(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": Reset contatore 1 ", this.data.valve.CMD_RESET_TRIP_1, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_RESET_TRIP_1.value = true;
  }

  onResetTrip2(): void {
    try { this.userService.logParameterTagValues(this.data.valve.name.toUpperCase() + ": Reset contatore 2 ", this.data.valve.CMD_RESET_TRIP_2, true, "", this.appService.user); } catch (e) { }
    this.data.valve.CMD_RESET_TRIP_2.value = true;
  }

}
