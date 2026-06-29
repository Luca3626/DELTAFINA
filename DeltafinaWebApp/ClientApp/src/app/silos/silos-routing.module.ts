import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SilosListComponent } from './silos-list/silos-list.component';
import { SilosEditComponent } from './silos-edit/silos-edit.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: SilosListComponent },
    { path: 'silos-list', component: SilosListComponent },
    { path: 'silos-edit', component: SilosEditComponent },
    { path: 'silos-edit/:id', component: SilosEditComponent }
  ])],
  exports: [RouterModule]
})
export class SilosRoutingModule { }
