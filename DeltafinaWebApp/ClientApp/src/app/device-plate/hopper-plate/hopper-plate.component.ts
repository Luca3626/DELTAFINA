import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HopperModel } from 'src/app/models/device/hopper.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'hopper-plate',
  templateUrl: './hopper-plate.component.html',
  styleUrls: ['hopper-plate.css'],
})
export class HopperPlateComponent {

  newSpeed: number;
  newPesoMassimo: number;

  newTempoSgocciolamento: number;
  newTempoAttesaScarico: number;
  newTempoScarico: number;

  newState: number;

  newFuoriZero: number;

  newHHL: number;
  newHL: number;
  newLLL: number;
  newLL: number;
  newSET_ANTICIPO_NUOVO_DOSAGGIO: number;
  newSET_PESO_MASSIMO: number;
  newSET_FUORI_ZERO: number;

  get CmdInclude(): boolean {
    if (this.data.hopper.CMD_INCLUDE != null)
      return this.data.hopper.CMD_INCLUDE.value;
    else
      return null;
  }
  set CmdInclude(value) {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Abilita CARICO", this.data.hopper.CMD_INCLUDE, value, "", this.appService.user); } catch (e) { }
    this.data.hopper.CMD_INCLUDE.value = value;
  }


  get CmdEnableLoad(): boolean {
    if (this.data.hopper.CMD_ENABLE_LOAD != null)
      return this.data.hopper.CMD_ENABLE_LOAD.value;
    else
      return null;
  }
  set CmdEnableLoad(value) {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Abilita CARICO", this.data.hopper.CMD_ENABLE_LOAD, value, "", this.appService.user); } catch (e) { }
    this.data.hopper.CMD_ENABLE_LOAD.value = value;
  }

  get CmdEnableUnload(): boolean {
    if (this.data.hopper.CMD_ENABLE_UNLOAD != null)
      return this.data.hopper.CMD_ENABLE_UNLOAD.value;
    else
      return null;
  }
  set CmdEnableUnload(value) {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Abilita SCARICO", this.data.hopper.CMD_ENABLE_UNLOAD, value, "", this.appService.user); } catch (e) { }
    this.data.hopper.CMD_ENABLE_UNLOAD.value = value;
  }

  get CmdDisabilitaCarico(): boolean {
    if (this.data.hopper.CMD_ESCLUDE)
      return this.data.hopper.CMD_ESCLUDE.value;
    else
      return false;
  }
  set CmdDisabilitaCarico(value) {
    if (this.data.hopper.CMD_ESCLUDE) {
      try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Disabilita carico", this.data.hopper.CMD_ESCLUDE, value, "", this.appService.user); } catch (e) { }
      this.data.hopper.CMD_ESCLUDE.value = value;
    }
  }

  get CmdDisabilitaLivelloL(): boolean {
    if (this.data.hopper.CMD_ESCLUDE_LL)
      return this.data.hopper.CMD_ESCLUDE_LL.value;
    else
      return false;
  }
  set CmdDisabilitaLivelloL(value) {
    if (this.data.hopper.CMD_ESCLUDE_LL) {
      try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Escludi livello L", this.data.hopper.CMD_ESCLUDE_LL, value, "", this.appService.user); } catch (e) { }
      this.data.hopper.CMD_ESCLUDE_LL.value = value;
    }
  }

  get CmdForzaPP(): boolean {
    if (this.data.hopper.CMD_FORZA_PP)
      return this.data.hopper.CMD_FORZA_PP.value;
    else
      return false;
  }

  set CmdForzaPP(value) {
    if (this.data.hopper.CMD_FORZA_PP) {
      try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Forza presenza prodotto", this.data.hopper.CMD_FORZA_PP, value, "", this.appService.user); } catch (e) { }
      this.data.hopper.CMD_FORZA_PP.value = value;
    }
  }


  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<HopperPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onScuotiParete(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Scuoti parete", this.data.hopper.SET_MOD_SP, value, "", this.appService.user); } catch (e) { }
    this.data.hopper.SET_MOD_SP.value = value;
  }

  onSpeedConfirm(value): void {
    if (this.data.hopper.SET_RIF_INV) {
      try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Velocità di scarico", this.data.hopper.SET_RIF_INV, this.newSpeed, "%", this.appService.user); } catch (e) { }
      this.data.hopper.SET_RIF_INV.value = this.newSpeed;
    }
  }

  onTempoSgocciolamentoConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Tempo di sgocciolamento", this.data.hopper.SET_TIME_SGOCCIOLAMENTO, this.newTempoSgocciolamento, "s", this.appService.user); } catch (e) { }
    this.data.hopper.SET_TIME_SGOCCIOLAMENTO.value = this.newTempoSgocciolamento;
  }

  onTempoAttesaScaricoConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Tempo attesa scarico", this.data.hopper.SET_TIME_ATTESA_SCARICO, this.newTempoAttesaScarico, "s", this.appService.user); } catch (e) { }
    this.data.hopper.SET_TIME_ATTESA_SCARICO.value = this.newTempoAttesaScarico;
  }

  onHHLConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione livello HHL", this.data.hopper.hopper.SET_HHL, this.newHHL, "%", this.appService.user); } catch (e) { }
    this.data.hopper.SET_HHL.value = this.newHHL;
  }

  onHLConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione livello HL", this.data.hopper.hopper.SET_HL, this.newHL, "%", this.appService.user); } catch (e) { }
    this.data.hopper.SET_HL.value = this.newHL;
  }

  onLLConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione livello LL", this.data.hopper.hopper.SET_LL, this.newLL, "%", this.appService.user); } catch (e) { }
    this.data.hopper.SET_LL.value = this.newLL;
  }

  onLLLConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione livello LLL", this.data.hopper.hopper.SET_LLL, this.newLLL, "%", this.appService.user); } catch (e) { }
    this.data.hopper.SET_LLL.value = this.newLLL;
  }

  onSET_ANTICIPO_NUOVO_DOSAGGIOConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Peso di ripartenza mixer", this.data.hopper.hopper.SET_ANTICIPO_NUOVO_DOSAGGIO, this.newSET_ANTICIPO_NUOVO_DOSAGGIO, "Kg", this.appService.user); } catch (e) { }
    this.data.hopper.SET_ANTICIPO_NUOVO_DOSAGGIO.value = this.newSET_ANTICIPO_NUOVO_DOSAGGIO;
  }

  onSET_PESO_MASSIMOConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione peso massimo", this.data.hopper.hopper.SET_PESO_MASSIMO, this.newSET_PESO_MASSIMO, "Kg", this.appService.user); } catch (e) { }
    this.data.hopper.SET_PESO_MASSIMO.value = this.newSET_PESO_MASSIMO;
  }

  onSET_FUORI_ZEROConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Impostazione fuori zero", this.data.hopper.hopper.SET_FUORI_ZERO, this.newSET_FUORI_ZERO, "Kg", this.appService.user); } catch (e) { }
    this.data.hopper.SET_FUORI_ZERO.value = this.newSET_FUORI_ZERO;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFuoriZeroConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Fuori zero", this.data.hopper.SET_FUORI_ZERO, this.newFuoriZero, "", this.appService.user); } catch (e) { }
    this.data.hopper.SET_FUORI_ZERO.value = this.newFuoriZero;
  }

  onTempoScaricoConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Tempo MAX scarico", this.data.hopper.SET_T_MAX_SCARICO, this.newTempoScarico, "", this.appService.user); } catch (e) { }
    this.data.hopper.SET_T_MAX_SCARICO.value = this.newTempoScarico;
  }

  get UdM_Set_Level(): string {
    if (this.data.hopper.name == "3V282" || this.data.hopper.name == "3V287")
      return "Kg";
    else
      return "%";
  }

  newSlowSpeed: number;
  onSlowSpeedConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Velocità di carimamento lento", this.data.hopper.SET_RIF_INV_LENTO, this.newSlowSpeed, "%", this.appService.user); } catch (e) { }
    this.data.hopper.SET_RIF_INV_LENTO.value = this.newSlowSpeed;
  }

  newHighSpeed: number;
  onHighSpeedConfirm(value): void {
    try { this.userService.logParameterTagValues(this.data.hopper.name.toUpperCase() + ": Velocità di carimamento rapido", this.data.hopper.SET_RIF_INV_VELOCE, this.newHighSpeed, "%", this.appService.user); } catch (e) { }
    this.data.hopper.SET_RIF_INV_VELOCE.value = this.newHighSpeed;
  }

}
