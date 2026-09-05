import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { Zona34Component } from './zona-3-4.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { Zona34RoutingModule } from './zona-3-4-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    Zona34RoutingModule,

    DevicePlateModule
  ],
  declarations: [
    Zona34Component
  ]
})
export class Zona34Module { }
