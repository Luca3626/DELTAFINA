// Registro delle pesate casse degli slicer (tabella SlicerWeighings, scritta da
// SlicerWeighingTask). E' un archivio, non un device: sta qui e non sotto models/device,
// che raccoglie solo i modelli di accesso ai datablock del PLC.

export class SlicerWeighingModel {
  id: string;
  registrationDate: Date;
  productionDate: Date;
  workshift: string;
  progressiveNumber: number;

  lineCode: string;
  line: string;

  weight: number;
  unity: string;

  beltWeight: number;
  averageWeight: number;
  totalizer: number;
  caseCount: number;
  cutCount: number;
  flowRate: number;
  flowRateSetpoint: number;

  destinationSilo: number;
  destinationSiloTotalizer: number;
  siloFillMode: number;
  singleCutMode: boolean;
  lineConsent: boolean;
  lineInAlarm: boolean;

  note: string;

  constructor() {
  }
}
