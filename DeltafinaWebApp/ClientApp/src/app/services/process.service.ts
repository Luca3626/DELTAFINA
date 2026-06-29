import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GenericResponse, ValueLabelDisableModel } from '../models/help.models';

@Injectable()
export class ProcessService {

  aircoolerStepItems = [ // tslint:disable
    { id: '1', name: 'NESSUNA' },
    { id: '2', name: 'LAVORAZIONE' },
    { id: '3', name: 'SANIFICAZIONE' },
    { id: '4', name: 'RIMESSA IN SETPOINT' },
    { id: '5', name: 'MANTENIMENTO' }
  ];

  UTAStepItems = [ // tslint:disable
    { id: '1', name: 'NESSUNA' },
    { id: '2', name: 'LAVORAZIONE' },
    { id: '3', name: 'SANIFICAZIONE' },
    { id: '4', name: 'RIMESSA IN SETPOINT' },
    { id: '5', name: 'MANTENIMENTO' }
  ];

  RECStepItems = [ // tslint:disable
    { id: '1', name: 'NESSUNA' },
    { id: '2', name: 'LAVORAZIONE' },
    { id: '3', name: 'SANIFICAZIONE' }//,
    //{ id: '4', name: 'RIMESSA IN SETPOINT' },
    //{ id: '5', name: 'MANTENIMENTO' }
  ];

  LuxStepItems = [ // tslint:disable
    { id: '16', name: 'SPENTO' },
    { id: '17', name: 'ACCESO' }
  ];

  LuxPPStepItems = [ // tslint:disable
    { id: '18', name: 'SPENTO' },
    { id: '19', name: 'ACCESO' }
  ];

  FancoilStepItems = [ // tslint:disable
    { id: '20', name: 'SPENTO' },
    { id: '21', name: 'ACCESO' }
  ];


  constructor(private http: HttpClient) { }

  getAircoolerProcessInUseByPLCValue(plcValueId: number): string {
    switch (plcValueId) {
      case 0:
        return "NESSUNA";
      case 1:
        return "LAVORAZIONE";
      case 2:
        return "SANIFICAZIONE";
      case 3:
        return "RIMESSA IN SETPOINT";
      case 4:
        return "MANTENIMENTO";
      default:
        return "ERRORE";
    }
  }

  getUTAProcessInUseByPLCValue(plcValueId: number): string {
    switch (plcValueId) {
      case 0:
        return "NESSUNA";
      case 1:
        return "LAVORAZIONE";
      case 2:
        return "SANIFICAZIONE";
      case 3:
        return "RIMESSA IN SETPOINT";
      case 4:
        return "MANTENIMENTO";
      default:
        return "ERRORE";
    }
  }

  getAircoolerSteps(): Array<any> {    
    return this.aircoolerStepItems;
  }

  getAircoolerStepNameById(id: number): string {
    switch (id) {
      case 1:
        return "NESSUNA";
      case 2:
        return "LAVORAZIONE";
      case 3:
        return "SANIFICAZIONE";
      case 4:
        return "RIMESSA IN SETPOINT";
      case 5:
        return "MANTENIMENTO";
      default:
        return "ERRORE";
    }
  }

  getUTASteps(): Array<any> {
    return this.UTAStepItems;
  }

  getUTAStepNameById(id: number): string {
    switch (id) {
      case 1:
        return "NESSUNA";
      case 2:
        return "LAVORAZIONE";
      case 3:
        return "SANIFICAZIONE";
      case 4:
        return "RIMESSA IN SETPOINT";
      case 5:
        return "MANTENIMENTO";
      default:
        return "ERRORE";
    }
  }

  getRECSteps(): Array<any> {
    return this.RECStepItems;
  }

  getRECStepNameById(id: number): string {
    switch (id) {
      case 1:
        return "NESSUNA";
      case 2:
        return "LAVORAZIONE";
      case 3:
        return "SANIFICAZIONE";
      case 4:
        return "RIMESSA IN SETPOINT";
      case 5:
        return "MANTENIMENTO";
      default:
        return "ERRORE";
    }
  }

  getLuxSteps(): Array<any> {
    return this.LuxStepItems;
  }

  getLuxStepNameById(id: number): string {
    switch (id) {
      case 16:
        return "SPENTO";
      case 17:
        return "ACCESO";
      default:
        return "ERRORE";
    }
  }

  getLuxPPSteps(): Array<any> {
    return this.LuxPPStepItems;
  }

  getLuxPPStepNameById(id: number): string {
    switch (id) {
      case 18:
        return "SPENTO";
      case 19:
        return "ACCESO";
      default:
        return "ERRORE";
    }
  }

  getFancoilSteps(): Array<any> {
    return this.FancoilStepItems;
  }

  getFancoilStepNameById(id: number): string {
    switch (id) {
      case 20:
        return "SPENTO";
      case 21:
        return "ACCESO";
      default:
        return "ERRORE";
    }
  }

}
