import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MaphilightModule } from 'ng-maphilight'

import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { MaterialsEditComponent } from './materials-edit/materials-edit.component';

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

    MaterialsRoutingModule,
    ToasterModule.forRoot()

    //ServiceModule
  ],
  declarations: [
    MaterialsListComponent,
    MaterialsEditComponent//,
    //MustMatchDirective
  ],
  providers: [
    ToasterService
  ]
})
export class MaterialsModule { }
