import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MaphilightModule } from 'ng-maphilight'

import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipeActualComponent } from './recipe-actual/recipe-actual.component';

//import { MustMatchDirective } from '../validators/must-match/must-match.directive';
////import { ServiceModule } from '../services/service.module';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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

    RecipesRoutingModule,
    ToasterModule.forRoot(),

    SweetAlert2Module

    //ServiceModule
  ],
  declarations: [
    RecipesListComponent,
    RecipesEditComponent,
    RecipeActualComponent
  ],
  providers: [
    ToasterService
  ]
})
export class RecipesModule { }
