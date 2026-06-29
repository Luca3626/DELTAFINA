import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
//import { HopperRModel } from 'src/app/models/device/hopperR.models';

@Component({
  selector: 'hopperr-plate',
  templateUrl: './hopperr-plate.component.html',
  styleUrls: ['hopperr-plate.css'],
})
export class HopperRPlateComponent {

  newSpeed: number;
  newPesoMassimo: number;

  newTempoSgocciolamento: number;
  newTempoAttesaScarico: number;

  newState: number;

  newHHL: number;
  newHL: number;
  newLLL: number;
  newLL: number;
  newSET_ANTICIPO_NUOVO_DOSAGGIO: number;
  newSET_PESO_MASSIMO: number;

  get CmdDisabilitaScarico(): boolean {
    if (this.data.hopperR.CMD_ESCLUDE)
      return this.data.hopperR.CMD_ESCLUDE.value;
    else
      return false;
  }
  set CmdDisabilitaScarico(value) {
    if (this.data.hopperR.CMD_ESCLUDE) {
      try { this.userService.logParameterTagValues(this.data.hopperR.name.toUpperCase() + ": Disabilita carico", this.data.hopperR.CMD_ESCLUDE, value, "", this.appService.user); } catch (e) { }
      this.data.hopperR.CMD_ESCLUDE.value = value;
    }
  }

  get CmdAbilitaVibratore(): boolean {
    if (this.data.hopperR.CMD_ABILITA_VIBRATORE)
      return this.data.hopperR.CMD_ABILITA_VIBRATORE.value;
    else
      return false;
  }
  set CmdAbilitaVibratore(value) {
    if (this.data.hopperR.CMD_ABILITA_VIBRATORE) {
      try { this.userService.logParameterTagValues(this.data.hopperR.name.toUpperCase() + ": Abilita vibratore", this.data.hopperR.CMD_ABILITA_VIBRATORE, value, "", this.appService.user); } catch (e) { }
      this.data.hopperR.CMD_ABILITA_VIBRATORE.value = value;
    }
  }

  get CmdForzaLL(): boolean {
    if (this.data.hopperR.CMD_SIMULA_MINIMO)
      return this.data.hopperR.CMD_SIMULA_MINIMO.value;
    else
      return false;
  }
  set CmdForzaLL(value) {
    if (this.data.hopperR.CMD_SIMULA_MINIMO) {
      try { this.userService.logParameterTagValues(this.data.hopperR.name.toUpperCase() + ": Disabilita scarico", this.data.hopperR.CMD_SIMULA_MINIMO, value, "", this.appService.user); } catch (e) { }
      this.data.hopperR.CMD_SIMULA_MINIMO.value = value;
    }
  }


  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<HopperRPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
