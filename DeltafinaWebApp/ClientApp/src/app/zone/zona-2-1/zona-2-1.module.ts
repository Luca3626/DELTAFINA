import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { Zona21Component } from './zona-2-1.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { Zona21RoutingModule } from './zona-2-1-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    Zona21RoutingModule,

    DevicePlateModule
  ],
  declarations: [
    Zona21Component
  ]
})
export class Zona21Module { }
