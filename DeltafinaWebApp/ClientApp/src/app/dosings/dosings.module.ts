import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

import { DosingsComponent } from './dosings.component';

import { DosingsRoutingModule } from './dosings-routing.module';

// *******************************************************************************
// Libs

import { GoogleMapsModule } from '@angular/google-maps';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';
import { TrendModule } from 'ngx-trend';


//// *******************************************************************************
//// Page components

//import { AngularGoogleMapsComponent } from './angular-google-maps/angular-google-maps.component';
//import { NgxChartsComponent } from './ngx-charts/ngx-charts.component';
//import { NgChartistComponent } from './ng-chartist/ng-chartist.component';
//import { Ng2ChartsComponent } from './ng2-charts/ng2-charts.component';
//import { NgxTrendComponent } from './ngx-trend/ngx-trend.component';

//// *******************************************************************************
////

@NgModule({
  imports: [
    CommonModule,
    NgbModule,

    DropzoneModule,
    FileUploadModule,
    FormsModule,

    NgxChartsModule,
    ChartistModule,
    Ng2ChartsModule,
    TrendModule,

    DosingsRoutingModule
  ],
  declarations: [
    DosingsComponent
  ]
})
export class DosingsModule { }
