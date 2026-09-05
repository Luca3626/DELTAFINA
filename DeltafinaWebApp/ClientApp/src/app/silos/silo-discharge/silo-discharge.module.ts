import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { SiloDischargeComponent } from './silo-discharge.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { SiloDischargeRoutingModule } from './silo-discharge-routing.module';

// I pulsanti RESET dei totalizzatori chiedono conferma con la stessa finestra dei
// comandi globali della navbar: qui serve SweetAlert2Module (il forRoot sta in app.module.ts).
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    SweetAlert2Module,

    MatDialogModule,

    SiloDischargeRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    SiloDischargeComponent
  ]
})
export class SiloDischargeModule { }
