import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { CasingSprayComponent } from './casing-spray.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { CasingSprayRoutingModule } from './casing-spray-routing.module';

// I pulsanti RESET dei totalizzatori chiedono conferma con la stessa finestra dei comandi
// globali della navbar: qui serve SweetAlert2Module (il forRoot sta in app.module.ts).
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

    CasingSprayRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    CasingSprayComponent
  ]
})
export class CasingSprayModule { }
