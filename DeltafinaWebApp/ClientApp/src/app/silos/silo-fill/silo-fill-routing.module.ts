import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiloFillComponent } from './silo-fill.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SiloFillComponent }
  ])],
  exports: [RouterModule]
})
export class SiloFillRoutingModule { }
