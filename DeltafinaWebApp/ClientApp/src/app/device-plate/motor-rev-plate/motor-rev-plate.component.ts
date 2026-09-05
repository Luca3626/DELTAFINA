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

  // Riferimenti dell'inverter digitati dall'operatore (tab Inverter).
  newManRef: number;
  newAutRef: number;

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<MotorRevPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // #region Etichette dei due versi
  // Di default sono FWD e REV; la pagina che apre il popup puo' valorizzare
  // FWD_TEXT/REV_TEXT sul modello (p.es. i nomi delle due destinazioni di uno shuttle)
  // e INVERT_REV_FWD quando il verso "avanti" del PLC e' invertito rispetto al disegno.
  get FwdText(): string {
    const motor: MotorModel = this.data.motor;
    if (motor == null) return "FWD";
    return (motor.INVERT_REV_FWD ? motor.REV_TEXT : motor.FWD_TEXT) || "FWD";
  }

  get RevText(): string {
    const motor: MotorModel = this.data.motor;
    if (motor == null) return "REV";
    return (motor.INVERT_REV_FWD ? motor.FWD_TEXT : motor.REV_TEXT) || "REV";
  }
  // #endregion

  // ManAut: man=0, AUT=1 (toggle unico)
  onMANClick(): void {
    if (this.data.motor.CMD_MAN_AUT == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Utenza in manuale", this.data.motor.CMD_MAN_AUT, false, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_MAN_AUT.value = false;
  }

  onAUTClick(): void {
    if (this.data.motor.CMD_MAN_AUT == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Utenza in automatico", this.data.motor.CMD_MAN_AUT, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_MAN_AUT.value = true;
  }

  // Marcia manuale: ManCmdFwd/ManCmdRev toggle (true = marcia, false = stop).
  // CMD_START_FORWARD/REVERSE azzerano il verso opposto prima di attivare quello richiesto.
  onSTART_FWD_Click(): void {
    if (this.data.motor.CMD_MAN_FWD == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Start FWD", this.data.motor.CMD_MAN_FWD, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_START_FORWARD = true;
  }

  onSTART_REV_Click(): void {
    if (this.data.motor.CMD_MAN_REV == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Start REV", this.data.motor.CMD_MAN_REV, true, "", this.appService.user); } catch (e) { }
    this.data.motor.CMD_START_REVERSE = true;
  }

  onSTOPClick(): void {
    if (this.data.motor.CMD_MAN_FWD == null && this.data.motor.CMD_MAN_REV == null) return;
    try { this.userService.logParameterTagValues(this.data.motor.name.toUpperCase() + ": Stop", this.data.motor.CMD_MAN_FWD, false, "", this.appService.user); } catch (e) { }
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
