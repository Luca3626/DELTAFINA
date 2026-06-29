import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { TagsList } from '../../tags/tags-list';
import { SignalRService } from '../../signalr-client/signalr.service';

@Component({
  selector: 'settingR-plate',
  templateUrl: './settingR-plate.component.html',
  styleUrls: ['settingR-plate.css'],
})

export class SettingRComponent {

  // #region CARICO ROTTAME
  newVelocitaTramoggiaRottame_1: number;
  newVelocitaTramoggeRottame_2: number;
  newVelocitaTramoggeRottame_3: number;
  newVelocitaTramoggeRottame_4: number;
  newVelocitaTramoggeRottame_5: number;
  newVelocitaTramoggeRottame_6: number;
  newRifInverterRottame: number;
  // #endregion

  // #region CARICO SABBIA
  newVelocitaTramoggiaSabbia_1: number;
  newVelocitaTramoggeSabbia_2: number;
  newVelocitaTramoggeSabbia_3: number;
  newVelocitaTramoggeSabbia_4: number;
  newVelocitaTramoggeSabbia_5: number;
  newRifInverterSabbia: number;
  // #endregion

  // #region IMPIANTO ASPIRAZIONE

  newTempoRichiestaAvvioCiclone: number;
  newTempoScaricoRotocella: number;

  // #endregion


  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<SettingRComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  // #region CARICO ROTTAME

  onVelocita_1_TramoggiaRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: Impostazione velocità percentuale 1 tramoggia", SignalRService.tagList.PC_VEL_PERC_ROTTAME_1_TRAMOGGIA, this.newVelocitaTramoggiaRottame_1, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_ROTTAME_1_TRAMOGGIA.value = this.newVelocitaTramoggiaRottame_1;
  }

  onVelocita_2_TramoggeRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: Impostazione velocità percentuale 2 tramogge", SignalRService.tagList.PC_VEL_PERC_ROTTAME_2_TRAMOGGE, this.newVelocitaTramoggeRottame_2, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_ROTTAME_2_TRAMOGGE.value = this.newVelocitaTramoggeRottame_2;
  }

  onVelocita_3_TramoggeRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: Impostazione velocità percentuale 3 tramogge", SignalRService.tagList.PC_VEL_PERC_ROTTAME_3_TRAMOGGE, this.newVelocitaTramoggeRottame_3, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_ROTTAME_3_TRAMOGGE.value = this.newVelocitaTramoggeRottame_3;
  }

  onVelocita_4_TramoggeRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: Impostazione velocità percentuale 4 tramogge", SignalRService.tagList.PC_VEL_PERC_ROTTAME_4_TRAMOGGE, this.newVelocitaTramoggeRottame_4, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_ROTTAME_4_TRAMOGGE.value = this.newVelocitaTramoggeRottame_4;
  }

  onVelocita_5_TramoggeRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: Impostazione velocità percentuale 5 tramogge", SignalRService.tagList.PC_VEL_PERC_ROTTAME_5_TRAMOGGE, this.newVelocitaTramoggeRottame_5, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_ROTTAME_5_TRAMOGGE.value = this.newVelocitaTramoggeRottame_5;
  }

  onVelocita_6_TramoggeRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: Impostazione velocità percentuale 6 tramogge", SignalRService.tagList.PC_VEL_PERC_ROTTAME_6_TRAMOGGE, this.newVelocitaTramoggeRottame_6, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_ROTTAME_6_TRAMOGGE.value = this.newVelocitaTramoggeRottame_6;
  }

  onRifInvRottameConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO ROTTAME: riferimento massimo per inverter ricezione rottame", SignalRService.tagList.MAX_RIF_INV_ROTTAME, this.newRifInverterRottame, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.MAX_RIF_INV_ROTTAME.value = this.newRifInverterRottame;
  }

  // #endregion

  // #region CARICO SABBIA

  onVelocita_1_TramoggiarSabbiaConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO SABBIA: Impostazione velocità percentuale 1 tramoggia", SignalRService.tagList.PC_VEL_PERC_SABBIA_1_TRAMOGGIA, this.newVelocitaTramoggiaSabbia_1, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_SABBIA_1_TRAMOGGIA.value = this.newVelocitaTramoggiaSabbia_1;
  }

  onVelocita_2_TramoggeSabbiaConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO SABBIA: Impostazione velocità percentuale 2 tramogge", SignalRService.tagList.PC_VEL_PERC_SABBIA_2_TRAMOGGE, this.newVelocitaTramoggeSabbia_2, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_SABBIA_2_TRAMOGGE.value = this.newVelocitaTramoggeSabbia_2;
  }

  onVelocita_3_TramoggeSabbiaConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO SABBIA: Impostazione velocità percentuale 3 tramogge", SignalRService.tagList.PC_VEL_PERC_SABBIA_3_TRAMOGGE, this.newVelocitaTramoggeSabbia_3, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_SABBIA_3_TRAMOGGE.value = this.newVelocitaTramoggeSabbia_3;
  }

  onVelocita_4_TramoggeSabbiaConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO SABBIA: Impostazione velocità percentuale 4 tramogge", SignalRService.tagList.PC_VEL_PERC_SABBIA_4_TRAMOGGE, this.newVelocitaTramoggeSabbia_4, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_SABBIA_4_TRAMOGGE.value = this.newVelocitaTramoggeSabbia_4;
  }

  onVelocita_5_TramoggeSabbiaConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO SABBIA: Impostazione velocità percentuale 5 tramogge", SignalRService.tagList.PC_VEL_PERC_SABBIA_5_TRAMOGGE, this.newVelocitaTramoggeSabbia_5, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_VEL_PERC_SABBIA_5_TRAMOGGE.value = this.newVelocitaTramoggeSabbia_5;
  }

  onRifInvSabbiaConfirm(): void {
    try { this.userService.logParameterTagValues("CARICO SABBIA: riferimento massimo per inverter ricezione sabbia", SignalRService.tagList.MAX_RIF_INV_SABBIA, this.newRifInverterSabbia, "%", this.appService.user); } catch (e) { }
    SignalRService.tagList.MAX_RIF_INV_SABBIA.value = this.newRifInverterSabbia;
  }

  // #endregion

  // #region IMPIANTO ASPIRAZIONE

  onTempoRichiestaAvvioCicloneConfirm(): void {
    try { this.userService.logParameterTagValues("IMPIANTO ASPIRAZIONE: tempo di arresto richiesta avvio ciclone ad impianto aspirazione", SignalRService.tagList.PC_T_RESET_RICHIESTA_AVVIO_CICLONE_AD_ASPIRAZIONE, this.newTempoRichiestaAvvioCiclone, "s.", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_T_RESET_RICHIESTA_AVVIO_CICLONE_AD_ASPIRAZIONE.value = this.newTempoRichiestaAvvioCiclone;
  }

  onTempoScaricoRotocellaConfirm(): void {
    try { this.userService.logParameterTagValues("IMPIANTO ASPIRAZIONE: tempo di arresto richiesta avvio ciclone ad impianto aspirazione", SignalRService.tagList.PC_T_STOP_ROTOCELLA_RECUPERO_POLVERI, this.newTempoScaricoRotocella, "s.", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_T_STOP_ROTOCELLA_RECUPERO_POLVERI.value = this.newTempoScaricoRotocella;
  }

  // #endregion

  onNoClick(): void {
    this.dialogRef.close();
  }
}
