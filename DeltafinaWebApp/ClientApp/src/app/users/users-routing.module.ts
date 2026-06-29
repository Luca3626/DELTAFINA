import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
//import { UsersViewComponent } from './users-view/users-view.component';
import { UsersEditComponent } from './users-edit/users-edit.component';


// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UsersListComponent },
    { path: 'users-list', component: UsersListComponent },
    //{ path: 'users-view', component: UsersViewComponent },
    { path: 'users-edit', component: UsersEditComponent },
    { path: 'users-edit/:id', component: UsersEditComponent }
  ])],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
