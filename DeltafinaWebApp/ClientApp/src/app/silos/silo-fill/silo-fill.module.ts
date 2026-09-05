import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';   // TEST TEMPORANEO (trascinamento del popup di test)

import { SiloFillComponent } from './silo-fill.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';
import { TestPlateComponent } from './test-plate/test-plate.component';   // TEST TEMPORANEO

import { SiloFillRoutingModule } from './silo-fill-routing.module';
// La conferma sullo 0 dei sili da riempire usa la stessa finestra dei comandi
// globali: qui serve SweetAlert2Module (il forRoot sta in app.module.ts).
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,
    DragDropModule,   // TEST TEMPORANEO
    SweetAlert2Module,

    SiloFillRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    SiloFillComponent,
    TestPlateComponent   // TEST TEMPORANEO
  ]
})
export class SiloFillModule { }
