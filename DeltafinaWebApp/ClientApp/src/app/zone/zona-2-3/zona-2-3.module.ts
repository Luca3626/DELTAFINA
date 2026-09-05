import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { Zona23Component } from './zona-2-3.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { Zona23RoutingModule } from './zona-2-3-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    Zona23RoutingModule,

    DevicePlateModule
  ],
  declarations: [
    Zona23Component
  ]
})
export class Zona23Module { }
