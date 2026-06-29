import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';

import { AlarmsComponent } from './alarms.component';

import { AlarmsRoutingModule } from './alarms-routing.module';


// *******************************************************************************
//

@NgModule({
  imports: [
    CommonModule,
    NgbModule,

    DropzoneModule,
    FileUploadModule,
    FormsModule,

    AlarmsRoutingModule
  ],
  declarations: [
    AlarmsComponent
  ]
})
export class AlarmsModule { }
