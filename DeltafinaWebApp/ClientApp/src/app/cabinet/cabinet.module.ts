import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { CabinetComponent } from './cabinet.component';
import { DevicePlateModule } from '../device-plate/device-plate.module';

import { CabinetRoutingModule } from './cabinet-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    CabinetRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    CabinetComponent
  ]
})
export class CabinetModule { }
