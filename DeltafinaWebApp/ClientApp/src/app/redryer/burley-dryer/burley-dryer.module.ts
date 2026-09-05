import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { BurleyDryerComponent } from './burley-dryer.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { BurleyDryerRoutingModule } from './burley-dryer-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    MatDialogModule,

    BurleyDryerRoutingModule,

    DevicePlateModule
  ],
  declarations: [
    BurleyDryerComponent
  ]
})
export class BurleyDryerModule { }
