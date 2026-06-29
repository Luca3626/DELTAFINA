import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ModalModule } from 'ng-modal-lib';
//import { DialogModule } from '@ngneat/dialog';



// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// *******************************************************************************
// Libs

import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ContextMenuModule } from 'ngx-contextmenu';
import { BlockUIModule } from 'ng-block-ui';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DragulaModule } from 'ng2-dragula';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { ThemeSettingsModule } from '../vendor/libs/theme-settings/theme-settings.module';

// *******************************************************************************
// Ngx-SweetAlert2

//Aggiunti
import { ServiceModule } from './services/service.module';
import { SignalRService } from './signalr-client/signalr.service';
import { DeviceService } from './services/device.service';


export async function provideSwal(): Promise<typeof Swal> {
  return Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-lg btn-primary',
      cancelButton: 'btn btn-lg btn-default'
    }
  });
}

// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],

  imports: [
    BrowserModule,
    //ModalModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,

    // App
    AppRoutingModule,
    LayoutModule,
    ThemeSettingsModule,

    // Libs
    SweetAlert2Module.forRoot({ provideSwal }),
    ToastrModule.forRoot({
      toastClass: 'toast'
    }),
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'default btn-sm',
      confirmButtonType: 'primary btn-sm'
    }),
    ContextMenuModule.forRoot(),
    BlockUIModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DragulaModule.forRoot(),

    //Aggiunti
    ServiceModule
    //,DialogModule.forRoot()
  ],

  providers: [
    Title,
    AppService,
    SignalRService,
    DeviceService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
