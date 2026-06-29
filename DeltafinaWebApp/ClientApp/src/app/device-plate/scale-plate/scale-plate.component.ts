import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScaleModel } from 'src/app/models/device/scale.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'scale-plate',
  templateUrl: './scale-plate.component.html',
  styleUrls: ['scale-plate.css'],
})
export class ScalePlateComponent {

  newSlowSpeed: number;
  newHighSpeed: number;
  newPriority: number;
  newFuoriZero: number;
  newCapacitaMax: number;
  newPesoMassimo: number;

  newTempoCarico: number;
  newTempoScarico: number;
  newTempoSgocciolamento: number;
  newTempoAttesaScarico: number;

  newSET_VOLO: number;
  newSET_P_RALLENTAMENTO: number;
  newHL: number;

  newState: number;

  get Unity(): string {
      return "Kg";
  }

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<ScalePlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSlowSpeedConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Velocità di scarico lento", this.data.scale.SET_RIF_INV_LENTO, this.newSlowSpeed, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_RIF_INV_LENTO.value = this.newSlowSpeed;
  }

  onHighSpeedConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Velocità di scarico rapido", this.data.scale.SET_RIF_INV_VELOCE, this.newHighSpeed, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_RIF_INV_VELOCE.value = this.newHighSpeed;
  }

  onPriorityConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Ordine di carico", this.data.scale.SET_SILO_PRIORITY, this.newPriority, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_SILO_PRIORITY.value = this.newPriority;
  }

  onFuoriZeroConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Fuori zero", this.data.scale.SET_FUORI_ZERO, this.newFuoriZero, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_FUORI_ZERO.value = this.newFuoriZero;

    console.log('Dopo:', this.data.scale.SET_FUORI_ZERO.value);
  }

  onCapMaxConfirm() {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Capacità massima", this.data.scale.SET_CAP_MAX, this.newCapacitaMax, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_CAP_MAX.value = this.newCapacitaMax;
  }

  onPesoMassimoConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Peso massimo", this.data.scale.SET_PESO_MASSIMO, this.newPesoMassimo, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_PESO_MASSIMO.value = this.newPesoMassimo;
  }

  onScuotiParete(value): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Scuoti parete", this.data.scale.SET_MOD_SP, value, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_MOD_SP.value = value;
  }

  onTempoCaricoConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Tempo MAX carico", this.data.scale.SET_T_MAX_CARICO, this.newTempoCarico, "S", this.appService.user); } catch (e) { }
    this.data.scale.SET_T_MAX_CARICO.value = this.newTempoCarico;
  }

  onTempoScaricoConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Tempo MAX scarico", this.data.scale.SET_T_MAX_SCARICO, this.newTempoScarico, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_T_MAX_SCARICO.value = this.newTempoScarico;
  }

  onTempoSgocciolamentoConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Tempo di sgocciolamento", this.data.scale.SET_T_SGOCCIOLAMENTO, this.newTempoSgocciolamento, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_T_SGOCCIOLAMENTO.value = this.newTempoSgocciolamento;
  }

  onTempoAttesaScaricoConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Tempo attesa scarico", this.data.scale.SET_T_ATTESA_SCARICO, this.newTempoAttesaScarico, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_T_ATTESA_SCARICO.value = this.newTempoAttesaScarico;
  }

  onNewStateConfirm(): void {
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Imposta nuovo stato", this.data.scale.SET_NUOVO_STATO, this.newState, "", this.appService.user); } catch (e) { }
    this.data.scale.SET_NUOVO_STATO.value = this.newState;
    try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Stato confermato", this.data.scale.SET_NUOVO_STATO, true, "", this.appService.user); } catch (e) { }
    this.data.scale.CMD_NUOVO_STATO.value = true;
  }

  //onHLConfirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Impostazione livello HL", this.data.scale.hopper.SET_HL, this.newHL, "%", this.appService.user); } catch (e) { }
  //  this.data.scale.SET_HL.value = this.newHL;
  //}

  onSET_VOLOConfirm(value): void {
    if (this.data.scale.name == "TR4A" || this.data.scale.name == "TR4B")
      try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Impostazione volo", this.data.scale.SET_VOLO, this.newSET_VOLO, "G", this.appService.user); } catch (e) { }
    else
      try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Impostazione volo", this.data.scale.SET_VOLO, this.newSET_VOLO, "KG", this.appService.user); } catch (e) { }
    this.data.scale.SET_VOLO.value = this.newSET_VOLO;
  }

  onSET_P_RALLENTAMENTOConfirm(value): void {
    if (this.data.scale.name == "TR4A" || this.data.scale.name == "TR4B")
      try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Impostazione peso inizio rallentamento", this.data.scale.SET_P_RALLENTAMENTO, this.newSET_P_RALLENTAMENTO, "G", this.appService.user); } catch (e) { }
    else
      try { this.userService.logParameterTagValues(this.data.scale.name.toUpperCase() + ": Impostazione peso inizio rallentamento", this.data.scale.SET_P_RALLENTAMENTO, this.newSET_P_RALLENTAMENTO, "KG", this.appService.user); } catch (e) { }
    this.data.scale.SET_P_RALLENTAMENTO.value = this.newSET_P_RALLENTAMENTO;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
