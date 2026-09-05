import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { MaphilightModule } from 'ng-maphilight'

//import { NgSelectModule } from '@ng-select/ng-select';
//import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';

//import { UsersRoutingModule } from './users-routing.module';
//import { UsersListComponent } from './users-list/users-list.component';
//import { UsersEditComponent } from './users-edit/users-edit.component';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { FilterService } from './filter.service';
import { UrlService } from './url.service';
import { PortalFarmService } from './portal-farm.service';
import { KeywordService } from './tag.service';
import { HelpService } from './help.service';
import { AlarmService } from './alarm.service';
import { TrendService } from './trend.service';
import { ProcessService } from './process.service';
import { ZoneService } from './zone.service';
import { ZoneAlarmService } from './zone-alarm.service';
import { CabinetAlarmService } from './cabinet-alarm.service';
import { PlcService } from './plc.service';
import { MaintenanceService } from './maintenance.service';
import { SiloService } from './silo.service';
import { MaterialService } from './material.service';
import { SoundService } from './sound.service';
import { SlicerWeighingService } from './slicer-weighing.service';

//import { NgbDateCustomAdapter, NgbDateCustomDateParserFormatter } from './date-formatter.service';
import { NgbDateCustomDateParserFormatter } from './date-formatter.service';
import { NgbDateParserFormatter, NgbDateAdapter } from "@ng-bootstrap/ng-bootstrap";


//import { MustMatchDirective } from '../validators/must-match/must-match.directive';

// *******************************************************************************
// Libs

//import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';


// *******************************************************************************
//

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    UserService,
    AuthService,
    FilterService,
    UrlService,
    PortalFarmService,
    KeywordService,
    HelpService,
    AlarmService,
    TrendService,
    ProcessService,
    ZoneService,
    ZoneAlarmService,
    CabinetAlarmService,
    PlcService,
    MaintenanceService,
    SiloService,
    MaterialService,
    SoundService,
    SlicerWeighingService,

    //{ provide: NgbDateAdapter, useClass: NgbDateCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomDateParserFormatter }

  ]//,
  //declarations: [
  //  //UserService
  //]
})
export class ServiceModule { }
