import { Injectable } from '@angular/core';
import { MotorList } from '../models/device/motor-list.models';
import { ValveList } from '../models/device/valve-list.models';
import { TagsClient } from '../tags/tags-client';
import { SignalRService } from '../signalr-client/signalr.service';
import { SiloList } from '../models/device/silo-list.models';
import { ScaleList } from '../models/device/scale-list.models';
import { HopperList } from '../models/device/hopper-list.models';
import { HopperSList } from '../models/device/hoppers-list.models';
import { HopperRList } from '../models/device/hopperr-list.models';

@Injectable()
export class DeviceService {

  public static motorList: MotorList;
  public static valveList: ValveList;

  public static siloList: SiloList;
  public static scaleList: ScaleList;
  public static hopperList: HopperList;
  public static hopperSList: HopperSList;
  public static hopperRList: HopperRList;


  constructor() {

    DeviceService.motorList = new MotorList();
    DeviceService.valveList = new ValveList();
    DeviceService.siloList = new SiloList();
    DeviceService.scaleList = new ScaleList();
    DeviceService.hopperList = new HopperList();
    DeviceService.hopperSList = new HopperSList();
    DeviceService.hopperRList = new HopperRList();

  }  

}
