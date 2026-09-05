import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { FinalDryerComponent } from './final-dryer.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { FinalDryerRoutingModule } from './final-dryer-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    FinalDryerRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    FinalDryerComponent
  ]
})
export class FinalDryerModule { }
