import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDialogModule } from '@angular/material/dialog';

import { DccBurleyComponent } from './dcc-burley.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { DccBurleyRoutingModule } from './dcc-burley-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    // Popup device aperti dal sinottico (motori e valvola)
    MatDialogModule,
    DevicePlateModule,

    DccBurleyRoutingModule
  ],
  declarations: [
    DccBurleyComponent
  ]
})
export class DccBurleyModule { }
