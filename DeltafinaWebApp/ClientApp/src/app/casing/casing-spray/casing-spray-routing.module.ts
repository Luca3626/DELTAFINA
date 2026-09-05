import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CasingSprayComponent } from './casing-spray.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CasingSprayComponent }
  ])],
  exports: [RouterModule]
})
export class CasingSprayRoutingModule { }
