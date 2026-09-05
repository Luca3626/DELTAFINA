import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { CasingTanksComponent } from './casing-tanks.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { CasingTanksRoutingModule } from './casing-tanks-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    CasingTanksRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    CasingTanksComponent
  ]
})
export class CasingTanksModule { }
