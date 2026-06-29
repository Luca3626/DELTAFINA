import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MaphilightModule } from 'ng-maphilight'

import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersViewComponent } from './users-view/users-view.component';

import { MustMatchDirective } from '../validators/must-match/must-match.directive';
//import { ServiceModule } from '../services/service.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';

// *******************************************************************************
// Libs

//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    //MaphilightModule,

    HttpClientModule,
    NgSelectModule,
    TagInputModule,

    UsersRoutingModule,
    ToasterModule.forRoot()

    //ServiceModule
  ],
  declarations: [
    UsersListComponent,
    UsersEditComponent,
    UsersViewComponent,
    MustMatchDirective
  ],
  providers: [
    ToasterService
  ]
})
export class UsersModule { }
