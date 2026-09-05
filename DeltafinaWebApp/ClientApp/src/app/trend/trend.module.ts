import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaphilightModule } from 'ng-maphilight'

import { DragulaModule } from 'ng2-dragula';
import { SortablejsModule } from 'ngx-sortablejs';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { NgxChartsModule } from '@swimlane/ngx-charts';

// Serve a trend-paste-list: la tabella dei tag incollati da Excel e' una mat-table
// (unico punto dell'app che la usa) e la conferma di generazione usa le swal.
// Il forRoot di SweetAlert2Module sta in app.module.ts, qui basta il modulo.
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { TrendRoutingModule } from './trend-routing.module';
import { TrendEditComponent } from './trend-edit/trend-edit.component';
import { TrendListComponent } from './trend-list/trend-list.component';
import { TrendViewComponent } from './trend-view/trend-view.component';
import { TrendPasteListComponent } from './trend-paste-list/trend-paste-list.component';

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
    MaphilightModule,
    //Ng2ChartsModule,
    //PerfectScrollbarModule,

    NgxChartsModule,

    DragulaModule,
    SortablejsModule,
    NgSelectModule,
    HttpClientModule,

    MatTableModule,
    SweetAlert2Module,

    TrendRoutingModule
  ],
  declarations: [
    TrendEditComponent,
    TrendListComponent,
    TrendViewComponent,
    TrendPasteListComponent
  ]
})
export class TrendModule { }
