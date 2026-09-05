import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalogModel } from 'src/app/models/device/analog.models';

// Popup degli ingressi analogici (DB101 - HMI_AI): qui c'e' solo la cornice del dialog
// (titolo trascinabile e chiusura), il contenuto sta in AnalogPlateBodyComponent perche'
// lo mostra anche la scheda Analog del popup PID.
@Component({
  selector: 'analog-plate',
  templateUrl: './analog-plate.component.html',
  styleUrls: ['analog-plate.css'],
})
export class AnalogPlateComponent {

  constructor(public dialogRef: MatDialogRef<AnalogPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  get analog(): AnalogModel {
    return this.data.analog;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
