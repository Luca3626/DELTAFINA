import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DccVirginiaComponent } from './dcc-virginia.component';


// *******************************************************************************

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DccVirginiaComponent }
  ])],
  exports: [RouterModule]
})
export class DccVirginiaRoutingModule { }
