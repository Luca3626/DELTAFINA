import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InverterComponent } from './inverter.component';

import { InverterRoutingModule } from './inverter-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,

    InverterRoutingModule
  ],
  declarations: [
    InverterComponent
  ]
})
export class InverterModule { }
