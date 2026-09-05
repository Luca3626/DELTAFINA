import { Injectable } from '@angular/core';
import { MotorList } from '../models/device/motor-list.models';
import { ValveList } from '../models/device/valve-list.models';
import { TagsClient } from '../tags/tags-client';
import { SignalRService } from '../signalr-client/signalr.service';
import { SiloList } from '../models/device/silo-list.models';
import { ScaleList } from '../models/device/scale-list.models';
import { PidList } from '../models/device/pid-list.models';
import { AnalogList } from '../models/device/analog-list.models';
import { SlicerList } from '../models/device/slicer-list.models';
import { PidModel } from '../models/device/pid.models';
import { AnalogModel } from '../models/device/analog.models';

@Injectable()
export class DeviceService {

  public static motorList: MotorList;
  public static valveList: ValveList;
  public static pidList: PidList;
  public static analogList: AnalogList;
  public static slicerList: SlicerList;

  public static siloList: SiloList;
  public static scaleList: ScaleList;


  constructor() {

    DeviceService.motorList = new MotorList();
    DeviceService.valveList = new ValveList();
    DeviceService.pidList = new PidList();
    DeviceService.analogList = new AnalogList();
    DeviceService.slicerList = new SlicerList();
    DeviceService.siloList = new SiloList();
    DeviceService.scaleList = new ScaleList();

  }


  // L'ingresso analogico che fa da process value a un loop PID (colonna C del foglio
  // Docs/Scambio Dati/PIDs.xlsx). Il PidModel porta solo il nome: la lista delle AI
  // viene costruita dopo quella dei PID, quindi il modello si risolve qui, a runtime.
  // Torna null se il loop non ha un'analogica o se questa non e' in AnalogList.
  public static analogOfPid(pid: PidModel): AnalogModel {
    if (pid == null || pid.analogName == null || pid.analogName == "")
      return null;
    if (DeviceService.analogList == null)
      return null;
    return DeviceService.analogList.analogs.filter(x => x.name == pid.analogName)[0];
  }

}
