import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CasingTanksComponent } from './casing-tanks.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CasingTanksComponent }
  ])],
  exports: [RouterModule]
})
export class CasingTanksRoutingModule { }
