import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ARIA_LIVE_DELAY } from '@ng-bootstrap/ng-bootstrap/util/accessibility/live';

//import { TrendService } from 'src/app/services/trend.service';
//import { ZoneService } from 'src/app/services/zone.service';
//import { TrendDetailModel } from 'src/app/models/trend.models';
//import { DaysSelectedModel, ValueLabelDisableModel, ResultIntValue } from 'src/app/models/help.models';
//import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
//import { ZoneSelectedModel } from 'src/app/models/zone.models';
//import { ProcessService } from 'src/app/services/process.service';
//import { PlcService } from 'src/app/services/plc.service';
//import { _await } from 'tslib';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from 'src/app/tags/tags-list';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'general', // tslint:disable-line
  templateUrl: './general.component.html',
  styleUrls: [
    '../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../vendor/libs/ng-select/ng-select.scss',
    '../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
  ],
  styles: [`
    :host ::ng-deep ngb-accordion .card + .card {
      margin-top: .25rem;
    }
  `]
})
export class GeneralComponent implements OnInit {

  readonly TITLE: string = "Impostazioni | Parametri";
  readonly MSG_TOAST = "Editazione ricetta cella";

  myTitle: string = "Parametri";

  private sub: any;
  private tagLogName: string;

  name: string;

  // #region GENERALI

  // #region IMPOSTAZIONI DOSAGGIO E TRASPORTO
  new_PC_SOLO_ROTTAME;//OK
  new_PC_ULTIMO_CICLO;
  new_INT_PC_SEL_BC103_BC104; //USATO PRECEDENTEMENTE PER MISCELA UMIDA (ORA CLIMA UMIDO). PERCHE' ? DA CORREGGERE NEL CORRENTE UTILIZZO
  new_REAL_PC_TM1_SOGLIA_ANTICIPO;//OK
  new_DINT_PC_ODC_B1;
  new_DINT_PC_ODC_B2;
  new_DINT_PC_ODC_B3;
  new_DINT_PC_ODC_B3A;
  new_DINT_PC_ODC_B4;
  new_DINT_PC_ODC_B5;
  new_DINT_PC_ODC_B5A;
  new_DINT_PC_ODC_B6;
  new_DINT_PC_ODC_B7;
  // #endregion

  // #region IMPOSTAZIONI SABBIA
  new_INT_PC_N_MAX_TRAMOGGE_SABBIA;//OK
  new_DINT_PC_ODC_CARICO_SABBIA;//OK
  // #endregion

  // #region IMPOSTAZIONI ROTTAMI
  new_INT_PC_N_MAX_TRAMOGGE_ROTTAME;//OK
  new_DINT_PC_ODC_CARICO_ROTTAME_ESTERNO;//OK
  // #endregion


  // #endregion

  // #region VELOCITA'

  // #region VELOCITA' SABBIA
  new_INT_PC_VEL_PERC_SABBIA_1TRA;
  new_INT_PC_VEL_PERC_SABBIA_2TRA;
  new_INT_PC_VEL_PERC_SABBIA_3TRA;
  new_INT_PC_VEL_PERC_SABBIA_4TRA;
  new_INT_PC_VEL_PERC_SABBIA_5TRA;
  new_INT_PC_VEL_PERC_SABBIA_6TRA;
  new_INT_PC_VEL_PERC_ROTTAME_TR11;
  new_REAL_PC_RIF_MAX_INV_SABBIA;
  // #endregion 

  // #region VELOCITA' ROTTAMI
  new_INT_PC_VEL_PERC_ROTTAME_1TRA;
  new_INT_PC_VEL_PERC_ROTTAME_2TRA;
  new_INT_PC_VEL_PERC_ROTTAME_3TRA;
  new_INT_PC_VEL_PERC_ROTTAME_4TRA;
  new_INT_PC_VEL_PERC_ROTTAME_5TRA;
  new_INT_PC_VEL_PERC_ROTTAME_6TRA;
  new_REAL_PC_RIF_MAX_INV_ROTTAME;
  // #endregion

  // #endregion

  // #region TEMPI

  // #region TEMPI PULIZIA DOSAGGIO
  new_INT_PC_T_PULIZIA_N15;
  new_INT_PC_T_PULIZIA_N16;
  new_INT_PC_T_PULIZIA_N14;
  new_INT_PC_T_PULIZIA_N13;
  new_INT_PC_T_PULIZIA_AE7;
  new_INT_PC_T_PULIZIA_E25;
  new_INT_PC_T_PULIZIA_E26;
  new_INT_PC_T_PULIZIA_N11;
  new_INT_PC_T_PULIZIA_N4B;
  new_INT_PC_T_PULIZIA_N4A;
  new_INT_PC_T_PULIZIA_AE4;
  // #endregion

  // #region TEMPI PULIZIA CARICO ROTTAME
  new_INT_PC_T_PULIZIA_AE3;
  new_INT_PC_T_PULIZIA_E132;
  new_INT_PC_T_PULIZIA_AE131;
  new_INT_PC_T_PULIZIA_N127;
  new_INT_PC_T_PULIZIA_AE1;
  new_INT_PC_T_PULIZIA_FR129;
  // #endregion

  // #region TEMPI PULIZIA CARICO SABBIA
  new_INT_PC_T_PULIZIA_AE6;
  new_INT_PC_T_PULIZIA_N7;
  new_INT_PC_T_PULIZIA_E150;
  new_INT_PC_T_PULIZIA_N8;
  new_INT_PC_T_PULIZIA_N9;
  new_INT_PC_T_PULIZIA_N10;
  // #endregion


  // #region TEMPI PAUSA LAVORO SILOS
  new_INT_PC_T_PAUSA_S3;
  new_INT_PC_T_LAVORO_S3;

  new_INT_PC_T_PAUSA_S4;
  new_INT_PC_T_LAVORO_S4;

  new_INT_PC_T_PAUSA_S6;
  new_INT_PC_T_LAVORO_S6;

  new_INT_PC_T_PAUSA_S5;
  new_INT_PC_T_LAVORO_S5;

  new_INT_PC_T_PAUSA_S7;
  new_INT_PC_T_LAVORO_S7;

  new_INT_PC_T_PAUSA_S8;
  new_INT_PC_T_LAVORO_S8;

  new_INT_PC_T_PAUSA_S9;
  new_INT_PC_T_LAVORO_S9;

  new_INT_PC_T_PAUSA_S10;
  new_INT_PC_T_LAVORO_S10;

  new_INT_PC_T_PAUSA_S12;
  new_INT_PC_T_LAVORO_S12;

  new_INT_PC_T_PAUSA_S11;
  new_INT_PC_T_LAVORO_S11;

  new_INT_PC_T_PAUSA_TP6;
  new_INT_PC_T_LAVORO_TP6;

  new_INT_PC_T_PAUSA_TP6A;
  new_INT_PC_T_LAVORO_TP6A;
  // #endregion

  // #region TEMPI PAUSA LAVORO UTENZE

  // #region TEMPI PAUSA LAVORO UTENZE CARICO SABBIA
  new_INT_PC_T_PAUSA_CRN8;
  new_INT_PC_T_LAVORO_CRN8;
  new_INT_PC_T_PAUSA_CRN7;
  new_INT_PC_T_LAVORO_CRN7;
  new_INT_PC_T_PAUSA_CRN9;
  new_INT_PC_T_LAVORO_CRN9;
  // #endregion

  //#region TEMPI PAUSA LAVORO UTENZE ROTTAMI
  new_INT_PC_T_PAUSA_CRET1;
  new_INT_PC_T_LAVORO_CRET1;
  // #endregion
  
  // #region TEMPI PAUSA LAVORO UTENZE DOSAGGIO E TRASPORTI
  new_INT_PC_T_PAUSA_CRN4;
  new_INT_PC_T_LAVORO_CRN4;
  new_INT_PC_T_PAUSA_CRN4A;
  new_INT_PC_T_LAVORO_CRN4A
  new_INT_PC_T_PAUSA_CRN5;
  new_INT_PC_T_LAVORO_CRN5;
  new_INT_PC_T_PAUSA_CRN11;
  new_INT_PC_T_LAVORO_CRN11;
  new_INT_PC_T_PAUSA_CRN13;
  new_INT_PC_T_LAVORO_CRN13;
  new_INT_PC_T_PAUSA_CRN14;
  new_INT_PC_T_LAVORO_CRN14;
  new_INT_PC_T_PAUSA_CRN15;
  new_INT_PC_T_LAVORO_CRN15;
  new_INT_PC_T_PAUSA_CRN16;
  new_INT_PC_T_LAVORO_CRN16;
  new_INT_PC_T_PAUSA_VBN4B;
  new_INT_PC_T_LAVORO_VBN4B;
  new_INT_PC_T_PAUSA_VBE26;
  new_INT_PC_T_LAVORO_VBE26;
  // #endregion 

  T_LAVORO_VB_TRx
  // #endregion

  // #region TEMPI SGOCCIOLAMENTO BILANCE
  new_INT_PC_T_SGOCCIOLAMENTO_B1
  new_INT_PC_T_SGOCCIOLAMENTO_B2
  new_INT_PC_T_SGOCCIOLAMENTO_B3
  new_INT_PC_T_SGOCCIOLAMENTO_B3A
  new_INT_PC_T_SGOCCIOLAMENTO_B4
  new_INT_PC_T_SGOCCIOLAMENTO_B5
  new_INT_PC_T_SGOCCIOLAMENTO_B5A
  new_INT_PC_T_SGOCCIOLAMENTO_B6
  new_INT_PC_T_SGOCCIOLAMENTO_B7
  new_INT_FDB_T_SGOCCIOLAMENTO_TM1
  // #endregion

  // #region TEMPI MASSIMO CARICO - SCARICO
  new_INT_PC_T_MAX_CARICO_B1;
  new_INT_PC_T_MAX_CARICO_B2;
  new_INT_PC_T_MAX_CARICO_B3A;
  new_INT_PC_T_MAX_CARICO_B3;
  new_INT_PC_T_MAX_CARICO_B4;
  new_INT_PC_T_MAX_CARICO_B5;
  new_INT_PC_T_MAX_CARICO_B5A;
  new_INT_PC_T_MAX_CARICO_B6;
  new_INT_PC_T_MAX_CARICO_B7;

  new_INT_PC_T_MAX_SCARICO_B2;
  new_INT_PC_T_MAX_SCARICO_B1;
  new_INT_PC_T_MAX_SCARICO_B3A;
  new_INT_PC_T_MAX_SCARICO_B3;
  new_INT_PC_T_MAX_SCARICO_B4;
  new_INT_PC_T_MAX_SCARICO_B5;
  new_INT_PC_T_MAX_SCARICO_B5A;
  new_INT_PC_T_MAX_SCARICO_B6;
  new_INT_PC_T_MAX_SCARICO_B7;
  // #endregion

  // #region ATTESA SCARICO
  new_INT_PC_T_ATTESA_SCARICO_B1;
  new_INT_PC_T_ATTESA_SCARICO_B2;
  new_INT_PC_T_ATTESA_SCARICO_B3A;
  new_INT_PC_T_ATTESA_SCARICO_B3;
  new_INT_PC_T_ATTESA_SCARICO_B4;
  new_INT_PC_T_ATTESA_SCARICO_B5;
  new_INT_PC_T_ATTESA_SCARICO_B5A;
  new_INT_PC_T_ATTESA_SCARICO_B6;
  new_INT_PC_T_ATTESA_SCARICO_B7;
  new_INT_PC_T_ATTESA_SCARICO_TM1;
  new_INT_PC_T_ATTESA_SCARICO_H2O;
  new_INT_PC_T_ATTESA_APERTURA_BOTOLA;
  // #endregion

  // #endregion
  
  // #region SOGLIE ED ERRORI
  new_REAL_SOGLIA_ALM_ESTR_B1_S1;
  new_REAL_SOGLIA_ALM_ESTR_B1_S2;
  new_REAL_SOGLIA_ALM_ESTR_B2_S3;
  new_REAL_SOGLIA_ALM_ESTR_B2_S4;
  new_REAL_SOGLIA_ALM_ESTR_B3_S5;
  new_REAL_SOGLIA_ALM_ESTR_B3A_S6;
  new_REAL_SOGLIA_ALM_ESTR_B4_S7;
  new_REAL_SOGLIA_ALM_ESTR_B4_S8;
  new_REAL_SOGLIA_ALM_ESTR_B4_S9;
  new_REAL_SOGLIA_ALM_ESTR_B4_S10;
  new_REAL_SOGLIA_ALM_ESTR_B5A_S11;
  new_REAL_SOGLIA_ALM_ESTR_B5_S12;
  new_REAL_SOGLIA_ALM_ESTR_B6_TP6;
  new_REAL_SOGLIA_ALM_ESTR_B6_TP6A;
  new_REAL_SOGLIA_ALM_ESTR_B7_S13;
  new_REAL_SOGLIA_ALM_ESTR_B7_S14;
  new_REAL_SOGLIA_ALM_ESTR_B7_S15;
  new_REAL_SOGLIA_ALM_ESTR_B7_S16;
  // #endregion
  
  new_BOOL_PC_MISCELA_UMIDA;



  onConfirm(tagName): void {
    switch (tagName) {

      case "PC_CLIMA_UMIDO":
        try {
          this.userService.logParameterTagValues("Pulizia trasporti finali", SignalRService.tagList.PC_CLIMA_UMIDO, this.new_BOOL_PC_MISCELA_UMIDA, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_CLIMA_UMIDO.value = this.new_BOOL_PC_MISCELA_UMIDA == 1;
        break;

      case "PC_SOLO_ROTTAME":
        try { this.userService.logParameterTagValues("Fase di riempimento forno: utilizzare solo il rottame di B7-T24-T25", SignalRService.tagList.PC_SOLO_ROTTAME, this.new_PC_SOLO_ROTTAME, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_SOLO_ROTTAME.value = this.new_PC_SOLO_ROTTAME == 1;
        break;
      case "PC_ULTIMO_CICLO"://ok
        try { this.userService.logParameterTagValues("impostazioni dosaggio e trasporto: Fine dosaggi bilance", SignalRService.tagList.PC_ULTIMO_CICLO, this.new_PC_ULTIMO_CICLO, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ULTIMO_CICLO.value = this.new_PC_ULTIMO_CICLO == 1;
        break;
      case "PC_N_MAX_TRAMOGGE_SABBIA":
        try { this.userService.logParameterTagValues("Numero massimo tramogge sabbia durante il carico", SignalRService.tagList.PC_N_MAX_TRAMOGGE_SABBIA, this.new_INT_PC_N_MAX_TRAMOGGE_SABBIA, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_N_MAX_TRAMOGGE_SABBIA.value = this.new_INT_PC_N_MAX_TRAMOGGE_SABBIA;
        break;
      case "PC_N_MAX_TRAMOGGE_ROTTAME":
        try { this.userService.logParameterTagValues("Numero massimo tramogge rottame durante il carico", SignalRService.tagList.PC_N_MAX_TRAMOGGE_ROTTAME, this.new_INT_PC_N_MAX_TRAMOGGE_ROTTAME, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_N_MAX_TRAMOGGE_ROTTAME.value = this.new_INT_PC_N_MAX_TRAMOGGE_ROTTAME;
        break;

      // #region VELOCITA' PERCENTUALE TRAMOGGE SABBIA
      case "MAX_RIF_INV_SABBIA":
        try { this.userService.logParameterTagValues("Riferimento massimo per inverter ricezione sabbia", SignalRService.tagList.MAX_RIF_INV_SABBIA, this.new_REAL_PC_RIF_MAX_INV_SABBIA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.MAX_RIF_INV_SABBIA.value = this.new_REAL_PC_RIF_MAX_INV_SABBIA;
        break;
      case "PC_VEL_PERC_SABBIA_1_TRAMOGGIA":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 1 tramoggia SABBIA", SignalRService.tagList.PC_VEL_PERC_SABBIA_1_TRAMOGGIA, this.new_INT_PC_VEL_PERC_SABBIA_1TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_SABBIA_1_TRAMOGGIA.value = this.new_INT_PC_VEL_PERC_SABBIA_1TRA;
        break;
      case "PC_VEL_PERC_SABBIA_2_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 2 tramogge SABBIA", SignalRService.tagList.PC_VEL_PERC_SABBIA_2_TRAMOGGE, this.new_INT_PC_VEL_PERC_SABBIA_2TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_SABBIA_2_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_SABBIA_2TRA;
        break;
      case "PC_VEL_PERC_SABBIA_3_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 3 tramoggia SABBIA", SignalRService.tagList.PC_VEL_PERC_SABBIA_3_TRAMOGGE, this.new_INT_PC_VEL_PERC_SABBIA_3TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_SABBIA_3_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_SABBIA_3TRA;
        break;
      case "PC_VEL_PERC_SABBIA_4_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 4 tramogge SABBIA", SignalRService.tagList.PC_VEL_PERC_SABBIA_4_TRAMOGGE, this.new_INT_PC_VEL_PERC_SABBIA_4TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_SABBIA_4_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_SABBIA_4TRA;
        break;
      case "PC_VEL_PERC_SABBIA_5_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 5 tramogge SABBIA", SignalRService.tagList.PC_VEL_PERC_SABBIA_5_TRAMOGGE, this.new_INT_PC_VEL_PERC_SABBIA_5TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_SABBIA_5_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_SABBIA_5TRA;
        break;
      case "PC_VEL_PERC_SABBIA_6_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 6 tramogge SABBIA", SignalRService.tagList.PC_VEL_PERC_SABBIA_6_TRAMOGGE, this.new_INT_PC_VEL_PERC_SABBIA_6TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_SABBIA_6_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_SABBIA_6TRA;
        break;
      case "PC_VEL_PERC_ROTTAME_TR11":
        try { this.userService.logParameterTagValues("Velocità di scaricamento inverter tramoggia TR11", SignalRService.tagList.PC_VEL_PERC_ROTTAME_TR11, this.new_INT_PC_VEL_PERC_ROTTAME_TR11, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_TR11.value = this.new_INT_PC_VEL_PERC_ROTTAME_TR11;
        break;
      // #endregion

      // #region VELOCITA' PERCENTUALE TRAMOGGE ROTTAME
      case "MAX_RIF_INV_ROTTAME":
        try { this.userService.logParameterTagValues("Riferimento massimo per inverter ricezione ROTTAME", SignalRService.tagList.MAX_RIF_INV_ROTTAME, this.new_REAL_PC_RIF_MAX_INV_ROTTAME, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.MAX_RIF_INV_ROTTAME.value = this.new_REAL_PC_RIF_MAX_INV_ROTTAME;
        break;
      case "PC_VEL_PERC_ROTTAME_1_TRAMOGGIA":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 1 tramoggia ROTTAME", SignalRService.tagList.PC_VEL_PERC_ROTTAME_1_TRAMOGGIA, this.new_INT_PC_VEL_PERC_ROTTAME_1TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_1_TRAMOGGIA.value = this.new_INT_PC_VEL_PERC_ROTTAME_1TRA;
        break;
      case "PC_VEL_PERC_ROTTAME_2_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 2 tramogge ROTTAME", SignalRService.tagList.PC_VEL_PERC_ROTTAME_2_TRAMOGGE, this.new_INT_PC_VEL_PERC_ROTTAME_2TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_2_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_ROTTAME_2TRA;
        break;
      case "PC_VEL_PERC_ROTTAME_3_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 3 tramoggia ROTTAME", SignalRService.tagList.PC_VEL_PERC_ROTTAME_3_TRAMOGGE, this.new_INT_PC_VEL_PERC_ROTTAME_3TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_3_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_ROTTAME_3TRA;
        break;
      case "PC_VEL_PERC_ROTTAME_4_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 4 tramogge ROTTAME", SignalRService.tagList.PC_VEL_PERC_ROTTAME_4_TRAMOGGE, this.new_INT_PC_VEL_PERC_ROTTAME_4TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_4_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_ROTTAME_4TRA;
        break;
      case "PC_VEL_PERC_ROTTAME_5_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 5 tramogge ROTTAME", SignalRService.tagList.PC_VEL_PERC_ROTTAME_5_TRAMOGGE, this.new_INT_PC_VEL_PERC_ROTTAME_5TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_5_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_ROTTAME_5TRA;
        break;
      case "PC_VEL_PERC_ROTTAME_6_TRAMOGGE":
        try { this.userService.logParameterTagValues("Velocità di riferimento per 6 tramogge ROTTAME", SignalRService.tagList.PC_VEL_PERC_ROTTAME_6_TRAMOGGE, this.new_INT_PC_VEL_PERC_ROTTAME_6TRA, "%", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_VEL_PERC_ROTTAME_6_TRAMOGGE.value = this.new_INT_PC_VEL_PERC_ROTTAME_6TRA;
        break;
      // #endregion


      // #region TEMPI PULIZIA (DOSAGGIO)

      case "PC_T_PULIZIA_N15":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N15", SignalRService.tagList.PC_T_PULIZIA_N15, this.new_INT_PC_T_PULIZIA_N15, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N15.value = this.new_INT_PC_T_PULIZIA_N15;
        break;
      case "PC_T_PULIZIA_N16":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N16", SignalRService.tagList.PC_T_PULIZIA_N16, this.new_INT_PC_T_PULIZIA_N16, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N16.value = this.new_INT_PC_T_PULIZIA_N16;
        break;
      case "PC_T_PULIZIA_N14":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N14", SignalRService.tagList.PC_T_PULIZIA_N14, this.new_INT_PC_T_PULIZIA_N14, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N14.value = this.new_INT_PC_T_PULIZIA_N14;
        break;
      case "PC_T_PULIZIA_N13":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N13", SignalRService.tagList.PC_T_PULIZIA_N13, this.new_INT_PC_T_PULIZIA_N13, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N13.value = this.new_INT_PC_T_PULIZIA_N13;
        break;
      case "PC_T_PULIZIA_AE7":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: AE7", SignalRService.tagList.PC_T_PULIZIA_AE7, this.new_INT_PC_T_PULIZIA_AE7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_AE7.value = this.new_INT_PC_T_PULIZIA_AE7;
        break;
      case "PC_T_PULIZIA_E25":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: E25", SignalRService.tagList.PC_T_PULIZIA_E25, this.new_INT_PC_T_PULIZIA_E25, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_E25.value = this.new_INT_PC_T_PULIZIA_E25;
        break;
      case "PC_T_PULIZIA_E26":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: E26", SignalRService.tagList.PC_T_PULIZIA_E26, this.new_INT_PC_T_PULIZIA_E26, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_E26.value = this.new_INT_PC_T_PULIZIA_E26;
        break;
      case "PC_T_PULIZIA_N11":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N11", SignalRService.tagList.PC_T_PULIZIA_N11, this.new_INT_PC_T_PULIZIA_N11, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N11.value = this.new_INT_PC_T_PULIZIA_N11;
        break;
      case "PC_T_PULIZIA_N4B":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N4B", SignalRService.tagList.PC_T_PULIZIA_N4B, this.new_INT_PC_T_PULIZIA_N4B, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N4B.value = this.new_INT_PC_T_PULIZIA_N4B;
        break;
      case "PC_T_PULIZIA_N4A":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N4A", SignalRService.tagList.PC_T_PULIZIA_N4A, this.new_INT_PC_T_PULIZIA_N4A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N4A.value = this.new_INT_PC_T_PULIZIA_N4A;
        break;
      case "PC_T_PULIZIA_AE4":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: AE4", SignalRService.tagList.PC_T_PULIZIA_AE4, this.new_INT_PC_T_PULIZIA_AE4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_AE4.value = this.new_INT_PC_T_PULIZIA_AE4;
        break;

      // #endregion

      // #region TEMPI PULIZIA (CARICO ROTTAME)

      case "PC_T_PULIZIA_AE3":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: AE3", SignalRService.tagList.PC_T_PULIZIA_AE3, this.new_INT_PC_T_PULIZIA_AE3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_AE3.value = this.new_INT_PC_T_PULIZIA_AE3;
        break;
      case "PC_T_PULIZIA_E132":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: E132", SignalRService.tagList.PC_T_PULIZIA_E132, this.new_INT_PC_T_PULIZIA_E132, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_E132.value = this.new_INT_PC_T_PULIZIA_E132;
        break;
      case "PC_T_PULIZIA_AE131":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: AE131", SignalRService.tagList.PC_T_PULIZIA_AE131, this.new_INT_PC_T_PULIZIA_AE131, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_AE131.value = this.new_INT_PC_T_PULIZIA_AE131;
        break;
      case "PC_T_PULIZIA_N127":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N127", SignalRService.tagList.PC_T_PULIZIA_N127, this.new_INT_PC_T_PULIZIA_N127, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N127.value = this.new_INT_PC_T_PULIZIA_N127;
        break;
      case "PC_T_PULIZIA_AE1":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: AE1", SignalRService.tagList.PC_T_PULIZIA_AE1, this.new_INT_PC_T_PULIZIA_AE1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_AE1.value = this.new_INT_PC_T_PULIZIA_AE1;
        break;
      case "PC_T_PULIZIA_FR129":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: FR129", SignalRService.tagList.PC_T_PULIZIA_FR129, this.new_INT_PC_T_PULIZIA_FR129, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_FR129.value = this.new_INT_PC_T_PULIZIA_FR129;
        break;

      // #endregion

      // #region TEMPI PULIZIA (CARICO SABBIA)

      case "PC_T_PULIZIA_AE6":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: AE6", SignalRService.tagList.PC_T_PULIZIA_AE6, this.new_INT_PC_T_PULIZIA_AE6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_AE6.value = this.new_INT_PC_T_PULIZIA_AE6;
        break;
      case "PC_T_PULIZIA_N7":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N7", SignalRService.tagList.PC_T_PULIZIA_N7, this.new_INT_PC_T_PULIZIA_N7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N7.value = this.new_INT_PC_T_PULIZIA_N7;
        break;
      case "PC_T_PULIZIA_E150":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: E150", SignalRService.tagList.PC_T_PULIZIA_E150, this.new_INT_PC_T_PULIZIA_E150, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_E150.value = this.new_INT_PC_T_PULIZIA_E150;
        break;
      case "PC_T_PULIZIA_N8":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N8", SignalRService.tagList.PC_T_PULIZIA_N8, this.new_INT_PC_T_PULIZIA_N8, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N8.value = this.new_INT_PC_T_PULIZIA_N8;
        break;
      case "PC_T_PULIZIA_N9":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N9", SignalRService.tagList.PC_T_PULIZIA_N9, this.new_INT_PC_T_PULIZIA_N9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N9.value = this.new_INT_PC_T_PULIZIA_N9;
        break;
      case "PC_T_PULIZIA_N10":
        try { this.userService.logParameterTagValues("Tempo pulizia utenza: N10", SignalRService.tagList.PC_T_PULIZIA_N10, this.new_INT_PC_T_PULIZIA_N10, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PULIZIA_N10.value = this.new_INT_PC_T_PULIZIA_N10;
        break;

      // #endregion


      // #region TEMPI PAUSA-LAVORO S3
      case "PC_T_PAUSA_S3":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S3", SignalRService.tagList.PC_T_PAUSA_S3, this.new_INT_PC_T_PAUSA_S3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S3.value = this.new_INT_PC_T_PAUSA_S3;
        break;
      case "PC_T_LAVORO_S3":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S3", SignalRService.tagList.PC_T_LAVORO_S3, this.new_INT_PC_T_LAVORO_S3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S3.value = this.new_INT_PC_T_LAVORO_S3;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S4
      case "PC_T_PAUSA_S4":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S4", SignalRService.tagList.PC_T_PAUSA_S4, this.new_INT_PC_T_PAUSA_S4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S4.value = this.new_INT_PC_T_PAUSA_S4;
        break;
      case "PC_T_LAVORO_S4":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S4", SignalRService.tagList.PC_T_LAVORO_S4, this.new_INT_PC_T_LAVORO_S4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S4.value = this.new_INT_PC_T_LAVORO_S4;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S5
      case "PC_T_PAUSA_S5":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S5", SignalRService.tagList.PC_T_PAUSA_S5, this.new_INT_PC_T_PAUSA_S5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S5.value = this.new_INT_PC_T_PAUSA_S5;
        break;
      case "PC_T_LAVORO_S5":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S5", SignalRService.tagList.PC_T_LAVORO_S5, this.new_INT_PC_T_LAVORO_S5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S5.value = this.new_INT_PC_T_LAVORO_S5;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S6
      case "PC_T_PAUSA_S6":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S6", SignalRService.tagList.PC_T_PAUSA_S6, this.new_INT_PC_T_PAUSA_S6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S6.value = this.new_INT_PC_T_PAUSA_S6;
        break;
      case "PC_T_LAVORO_S6":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S6", SignalRService.tagList.PC_T_LAVORO_S6, this.new_INT_PC_T_LAVORO_S6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S6.value = this.new_INT_PC_T_LAVORO_S6;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S7
      case "PC_T_PAUSA_S7":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S7", SignalRService.tagList.PC_T_PAUSA_S7, this.new_INT_PC_T_PAUSA_S7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S7.value = this.new_INT_PC_T_PAUSA_S7;
        break;
      case "PC_T_LAVORO_S7":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S7", SignalRService.tagList.PC_T_LAVORO_S7, this.new_INT_PC_T_LAVORO_S7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S7.value = this.new_INT_PC_T_LAVORO_S7;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S8
      case "PC_T_PAUSA_S8":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S8", SignalRService.tagList.PC_T_PAUSA_S8, this.new_INT_PC_T_PAUSA_S8, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S8.value = this.new_INT_PC_T_PAUSA_S8;
        break;
      case "PC_T_LAVORO_S8":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S8", SignalRService.tagList.PC_T_LAVORO_S8, this.new_INT_PC_T_LAVORO_S8, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S8.value = this.new_INT_PC_T_LAVORO_S8;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S9
      case "PC_T_PAUSA_S9":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S9", SignalRService.tagList.PC_T_PAUSA_S9, this.new_INT_PC_T_PAUSA_S9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S9.value = this.new_INT_PC_T_PAUSA_S9;
        break;
      case "PC_T_LAVORO_S9":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S9", SignalRService.tagList.PC_T_LAVORO_S9, this.new_INT_PC_T_LAVORO_S9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S9.value = this.new_INT_PC_T_LAVORO_S9;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S10
      case "PC_T_PAUSA_S10":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S10", SignalRService.tagList.PC_T_PAUSA_S10, this.new_INT_PC_T_PAUSA_S10, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S10.value = this.new_INT_PC_T_PAUSA_S10;
        break;
      case "PC_T_LAVORO_S10":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S10", SignalRService.tagList.PC_T_LAVORO_S10, this.new_INT_PC_T_LAVORO_S10, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S10.value = this.new_INT_PC_T_LAVORO_S10;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S11
      case "PC_T_PAUSA_S11":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S11", SignalRService.tagList.PC_T_PAUSA_S11, this.new_INT_PC_T_PAUSA_S11, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S11.value = this.new_INT_PC_T_PAUSA_S11;
        break;
      case "PC_T_LAVORO_S11":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S11", SignalRService.tagList.PC_T_LAVORO_S11, this.new_INT_PC_T_LAVORO_S11, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S11.value = this.new_INT_PC_T_LAVORO_S11;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO S12
      case "PC_T_PAUSA_S12":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante S12", SignalRService.tagList.PC_T_PAUSA_S12, this.new_INT_PC_T_PAUSA_S12, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_S12.value = this.new_INT_PC_T_PAUSA_S12;
        break;
      case "PC_T_LAVORO_S12":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante S12", SignalRService.tagList.PC_T_LAVORO_S12, this.new_INT_PC_T_LAVORO_S12, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_S12.value = this.new_INT_PC_T_LAVORO_S12;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO TP6
      case "PC_T_PAUSA_TP6":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante TP6", SignalRService.tagList.PC_T_PAUSA_TP6, this.new_INT_PC_T_PAUSA_TP6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_TP6.value = this.new_INT_PC_T_PAUSA_TP6;
        break;
      case "PC_T_LAVORO_TP6":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante TP6", SignalRService.tagList.PC_T_LAVORO_TP6, this.new_INT_PC_T_LAVORO_TP6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_TP6.value = this.new_INT_PC_T_LAVORO_TP6;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO TP6A
      case "PC_T_PAUSA_TP6A":
        try { this.userService.logParameterTagValues("Tempo pausa fondo vibrante TP6A", SignalRService.tagList.PC_T_PAUSA_TP6A, this.new_INT_PC_T_PAUSA_TP6A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_TP6A.value = this.new_INT_PC_T_PAUSA_TP6A;
        break;
      case "PC_T_LAVORO_TP6A":
        try { this.userService.logParameterTagValues("Tempo lavoro fondo vibrante TP6A", SignalRService.tagList.PC_T_LAVORO_TP6A, this.new_INT_PC_T_LAVORO_TP6A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_TP6A.value = this.new_INT_PC_T_LAVORO_TP6A;
        break;
      // #endregion


      // #region TEMPI PAUSA-LAVORO CRN7
      case "PC_T_PAUSA_CRN7":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN7 (SABBIA)", SignalRService.tagList.PC_T_PAUSA_CRN7, this.new_INT_PC_T_PAUSA_CRN7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN7.value = this.new_INT_PC_T_PAUSA_CRN7;
        break;
      case "PC_T_LAVORO_CRN7":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN7 (SABBIA)", SignalRService.tagList.PC_T_LAVORO_CRN7, this.new_INT_PC_T_LAVORO_CRN7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN7.value = this.new_INT_PC_T_LAVORO_CRN7;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN8
      case "PC_T_PAUSA_CRN8":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN8 (SABBIA)", SignalRService.tagList.PC_T_PAUSA_CRN8, this.new_INT_PC_T_PAUSA_CRN8, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN8.value = this.new_INT_PC_T_PAUSA_CRN8;
        break;
      case "PC_T_LAVORO_CRN8":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN8 (SABBIA)", SignalRService.tagList.PC_T_LAVORO_CRN8, this.new_INT_PC_T_LAVORO_CRN8, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN8.value = this.new_INT_PC_T_LAVORO_CRN8;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN9
      case "PC_T_PAUSA_CRN9":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN9 (SABBIA)", SignalRService.tagList.PC_T_PAUSA_CRN9, this.new_INT_PC_T_PAUSA_CRN9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN9.value = this.new_INT_PC_T_PAUSA_CRN9;
        break;
      case "PC_T_LAVORO_CRN9":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN9 (SABBIA)", SignalRService.tagList.PC_T_LAVORO_CRN9, this.new_INT_PC_T_LAVORO_CRN9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN9.value = this.new_INT_PC_T_LAVORO_CRN9;
        break;
      // #endregion


      // #region TEMPI PAUSA-LAVORO CRET1
      case "PC_T_PAUSA_CRET1":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRET1 (ROTTAMI)", SignalRService.tagList.PC_T_PAUSA_CRET1, this.new_INT_PC_T_PAUSA_CRET1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRET1.value = this.new_INT_PC_T_PAUSA_CRET1;
        break;
      case "PC_T_LAVORO_CRET1":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRET1 (ROTTAMI)", SignalRService.tagList.PC_T_LAVORO_CRET1, this.new_INT_PC_T_LAVORO_CRET1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRET1.value = this.new_INT_PC_T_LAVORO_CRET1;
        break;
      // #endregion


      // #region TEMPI PAUSA-LAVORO CRN4
      case "PC_T_PAUSA_CRN4":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN4 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN4, this.new_INT_PC_T_PAUSA_CRN4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN4.value = this.new_INT_PC_T_PAUSA_CRN4;
        break;
      case "PC_T_LAVORO_CRN4":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN4 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN4, this.new_INT_PC_T_LAVORO_CRN4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN4.value = this.new_INT_PC_T_LAVORO_CRN4;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN4A
      case "PC_T_PAUSA_CRN4A":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN4A (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN4A, this.new_INT_PC_T_PAUSA_CRN4A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN4A.value = this.new_INT_PC_T_PAUSA_CRN4A;
        break;
      case "PC_T_LAVORO_CRN4A":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN4A (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN4A, this.new_INT_PC_T_LAVORO_CRN4A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN4A.value = this.new_INT_PC_T_LAVORO_CRN4A;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN5
      case "PC_T_PAUSA_CRN5":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN5 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN5, this.new_INT_PC_T_PAUSA_CRN5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN5.value = this.new_INT_PC_T_PAUSA_CRN5;
        break;
      case "PC_T_LAVORO_CRN5":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN5 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN5, this.new_INT_PC_T_LAVORO_CRN5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN5.value = this.new_INT_PC_T_LAVORO_CRN5;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN9
      case "PC_T_PAUSA_CRN9":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN9 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN9, this.new_INT_PC_T_PAUSA_CRN9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN9.value = this.new_INT_PC_T_PAUSA_CRN9;
        break;
      case "PC_T_LAVORO_CRN9":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN9 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN9, this.new_INT_PC_T_LAVORO_CRN9, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN9.value = this.new_INT_PC_T_LAVORO_CRN9;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN11
      case "PC_T_PAUSA_CRN11":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN11 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN11, this.new_INT_PC_T_PAUSA_CRN11, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN11.value = this.new_INT_PC_T_PAUSA_CRN11;
        break;
      case "PC_T_LAVORO_CRN11":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN11 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN11, this.new_INT_PC_T_LAVORO_CRN11, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN11.value = this.new_INT_PC_T_LAVORO_CRN11;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN13
      case "PC_T_PAUSA_CRN13":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN13 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN13, this.new_INT_PC_T_PAUSA_CRN13, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN13.value = this.new_INT_PC_T_PAUSA_CRN13;
        break;
      case "PC_T_LAVORO_CRN13":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN13 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN13, this.new_INT_PC_T_LAVORO_CRN13, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN13.value = this.new_INT_PC_T_LAVORO_CRN13;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN14
      case "PC_T_PAUSA_CRN14":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN14 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN14, this.new_INT_PC_T_PAUSA_CRN14, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN14.value = this.new_INT_PC_T_PAUSA_CRN14;
        break;
      case "PC_T_LAVORO_CRN14":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN14 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN14, this.new_INT_PC_T_LAVORO_CRN14, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN14.value = this.new_INT_PC_T_LAVORO_CRN14;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN15
      case "PC_T_PAUSA_CRN15":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN15 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN15, this.new_INT_PC_T_PAUSA_CRN15, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN15.value = this.new_INT_PC_T_PAUSA_CRN15;
        break;
      case "PC_T_LAVORO_CRN15":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN15 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN15, this.new_INT_PC_T_LAVORO_CRN15, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN15.value = this.new_INT_PC_T_LAVORO_CRN15;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO CRN16
      case "PC_T_PAUSA_CRN16":
        try { this.userService.logParameterTagValues("Tempo pausa utenza CRN16 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_CRN16, this.new_INT_PC_T_PAUSA_CRN16, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_CRN16.value = this.new_INT_PC_T_PAUSA_CRN16;
        break;
      case "PC_T_LAVORO_CRN16":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza CRN16 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_CRN16, this.new_INT_PC_T_LAVORO_CRN16, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_CRN16.value = this.new_INT_PC_T_LAVORO_CRN16;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO VBN4B
      case "PC_T_PAUSA_VBN4B":
        try { this.userService.logParameterTagValues("Tempo pausa utenza VBN4B (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_VBN4B, this.new_INT_PC_T_PAUSA_VBN4B, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_VBN4B.value = this.new_INT_PC_T_PAUSA_VBN4B;
        break;
      case "PC_T_LAVORO_VBN4B":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza VBN4B (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_VBN4B, this.new_INT_PC_T_LAVORO_VBN4B, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_VBN4B.value = this.new_INT_PC_T_LAVORO_VBN4B;
        break;
      // #endregion

      // #region TEMPI PAUSA-LAVORO VBE26
      case "PC_T_PAUSA_VBE26":
        try { this.userService.logParameterTagValues("Tempo pausa utenza VBE26 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_PAUSA_VBE26, this.new_INT_PC_T_PAUSA_VBE26, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_PAUSA_VBE26.value = this.new_INT_PC_T_PAUSA_VBE26;
        break;
      case "PC_T_LAVORO_VBE26":
        try { this.userService.logParameterTagValues("Tempo lavoro utenza VBE26 (DOSAGGIO E TRASPORTI)", SignalRService.tagList.PC_T_LAVORO_VBE26, this.new_INT_PC_T_LAVORO_VBE26, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_LAVORO_VBE26.value = this.new_INT_PC_T_LAVORO_VBE26;
        break;
      // #endregion


      // #region TEMPI SGOCCIOLAMENTO BILANCE
      case "PC_T_SGOCCIOLAMENTO_B1":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B1", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B1, this.new_INT_PC_T_SGOCCIOLAMENTO_B1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B1.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B1;
        break;
      case "PC_T_SGOCCIOLAMENTO_B2":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B2", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B2, this.new_INT_PC_T_SGOCCIOLAMENTO_B2, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B2.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B2;
        break;
      case "PC_T_SGOCCIOLAMENTO_B3":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B3", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B3, this.new_INT_PC_T_SGOCCIOLAMENTO_B3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B3.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B3;
        break;
      case "PC_T_SGOCCIOLAMENTO_B4":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B4", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B4, this.new_INT_PC_T_SGOCCIOLAMENTO_B4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B4.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B4;
        break;
      case "PC_T_SGOCCIOLAMENTO_B5":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B5", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B5, this.new_INT_PC_T_SGOCCIOLAMENTO_B5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B5.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B5;
        break;
      case "PC_T_SGOCCIOLAMENTO_B6":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B6", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B6, this.new_INT_PC_T_SGOCCIOLAMENTO_B6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B6.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B6;
        break;
      case "PC_T_SGOCCIOLAMENTO_B7":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento B7", SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B7, this.new_INT_PC_T_SGOCCIOLAMENTO_B7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_SGOCCIOLAMENTO_B7.value = this.new_INT_PC_T_SGOCCIOLAMENTO_B7;
        break;
      case "FDB_T_SGOCCIOLAMENTO_TM1":
        try { this.userService.logParameterTagValues("Tempo sgocciolamento TM1", SignalRService.tagList.FDB_T_SGOCCIOLAMENTO_TM1, this.new_INT_FDB_T_SGOCCIOLAMENTO_TM1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.FDB_T_SGOCCIOLAMENTO_TM1.value = this.new_INT_FDB_T_SGOCCIOLAMENTO_TM1;
        break;
      // #endregion


      // #region TEMPI MASSIMO CARICO - SCARICO B1
      case "PC_T_MAX_CARICO_B1":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B1, this.new_INT_PC_T_MAX_CARICO_B1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B1.value = this.new_INT_PC_T_MAX_CARICO_B1;
        break;
      case "PC_T_MAX_SCARICO_B1":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B1, this.new_INT_PC_T_MAX_SCARICO_B1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B1.value = this.new_INT_PC_T_MAX_SCARICO_B1;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B2
      case "PC_T_MAX_CARICO_B2":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B2, this.new_INT_PC_T_MAX_CARICO_B2, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B2.value = this.new_INT_PC_T_MAX_CARICO_B2;
        break;
      case "PC_T_MAX_SCARICO_B2":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B2, this.new_INT_PC_T_MAX_SCARICO_B2, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B2.value = this.new_INT_PC_T_MAX_SCARICO_B2;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B3
      case "PC_T_MAX_CARICO_B3":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B3, this.new_INT_PC_T_MAX_CARICO_B3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B3.value = this.new_INT_PC_T_MAX_CARICO_B3;
        break;
      case "PC_T_MAX_SCARICO_B3":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B3, this.new_INT_PC_T_MAX_SCARICO_B3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B3.value = this.new_INT_PC_T_MAX_SCARICO_B3;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B3A
      case "PC_T_MAX_CARICO_B3A":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B3A, this.new_INT_PC_T_MAX_CARICO_B3A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B3A.value = this.new_INT_PC_T_MAX_CARICO_B3A;
        break;
      case "PC_T_MAX_SCARICO_B3A":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B3A, this.new_INT_PC_T_MAX_SCARICO_B3A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B3A.value = this.new_INT_PC_T_MAX_SCARICO_B3A;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B4
      case "PC_T_MAX_CARICO_B4":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B4, this.new_INT_PC_T_MAX_CARICO_B4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B4.value = this.new_INT_PC_T_MAX_CARICO_B4;
        break;
      case "PC_T_MAX_SCARICO_B4":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B4, this.new_INT_PC_T_MAX_SCARICO_B4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B4.value = this.new_INT_PC_T_MAX_SCARICO_B4;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B5
      case "PC_T_MAX_CARICO_B5":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B5, this.new_INT_PC_T_MAX_CARICO_B5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B5.value = this.new_INT_PC_T_MAX_CARICO_B5;
        break;
      case "PC_T_MAX_SCARICO_B5":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B5, this.new_INT_PC_T_MAX_SCARICO_B5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B5.value = this.new_INT_PC_T_MAX_SCARICO_B5;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B5A
      case "PC_T_MAX_CARICO_B5A":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B5A, this.new_INT_PC_T_MAX_CARICO_B5A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B5A.value = this.new_INT_PC_T_MAX_CARICO_B5A;
        break;
      case "PC_T_MAX_SCARICO_B5A":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B5A, this.new_INT_PC_T_MAX_SCARICO_B5A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B5A.value = this.new_INT_PC_T_MAX_SCARICO_B5A;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B6
      case "PC_T_MAX_CARICO_B6":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B6, this.new_INT_PC_T_MAX_CARICO_B6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B6.value = this.new_INT_PC_T_MAX_CARICO_B6;
        break;
      case "PC_T_MAX_SCARICO_B6":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B6, this.new_INT_PC_T_MAX_SCARICO_B6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B6.value = this.new_INT_PC_T_MAX_SCARICO_B6;
        break;
      // #endregion

      // #region TEMPI MASSIMO CARICO - SCARICO B7
      case "PC_T_MAX_CARICO_B7":
        try { this.userService.logParameterTagValues("Tempo massimo di scarico tramogge mix: ", SignalRService.tagList.PC_T_MAX_CARICO_B7, this.new_INT_PC_T_MAX_CARICO_B7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_CARICO_B7.value = this.new_INT_PC_T_MAX_CARICO_B7;
        break;
      case "PC_T_MAX_SCARICO_B7":
        try { this.userService.logParameterTagValues("Tempo massimo di sSCARICO tramogge mix: ", SignalRService.tagList.PC_T_MAX_SCARICO_B7, this.new_INT_PC_T_MAX_SCARICO_B7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_MAX_SCARICO_B7.value = this.new_INT_PC_T_MAX_SCARICO_B7;
        break;
      // #endregion


      // #region TEMPI ATTESA SCARICO B1
      case "PC_T_ATTESA_SCARICO_B1":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B1", SignalRService.tagList.PC_T_ATTESA_SCARICO_B1, this.new_INT_PC_T_ATTESA_SCARICO_B1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B1.value = this.new_INT_PC_T_ATTESA_SCARICO_B1;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B2
      case "PC_T_ATTESA_SCARICO_B2":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B2", SignalRService.tagList.PC_T_ATTESA_SCARICO_B2, this.new_INT_PC_T_ATTESA_SCARICO_B2, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B2.value = this.new_INT_PC_T_ATTESA_SCARICO_B2;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B3
      case "PC_T_ATTESA_SCARICO_B3":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B3", SignalRService.tagList.PC_T_ATTESA_SCARICO_B3, this.new_INT_PC_T_ATTESA_SCARICO_B3, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B3.value = this.new_INT_PC_T_ATTESA_SCARICO_B3;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B3A
      case "PC_T_ATTESA_SCARICO_B3A":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B3A", SignalRService.tagList.PC_T_ATTESA_SCARICO_B3A, this.new_INT_PC_T_ATTESA_SCARICO_B3A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B3A.value = this.new_INT_PC_T_ATTESA_SCARICO_B3A;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B4
      case "PC_T_ATTESA_SCARICO_B4":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B4", SignalRService.tagList.PC_T_ATTESA_SCARICO_B4, this.new_INT_PC_T_ATTESA_SCARICO_B4, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B4.value = this.new_INT_PC_T_ATTESA_SCARICO_B4;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B5
      case "PC_T_ATTESA_SCARICO_B5":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B5", SignalRService.tagList.PC_T_ATTESA_SCARICO_B5, this.new_INT_PC_T_ATTESA_SCARICO_B5, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B5.value = this.new_INT_PC_T_ATTESA_SCARICO_B5;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B5A
      case "PC_T_ATTESA_SCARICO_B5A":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B5A", SignalRService.tagList.PC_T_ATTESA_SCARICO_B5A, this.new_INT_PC_T_ATTESA_SCARICO_B5A, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B5A.value = this.new_INT_PC_T_ATTESA_SCARICO_B5A;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B6
      case "PC_T_ATTESA_SCARICO_B6":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B6", SignalRService.tagList.PC_T_ATTESA_SCARICO_B6, this.new_INT_PC_T_ATTESA_SCARICO_B6, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B6.value = this.new_INT_PC_T_ATTESA_SCARICO_B6;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO B7
      case "PC_T_ATTESA_SCARICO_B7":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia B7", SignalRService.tagList.PC_T_ATTESA_SCARICO_B7, this.new_INT_PC_T_ATTESA_SCARICO_B7, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_B7.value = this.new_INT_PC_T_ATTESA_SCARICO_B7;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO TM1
      case "PC_T_ATTESA_SCARICO_TM1":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare la bilancia TM1", SignalRService.tagList.PC_T_ATTESA_SCARICO_TM1, this.new_INT_PC_T_ATTESA_SCARICO_TM1, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_TM1.value = this.new_INT_PC_T_ATTESA_SCARICO_TM1;
        break;
      // #endregion

      // #region TEMPI ATTESA SCARICO H20
      case "PC_T_ATTESA_SCARICO_H20":
        try { this.userService.logParameterTagValues("Tempo da attendere per poter liberare valvola acqua", SignalRService.tagList.PC_T_ATTESA_SCARICO_H2O, this.new_INT_PC_T_ATTESA_SCARICO_H2O, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_ATTESA_SCARICO_H2O.value = this.new_INT_PC_T_ATTESA_SCARICO_H2O;
        break;
      // #endregion

      // #region TEMPI ATTESA APERTURA BOTOLA
      case "PC_T_TEMPO_AperturaBotolaMix":
        try { this.userService.logParameterTagValues("Tempo da attendere per apertura botola", SignalRService.tagList.PC_T_TEMPO_AperturaBotolaMix, this.new_INT_PC_T_ATTESA_APERTURA_BOTOLA, "s", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_T_TEMPO_AperturaBotolaMix.value = this.new_INT_PC_T_ATTESA_APERTURA_BOTOLA;
        break;
      // #endregion

      // #region ORDINI DI CARICO
      case "PC_ODC_B1":
        try { this.userService.logParameterTagValues("Ordine di carico B1", SignalRService.tagList.PC_ODC_B1, this.new_DINT_PC_ODC_B1, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B1.value = this.new_DINT_PC_ODC_B1;
        break;
      case "PC_ODC_B2":
        try { this.userService.logParameterTagValues("Ordine di carico B2", SignalRService.tagList.PC_ODC_B2, this.new_DINT_PC_ODC_B2, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B2.value = this.new_DINT_PC_ODC_B2;
        break;
      case "PC_ODC_B3":
        try { this.userService.logParameterTagValues("Ordine di carico B3", SignalRService.tagList.PC_ODC_B3, this.new_DINT_PC_ODC_B3, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B3.value = this.new_DINT_PC_ODC_B3;
        break;
      case "PC_ODC_B3A":
        try { this.userService.logParameterTagValues("Ordine di carico B3A", SignalRService.tagList.PC_ODC_B3A, this.new_DINT_PC_ODC_B3A, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B3A.value = this.new_DINT_PC_ODC_B3A;
        break;
      case "PC_ODC_B4":
        try { this.userService.logParameterTagValues("Ordine di carico B4", SignalRService.tagList.PC_ODC_B4, this.new_DINT_PC_ODC_B4, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B4.value = this.new_DINT_PC_ODC_B4;
        break;
      case "PC_ODC_B5":
        try { this.userService.logParameterTagValues("Ordine di carico B5", SignalRService.tagList.PC_ODC_B5, this.new_DINT_PC_ODC_B5, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B5.value = this.new_DINT_PC_ODC_B5;
        break;
      case "PC_ODC_B5A":
        try { this.userService.logParameterTagValues("Ordine di carico B5A", SignalRService.tagList.PC_ODC_B5A, this.new_DINT_PC_ODC_B5A, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B5A.value = this.new_DINT_PC_ODC_B5A;
        break;
      case "PC_ODC_B6":
        try { this.userService.logParameterTagValues("Ordine di carico B6", SignalRService.tagList.PC_ODC_B6, this.new_DINT_PC_ODC_B6, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B6.value = this.new_DINT_PC_ODC_B6;
        break;
      case "PC_ODC_B7":
        try { this.userService.logParameterTagValues("Ordine di carico B7", SignalRService.tagList.PC_ODC_B7, this.new_DINT_PC_ODC_B7, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_ODC_B7.value = this.new_DINT_PC_ODC_B7;
        break;
      case "ODC_SABBIA":
        try { this.userService.logParameterTagValues("Ordine di carico SABBIA", SignalRService.tagList.ODC_SABBIA, this.new_DINT_PC_ODC_CARICO_SABBIA, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.ODC_SABBIA.value = this.new_DINT_PC_ODC_CARICO_SABBIA;
        break;
      case "ODC_ROTTAME":
        try { this.userService.logParameterTagValues("Ordine di carico ROTTAME ESTERNO", SignalRService.tagList.ODC_ROTTAME, this.new_DINT_PC_ODC_CARICO_ROTTAME_ESTERNO, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.ODC_ROTTAME.value = this.new_DINT_PC_ODC_CARICO_ROTTAME_ESTERNO;
        break;
      // #endregion

      // #region SOGLIA ALLARMI ESTRAZIONE

      case "SOGLIA_ALM_ESTRAZIONE_B1_S1":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B1 - S1: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B1_S1, this.new_REAL_SOGLIA_ALM_ESTR_B1_S1, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B1_S1.value = this.new_REAL_SOGLIA_ALM_ESTR_B1_S1;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B1_S2":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B1 - S2: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B1_S2, this.new_REAL_SOGLIA_ALM_ESTR_B1_S2, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B1_S2.value = this.new_REAL_SOGLIA_ALM_ESTR_B1_S2;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B2_S3":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B2 - S3: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B2_S3, this.new_REAL_SOGLIA_ALM_ESTR_B2_S3, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B2_S3.value = this.new_REAL_SOGLIA_ALM_ESTR_B2_S3;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B2_S4":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B2 - S4: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B2_S4, this.new_REAL_SOGLIA_ALM_ESTR_B2_S4, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B2_S4.value = this.new_REAL_SOGLIA_ALM_ESTR_B2_S4;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B3_S5":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B3 - S5: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B3_S5, this.new_REAL_SOGLIA_ALM_ESTR_B3_S5, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B3_S5.value = this.new_REAL_SOGLIA_ALM_ESTR_B3_S5;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B3A_S6":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B3A - S6: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B3A_S6, this.new_REAL_SOGLIA_ALM_ESTR_B3A_S6, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B3A_S6.value = this.new_REAL_SOGLIA_ALM_ESTR_B3A_S6;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B4_S7":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B4 - S7: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S7, this.new_REAL_SOGLIA_ALM_ESTR_B4_S7, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S7.value = this.new_REAL_SOGLIA_ALM_ESTR_B4_S7;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B4_S8":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B4 - S8: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S8, this.new_REAL_SOGLIA_ALM_ESTR_B4_S8, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S8.value = this.new_REAL_SOGLIA_ALM_ESTR_B4_S8;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B4_S9":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B4 - S9: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S9, this.new_REAL_SOGLIA_ALM_ESTR_B4_S9, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S9.value = this.new_REAL_SOGLIA_ALM_ESTR_B4_S9;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B4_S10":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B4 - S10: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S10, this.new_REAL_SOGLIA_ALM_ESTR_B4_S10, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B4_S10.value = this.new_REAL_SOGLIA_ALM_ESTR_B4_S10;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B5A_S11":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B5A - S11: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B5A_S11, this.new_REAL_SOGLIA_ALM_ESTR_B5A_S11, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B5A_S11.value = this.new_REAL_SOGLIA_ALM_ESTR_B5A_S11;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B5_S12":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B5 - S12: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B5_S12, this.new_REAL_SOGLIA_ALM_ESTR_B5_S12, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B5_S12.value = this.new_REAL_SOGLIA_ALM_ESTR_B5_S12;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B6_TP6":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B6 - TP6: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B6_TP6, this.new_REAL_SOGLIA_ALM_ESTR_B6_TP6, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B6_TP6.value = this.new_REAL_SOGLIA_ALM_ESTR_B6_TP6;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B6_TP6A":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B6 - TP6A: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B6_TP6A, this.new_REAL_SOGLIA_ALM_ESTR_B6_TP6A, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B6_TP6A.value = this.new_REAL_SOGLIA_ALM_ESTR_B6_TP6A;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B7_S13":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B7 - S13: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S13, this.new_REAL_SOGLIA_ALM_ESTR_B7_S13, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S13.value = this.new_REAL_SOGLIA_ALM_ESTR_B7_S13;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B7_S14":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B7 - S14: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S14, this.new_REAL_SOGLIA_ALM_ESTR_B7_S14, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S14.value = this.new_REAL_SOGLIA_ALM_ESTR_B7_S14;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B7_S15":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B7 - S15: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S15, this.new_REAL_SOGLIA_ALM_ESTR_B7_S15, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S15.value = this.new_REAL_SOGLIA_ALM_ESTR_B7_S15;
        break;
      case "SOGLIA_ALM_ESTRAZIONE_B7_S16":
        try { this.userService.logParameterTagValues("Soglia allarme estrazuibe B7 - S16: ", SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S16, this.new_REAL_SOGLIA_ALM_ESTR_B7_S16, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.SOGLIA_ALM_ESTRAZIONE_B7_S16.value = this.new_REAL_SOGLIA_ALM_ESTR_B7_S16;
        break;
      // #endregion


      // #region PULSANTE RESET ERRORI
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B1_S1":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S1 in bilancia B1", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B1_S1, true, "", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B1_S1.value = true;
        console.log(SignalRService.tagList.FDB_ALM_ESTRAZIONE_B1_S1.value);
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B1_S2":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S2 in bilancia B1", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B1_S2, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B1_S2.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B2_S3":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S3 in bilancia B2", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B2_S3, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B2_S3.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B2_S4":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S4 in bilancia B2", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B2_S4, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B2_S4.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B3_S5":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S5 in bilancia B3", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B3_S5, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B3_S5.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B3A_S6":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S6 in bilancia B3A", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B3A_S6, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B3A_S6.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S7":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S7 in bilancia B4", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S7, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S7.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S8":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S8 in bilancia B4", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S8, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S8.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S9":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S9 in bilancia B4", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S9, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S9.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S10":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S10 in bilancia B4", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S10, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B4_S10.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B5A_S11":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S11 in bilancia B5A", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B5A_S11, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B5A_S11.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B5_S12":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S12 in bilancia B5", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B5_S12, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B5_S12.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B6_TP6":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos TP6 in bilancia B6", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B6_TP6, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B6_TP6.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B6_TP6A":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos TP6A in bilancia B6", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B6_TP6A, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B6_TP6A.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S13":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S13 in bilancia B7", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S13, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S13.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S14":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S14 in bilancia B7", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S14, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S14.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S15":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S15 in bilancia B7", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S15, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S15.value = true;
        break;
      case "PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S16":
        try {
          this.userService.logParameterTagValues("Reset allarme errore estrazione silos S16 in bilancia B7", SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S16, true, "", this.appService.user);
        } catch (e) { }
        SignalRService.tagList.PC_PULS_RESET_ERRORE_ESTRAZIONE_B7_S16.value = true;
        break;
      // #endregion

      case "REAL_PC_TM1_SOGLIA_ANTICIPO":
        try { this.userService.logParameterTagValues("Peso TM1 richiesta nuova miscelata: ", SignalRService.tagList.PC_TM1_SOGLIA_ANTICIPO, this.new_REAL_PC_TM1_SOGLIA_ANTICIPO, "kg", this.appService.user); } catch (e) { }
        SignalRService.tagList.PC_TM1_SOGLIA_ANTICIPO.value = this.new_REAL_PC_TM1_SOGLIA_ANTICIPO;
        break;

      default:
    }
  }

  constructor(private appService: AppService, calendar: NgbCalendar, private userService: UserService) {//, private route: ActivatedRoute, private router: Router, public toastrService: ToastrService,
    //private trendService: TrendService, private zoneService: ZoneService, private plcService: PlcService) {

    this.appService.pageTitle = this.TITLE;
  }

  get_SI_NO_Txt(value): string {
    if (value)
      return "SI";
    else
      return "NO";
  }

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  

  async ngOnInit() {

    //this.selectZoneTypes = await this.zoneService.GetZoneTypeList();

    //this.sub = this.route.params.subscribe( async params => {
    //  this.tagLogName = params['id'];
    //  if (this.tagLogName != null) {

    //    this.trendData = await this.trendService.getByTagLogName(this.tagLogName);

    //    this.myTitle = this.trendData.description;
    //  }

    //});
  }

  ngOnDestroy() {

  }

  isTrue(value: any): boolean {
    return value === true || value === 'true';
  }

}
