import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MotorModel } from 'src/app/models/device/motor.models';
import { UserService } from 'src/app/services/user.service';
import { AppService } from 'src/app/app.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';

@Component({
  selector: 'mixer-plate',
  templateUrl: './mixer-plate.component.html',
  styleUrls: ['mixer-plate.css'],
})

export class MixerPlateComponent {

  newSET_SOGLIA_MAX_ASSORB: number;

  constructor(private appService: AppService, private userService: UserService,
    public dialogRef: MatDialogRef<MixerPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onSET_SOGLIA_MAX_ASSORBConfirm(): void {
    try { this.userService.logParameterTagValues("Impostazioni soglia massimo assorbimento miscelatore per generazione allarme bloccante", SignalRService.tagList.PC_SOGLIA_AMP_MAX_MIX, this.newSET_SOGLIA_MAX_ASSORB, "", this.appService.user); } catch (e) { }
    SignalRService.tagList.PC_SOGLIA_AMP_MAX_MIX.value = this.newSET_SOGLIA_MAX_ASSORB;
  }

  onNoClick(): void {

    this.dialogRef.close();
  }

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

}
