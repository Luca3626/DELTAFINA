import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general/general.component';
import { TagListComponent } from './tag-list/tag-list.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'general', component: GeneralComponent },
    { path: 'tag-list', component: TagListComponent }
  ])],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
