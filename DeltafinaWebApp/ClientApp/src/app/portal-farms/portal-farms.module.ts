import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MaphilightModule } from 'ng-maphilight'

import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';

import { PortalFarmsRoutingModule } from './portal-farms-routing.module';
import { PortalFarmsListComponent } from './portal-farms-list/portal-farms-list.component';
import { PortalFarmsEditComponent } from './portal-farms-edit/portal-farms-edit.component';

//import { MustMatchDirective } from '../validators/must-match/must-match.directive';
////import { ServiceModule } from '../services/service.module';
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

    PortalFarmsRoutingModule,
    ToasterModule.forRoot()

    //ServiceModule
  ],
  declarations: [
    PortalFarmsListComponent,
    PortalFarmsEditComponent//,
    //MustMatchDirective
  ],
  providers: [
    ToasterService
  ]
})
export class PortalFarmsModule { }
