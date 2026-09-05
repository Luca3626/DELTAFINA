import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { Zona10Component } from './zona-1-0.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { Zona10RoutingModule } from './zona-1-0-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    Zona10RoutingModule,

    DevicePlateModule
  ],
  declarations: [
    Zona10Component
  ]
})
export class Zona10Module { }
