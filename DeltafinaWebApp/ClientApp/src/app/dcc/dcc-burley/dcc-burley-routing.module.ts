import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DccBurleyComponent } from './dcc-burley.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DccBurleyComponent }
  ])],
  exports: [RouterModule]
})
export class DccBurleyRoutingModule { }
