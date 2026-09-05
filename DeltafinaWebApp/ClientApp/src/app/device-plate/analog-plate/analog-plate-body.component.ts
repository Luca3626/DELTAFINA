import { Component, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { AnalogModel } from 'src/app/models/device/analog.models';
import { PlateChartSeries } from '../plate-chart/plate-chart.component';

// Corpo del popup degli ingressi analogici (DB101 - HMI_AI): stato, valori, allarmi,
// forzatura, scala e soglie. Sta qui e non in AnalogPlateComponent perche' lo mostra
// anche la scheda Analog del popup PID, dove la cornice del dialog e' quella del loop.
// X e Y sono di sola lettura (il modello non ha i setter), si scrivono la scala
// (X0/Y0/X1/Y1), la forzatura (EnManValue + ManForceValue) e le quattro soglie.
@Component({
  selector: 'analog-plate-body',
  templateUrl: './analog-plate-body.component.html',
  styleUrls: ['analog-plate.css'],
})
export class AnalogPlateBodyComponent implements OnChanges {

  @Input() analog: AnalogModel;

  // Valori digitati dall'operatore, scritti sul PLC dai pulsanti di conferma.
  newRawMin: number;     // X0
  newScaleMin: number;   // Y0
  newRawMax: number;     // X1
  newScaleMax: number;   // Y1
  newManValue: number;   // ManForceValue
  newHH: number;
  newH: number;
  newL: number;
  newLL: number;

  // Tracce del grafico storico. Il TagLogName da configurare in TagsToSave e' il nome
  // del tag stesso (client e server condividono la stessa TagsList), quindi si legge
  // direttamente dal tag. Si ricalcolano solo quando cambia l'analogica: se fossero un
  // getter, ogni giro di change detection passerebbe un array nuovo al grafico e
  // farebbe ripartire la query storica.
  chartSeries: PlateChartSeries[] = [];

  constructor(private appService: AppService, private userService: UserService) { }

  ngOnChanges(): void {
    // Della AI si storicizza il valore scalato Y (stesso blu del PV dei PID): il
    // grezzo X e' la stessa curva a meno della retta di scala, non aggiunge niente.
    this.chartSeries = this.analog == null ? [] : [
      { tagLogName: this.analog.Y != null ? this.analog.Y.name : null, label: 'Valore (Y)', unit: this.analog.unit, color: '#3b82f6' }
    ];
  }

  // #region Abilitazione forzatura (bit EnManValue)

  get CmdForzatura(): boolean {
    if (this.analog.EnManValue != null)
      return this.analog.EnManValue.value;
    else
      return null;
  }

  set CmdForzatura(value) {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": abilita forzatura valore", this.analog.EnManValue, value, "", this.appService.user); } catch (e) { }
    this.analog.MANUAL_ENABLED = value;
  }

  // #endregion

  // #region Conferma parametri (log del cambio parametro, poi scrittura sul PLC)

  onManValueConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": valore forzato", this.analog.ManForceValue, this.newManValue, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.MANUAL_VALUE = this.newManValue;
  }

  onRawMinConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": scala - grezzo punto basso X0", this.analog.X0, this.newRawMin, "", this.appService.user); } catch (e) { }
    this.analog.SCALE_RAW_MIN = this.newRawMin;
  }

  onScaleMinConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": scala - valore punto basso Y0", this.analog.Y0, this.newScaleMin, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.SCALE_MIN = this.newScaleMin;
  }

  onRawMaxConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": scala - grezzo punto alto X1", this.analog.X1, this.newRawMax, "", this.appService.user); } catch (e) { }
    this.analog.SCALE_RAW_MAX = this.newRawMax;
  }

  onScaleMaxConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": scala - valore punto alto Y1", this.analog.Y1, this.newScaleMax, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.SCALE_MAX = this.newScaleMax;
  }

  onHHConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": soglia allarme alto-alto HH", this.analog.HH_Threshold, this.newHH, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.HH_LIMIT = this.newHH;
  }

  onHConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": soglia preallarme alto H", this.analog.H_Threshold, this.newH, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.H_LIMIT = this.newH;
  }

  onLConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": soglia preallarme basso L", this.analog.L_Threshold, this.newL, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.L_LIMIT = this.newL;
  }

  onLLConfirm(): void {
    try { this.userService.logParameterTagValues(this.analog.name.toUpperCase() + ": soglia allarme basso-basso LL", this.analog.LL_Threshold, this.newLL, this.analog.unit, this.appService.user); } catch (e) { }
    this.analog.LL_LIMIT = this.newLL;
  }

  // #endregion
}
