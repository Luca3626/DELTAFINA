import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialsListComponent } from './materials-list/materials-list.component';
import { MaterialsEditComponent } from './materials-edit/materials-edit.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MaterialsListComponent },
    { path: 'materials-list', component: MaterialsListComponent },
    { path: 'materials-edit', component: MaterialsEditComponent },
    { path: 'materials-edit/:id', component: MaterialsEditComponent }
  ])],
  exports: [RouterModule]
})
export class MaterialsRoutingModule { }
