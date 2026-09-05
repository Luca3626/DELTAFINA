import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiloModel } from 'src/app/models/warehouse/silo.models';
import { SiloService } from 'src/app/services/silo.service';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { TagsList } from '../../tags/tags-list';
import { SignalRService } from '../../signalr-client/signalr.service';

@Component({
  selector: 'silo-plate',
  templateUrl: './silo-plate.component.html',
  styleUrls: ['silo-plate.css'],
})
export class SiloPlateComponent {

  descriptionTxt: string = "";

  newSlowSpeed: number;
  newHighSpeed: number;
  newSET_VOLO: number;
  newSET_P_RALLENTAMENTO: number;
  newHL: number;
  newSET_FONDO_VIBRANTE: number;
  newTramoggeInSilo: number;
  newTramoggeInSiloS2: number;
  newTramoggeInSiloS12: number;
  newTramoggeInSiloS13: number;
  newTramoggeInSiloS14: number;
  newTramoggeInSiloS15: number;
  newTramoggeInSiloS16: number;

  get TagList(): TagsList {
      return SignalRService.tagList;
  }

  //get CmdAbilitaSilo(): boolean {
  //  if (this.data.silo.CMD_ABILITA_SILO != null)
  //    return this.data.silo.CMD_ABILITA_SILO.value;
  //  else
  //    return null;
  //}
  //set CmdAbilitaSilo(value) {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Abilita carico", this.data.silo.CMD_ABILITA_SILO, value, "", this.appService.user); } catch (e) { }
  //  this.data.silo.CMD_ABILITA_SILO.value = value;
  //}

  //get CmdAbilitaRiempimento(): boolean {
  //  if (this.data.silo.CMD_ABILITA_RIEMPIMENTO != null)
  //    return this.data.silo.CMD_ABILITA_RIEMPIMENTO.value;
  //  else
  //    return null;
  //}
  //set CmdAbilitaRiempimento(value) {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Abilita riempimento", this.data.silo.CMD_ABILITA_RIEMPIMENTO, value, "", this.appService.user); } catch (e) { }
  //  this.data.silo.CMD_ABILITA_RIEMPIMENTO.value = value;
  //}

  ////unity = "KG";
  //get Unity(): string {
  //  if (this.data.silo.name == "T4A" || this.data.silo.name == "T4B")
  //    return "G";
  //  else
  //    return "KG";
  //}

  //siloInfo: SiloModel;

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<SiloPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private siloService: SiloService) {
    this.loadInfo();
  }

  async loadInfo() {
    //this.siloInfo = await this.siloService.getByName(this.data.silo.name);

    //if (this.siloInfo != null)
    //  this.descriptionTxt = this.siloInfo.material;
    //else
    //  this.descriptionTxt = "";
  }

  //onHLConfirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Impostazione livello HL", this.data.silo.hopper.SET_HL, this.newHL, "%", this.appService.user); } catch (e) { }
  //  this.data.silo.SET_HL.value = this.newHL;
  //}

  //onTramoggeInSiloConfirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S1_TRAMOGGE_IN_SILO.value, this.newTramoggeInSilo, "", this.appService.user); } catch (e) { }
  //  this.TagList.S1_TRAMOGGE_IN_SILO.value = this.newTramoggeInSilo;
  //  }

  //  onTramoggeInSiloS2Confirm(value): void {
  //    try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S2_TRAMOGGE_IN_SILO.value, this.newTramoggeInSiloS2, "", this.appService.user); } catch (e) { }
  //    this.TagList.S2_TRAMOGGE_IN_SILO.value = this.newTramoggeInSiloS2;
  //}

  //onTramoggeInSiloS12Confirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S12_TRAMOGGE_IN_SILO.value, this.newTramoggeInSiloS12, "", this.appService.user); } catch (e) { }
  //  this.TagList.S12_TRAMOGGE_IN_SILO.value = this.newTramoggeInSiloS12;
  //}

  //onTramoggeInSiloS13Confirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S13_TRAMOGGE_IN_SILO.value, this.newTramoggeInSiloS13, "", this.appService.user); } catch (e) { }
  //  this.TagList.S13_TRAMOGGE_IN_SILO.value = this.newTramoggeInSiloS13;
  //}

  //onTramoggeInSiloS14Confirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S14_TRAMOGGE_IN_SILO.value, this.newTramoggeInSiloS14, "", this.appService.user); } catch (e) { }
  //  this.TagList.S14_TRAMOGGE_IN_SILO.value = this.newTramoggeInSiloS14;
  //}

  //onTramoggeInSiloS15Confirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S15_TRAMOGGE_IN_SILO.value, this.newTramoggeInSiloS15, "", this.appService.user); } catch (e) { }
  //  this.TagList.S15_TRAMOGGE_IN_SILO.value = this.newTramoggeInSiloS15;
  //}

  //onTramoggeInSiloS16Confirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Tramogge su Silo", this.TagList.S16_TRAMOGGE_IN_SILO.value, this.newTramoggeInSiloS16, "", this.appService.user); } catch (e) { }
  //  this.TagList.S16_TRAMOGGE_IN_SILO.value = this.newTramoggeInSiloS16;
  //}

  //onSlowSpeedConfirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Velocità di carimamento lento", this.data.silo.SET_RIF_INV_LENTO, this.newSlowSpeed, "%", this.appService.user); } catch (e) { }
  //  this.data.silo.SET_RIF_INV_LENTO.value = this.newSlowSpeed;
  //}

  //onHighSpeedConfirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Velocità di carimamento rapido", this.data.silo.SET_RIF_INV_VELOCE, this.newHighSpeed, "%", this.appService.user); } catch (e) { }
  //  this.data.silo.SET_RIF_INV_VELOCE.value = this.newHighSpeed;
  //}

  //onSET_VOLOConfirm(value): void {
  //  if (this.data.silo.name == "TR4A" || this.data.silo.name == "TR4B")
  //    try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Impostazione volo", this.data.silo.SET_VOLO, this.newSET_VOLO, "G", this.appService.user); } catch (e) { }
  //  else
  //    try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Impostazione volo", this.data.silo.SET_VOLO, this.newSET_VOLO, "KG", this.appService.user); } catch (e) { }
  //  this.data.silo.SET_VOLO.value = this.newSET_VOLO;
  //}

  //onSET_FONDO_VIBRANTEConfirm(value): void {
  //  try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Modalità Fondo Vibrante", this.data.silo.SET_MOD_SP, this.newSET_FONDO_VIBRANTE, "", this.appService.user); } catch (e) { }
  //  this.data.silo.SET_MOD_SP.value = this.newSET_FONDO_VIBRANTE;
  //}

  //getModeName(value: number): string {
  //  switch (value) {
  //    case 0: return 'Escluso';
  //    case 1: return 'Sempre On';
  //    case 2: return 'Pausa Lavoro';
  //    case 3: return 'Portata';
  //    case 4: return 'Pausa Lavoro + Portata';
  //    default: return '';
  //  }
  //}

  //onSET_P_RALLENTAMENTOConfirm(value): void {
  //  if (this.data.silo.name == "TR4A" || this.data.silo.name == "TR4B")
  //    try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Impostazione peso inizio rallentamento", this.data.silo.SET_P_RALLENTAMENTO, this.newSET_P_RALLENTAMENTO, "G", this.appService.user); } catch (e) { }
  //  else
  //    try { this.userService.logParameterTagValues(this.data.silo.name.toUpperCase() + ": Impostazione peso inizio rallentamento", this.data.silo.SET_P_RALLENTAMENTO, this.newSET_P_RALLENTAMENTO, "KG", this.appService.user); } catch (e) { }
  //  this.data.silo.SET_P_RALLENTAMENTO.value = this.newSET_P_RALLENTAMENTO;
  //}

  //onNoClick(): void {
  //  this.dialogRef.close();
  //}

}
