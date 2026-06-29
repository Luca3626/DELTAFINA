import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalFarmsListComponent } from './portal-farms-list/portal-farms-list.component';
import { PortalFarmsEditComponent } from './portal-farms-edit/portal-farms-edit.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PortalFarmsListComponent },
    { path: 'portal-farms-list', component: PortalFarmsListComponent },
    { path: 'portal-farms-edit', component: PortalFarmsEditComponent },
    { path: 'portal-farms-edit/:id', component: PortalFarmsEditComponent }
  ])],
  exports: [RouterModule]
})
export class PortalFarmsRoutingModule { }
