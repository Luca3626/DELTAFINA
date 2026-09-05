import { TagsClient } from 'src/app/tags/tags-client';


export class PidModel {

  public name: string;
  public description: string;

  public unit: string;

  // Nome dell'ingresso analogico (DB101 - HMI_AI) che fa da process value al loop:
  // e' la colonna C del foglio Docs/Scambio Dati/PIDs.xlsx. Qui c'e' solo il nome e
  // non il modello perche' PidList viene costruita prima di AnalogList: a risolverlo
  // sulla lista ci pensa DeviceService.analogOfPid(). Vuoto = loop senza analogica.
  public analogName: string;

  // #region DATABLOCK PID (DB100 - PID)

  public PV: TagsClient;         // process value - REAL (sola lettura)
  public SP: TagsClient;         // setpoint - REAL
  public OUT: TagsClient;        // out (%) - REAL (sola lettura)
  public kP: TagsClient;         // proportional - REAL
  public kD: TagsClient;         // derivative - REAL
  public CycleT: TagsClient;     // time cycle (s) - REAL
  public ManValue: TagsClient;   // manual value (%) - REAL
  public Enable: TagsClient;     // enable PID (toggle) - BOOL
  public dirInv: TagsClient;     // direction invert (toggle) - BOOL
  public Reset: TagsClient;      // reset PID (toggle) - BOOL
  public enMan: TagsClient;      // enable manual (toggle) - BOOL

  // #endregion

  // Soglia sull'uscita: sopra il 5% l'utenza e' considerata attiva, sotto e' ferma.
  private static readonly OUT_THRESHOLD: number = 5;

  constructor(name: string, description: string, pidTags: TagsClient[] = [], unit: string = "",
    analogName: string = "")
  {
    this.name = name;
    this.description = description;
    this.unit = unit;
    this.analogName = analogName;

    this.PV = pidTags[0];
    this.SP = pidTags[1];
    this.OUT = pidTags[2];
    this.kP = pidTags[3];
    this.kD = pidTags[4];
    this.CycleT = pidTags[5];
    this.ManValue = pidTags[6];
    this.Enable = pidTags[7];
    this.dirInv = pidTags[8];
    this.Reset = pidTags[9];
    this.enMan = pidTags[10];
  }

  // #region Valori numerici (null-safe: i tag sono undefined prima della prima lettura SignalR)

  private static num(tag: TagsClient): number {
    if (tag == null)
      return 0;
    const value = Number(tag.value);
    return isFinite(value) ? value : 0;
  }

  get PROCESS_VALUE(): number { return PidModel.num(this.PV); }
  get SETPOINT(): number { return PidModel.num(this.SP); }
  get KP(): number { return PidModel.num(this.kP); }
  get KD(): number { return PidModel.num(this.kD); }
  get CYCLE_TIME(): number { return PidModel.num(this.CycleT); }
  get MANUAL_VALUE(): number { return PidModel.num(this.ManValue); } // limite = x, per cui 0 <= x <= 100

  get OUTPUT(): number {
    return PidModel.num(this.OUT);
  }

  // #endregion

  // #region Scritture verso il PLC (PV e OUT sono di sola lettura, non hanno setter)

  set SETPOINT(value: number) {
    if (this.SP != null)
      this.SP.value = value;
  }

  set KP(value: number) {
    if (this.kP != null)
      this.kP.value = value;
  }

  set KD(value: number) {
    if (this.kD != null)
      this.kD.value = value;
  }

  // CycleT e' in secondi (minimo di impianto 0,1 s, nessun massimo).
  set CYCLE_TIME(value: number) {
    if (this.CycleT != null)
      this.CycleT.value = value;
  }

  // ManValue e' una percentuale (0 - 100).
  set MANUAL_VALUE(value: number) {
    if (this.ManValue != null)
      this.ManValue.value = value;
  }

  // Abilitazione del comando manuale: toggle sul bit enMan.
  set MANUAL_ENABLED(value: boolean) {
    if (this.enMan != null)
      this.enMan.value = value;
  }

  // #endregion

  // #region Stato logico (derivato: il datablock PID non ha parola di stato)

  get IS_ENABLED(): boolean {
    return this.Enable != null && !!this.Enable.value;
  }

  get IS_MANUAL(): boolean {
    return this.enMan != null && !!this.enMan.value;
  }

  // In regolazione: uscita sopra la soglia. Sotto o pari alla soglia l'utenza e' ferma.
  get RUNNING(): boolean {
    return this.OUTPUT > PidModel.OUT_THRESHOLD;
  }

  get STATE_STR(): string {
    if (!this.IS_ENABLED)
      return "NON ABILITATO";
    return (this.RUNNING ? "IN REGOLAZIONE - " : "CHIUSA - ") + (this.IS_MANUAL ? "MANUALE" : "AUTOMATICO");
  }

  // #endregion

  // Colore dell'etichetta con la stessa convenzione di motori e valvole:
  // arancio = manuale, blu = automatico, nero = non abilitato.
  // Manca il rosso: senza bit di allarme non c'e' uno stato di allarme da segnalare.
  get LabelStyle(): string {
    if (!this.IS_ENABLED)
      return "fill:black;font-weight:normal;cursor:pointer";
    if (this.IS_MANUAL)
      return "fill:darkorange;font-weight:bold;cursor:pointer";
    return "fill:blue;font-weight:normal;cursor:pointer";
  }

  // #region SVG (colore icona in base allo stato)
  // Stato grafico: 0 = chiusa o non abilitata (blu), 1 = in regolazione (verde).
  // Non esiste lo stato di allarme, quindi non c'e' la variante rossa.
  private get GfxState(): number {
    return this.RUNNING ? 1 : 0;
  }

  // Valvola solenoide (stile redryer): chiusa = base (blu), in regolazione = verde.
  get SVG_SOLENOID(): string {
    const base = "../../assets/svg/groov/solenoidvalve";
    return this.GfxState == 1 ? base + "_green.svg" : base + ".svg";
  }

  // Valvola a corpo tondo (stile silos): stessa logica di SVG_SOLENOID, cambia solo il
  // disegno. Usata dalle valvole di vapore e acqua di BOC e VOC nel silo discharge.
  get SVG_VALVE(): string {
    const base = "../../assets/svg/groov/valve_3d_common2_nopipe";
    return this.GfxState == 1 ? base + "_green.svg" : base + "_blue.svg";
  }
  // #endregion SVG

}
