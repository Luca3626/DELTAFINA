import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatDialogModule } from '@angular/material/dialog';

import { DccVirginiaComponent } from './dcc-virginia.component';
import { DevicePlateModule } from '../../device-plate/device-plate.module';

import { DccVirginiaRoutingModule } from './dcc-virginia-routing.module';


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

    DccVirginiaRoutingModule
  ],
  declarations: [
    DccVirginiaComponent
  ]
})
export class DccVirginiaModule { }
