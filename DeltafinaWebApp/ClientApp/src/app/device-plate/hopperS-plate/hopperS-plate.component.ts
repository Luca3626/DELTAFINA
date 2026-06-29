import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HopperSModel } from 'src/app/models/device/hopperS.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'hoppers-plate',
  templateUrl: './hoppers-plate.component.html',
  styleUrls: ['hoppers-plate.css'],
})
export class HopperSPlateComponent {

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
  newSET_VELOCITA_SCARICO: number;

  get CmdDisabilitaScarico(): boolean {
    if (this.data.hopperS.CMD_ESCLUDE)
      return this.data.hopperS.CMD_ESCLUDE.value;
    else
      return false;
  }

  set CmdDisabilitaScarico(value) {
    if (this.data.hopperS.CMD_ESCLUDE) {
      try { this.userService.logParameterTagValues(this.data.hopperS.name.toUpperCase() + ": Disabilita carico", this.data.hopperS.CMD_ESCLUDE, value, "", this.appService.user); } catch (e) { }
      this.data.hopperS.CMD_ESCLUDE.value = value;
    }
  }

  get CmdAbilitaVibratore(): boolean {
    if (this.data.hopperS.CMD_ABILITA_VIBRATORE)
      return this.data.hopperS.CMD_ABILITA_VIBRATORE.value;
    else
      return false;
  }
  set CmdAbilitaVibratore(value) {
    if (this.data.hopperS.CMD_ABILITA_VIBRATORE) {
      try { this.userService.logParameterTagValues(this.data.hopperS.name.toUpperCase() + ": Abilita vibratore", this.data.hopperS.CMD_ABILITA_VIBRATORE, value, "", this.appService.user); } catch (e) { }
      this.data.hopperS.CMD_ABILITA_VIBRATORE.value = value;
    }
  }

  get CmdForzaLL(): boolean {
    if (this.data.hopperS.CMD_SIMULA_MINIMO)
      return this.data.hopperS.CMD_SIMULA_MINIMO.value;
    else
      return false;
  }
  set CmdForzaLL(value) {
    if (this.data.hopperS.CMD_SIMULA_MINIMO) {
      try { this.userService.logParameterTagValues(this.data.hopperS.name.toUpperCase() + ": Disabilita scarico", this.data.hopperS.CMD_SIMULA_MINIMO, value, "", this.appService.user); } catch (e) { }
      this.data.hopperS.CMD_SIMULA_MINIMO.value = value;
    }
  }

  onSET_VELOCITA_SCARICOConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione velocità scarico", this.data.hopperS.SET_VELOCITA_SCARICO, this.newSET_VELOCITA_SCARICO, "", this.appService.user); } catch (e) { }
    this.data.hopperS.SET_VELOCITA_SCARICO.value = this.newSET_VELOCITA_SCARICO;
  }


  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<HopperSPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
