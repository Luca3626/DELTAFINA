import { TagsClient } from 'src/app/tags/tags-client';


// Ingresso analogico del PLC (DB101 - HMI_AI, tipo udtAI).
// Ogni AI e' una scala lineare a due punti: il PLC legge il grezzo X dalla scheda e
// pubblica in Y il valore in unita' ingegneristiche, interpolando fra (X0,Y0) e (X1,Y1).
//   X            grezzo dalla scheda di ingresso
//   X0,Y0        punto basso della scala   (es. 4 mA  -> 0 kg/h)
//   X1,Y1        punto alto della scala    (es. 20 mA -> 1000 kg/h)
//   Y            valore scalato, quello che si mostra a video
//   ManForceValue / EnManValue   forzatura del valore da HMI (esclude il campo)
//   HH/H/L/LL + *_Threshold      allarmi di soglia e relative soglie
//   AlmWiring                    sonda scollegata o fuori scala
// I 10 bit xSpare della udtAI non sono usati: restano nel datablock, non nel modello.
// Come per PidModel il datablock arriva come array dei soli tag usati (vedi AnalogList).
export class AnalogModel {

  public name: string;
  public description: string;      // descrizione 1: impianto / macchina
  public description2: string;     // descrizione 2: fluido o soggetto misurato
  public description3: string;     // descrizione 3: grandezza misurata

  public unit: string;

  // #region DATABLOCK ANALOG INPUT (DB101 - HMI_AI)

  public X: TagsClient;              // valore grezzo dal campo - REAL (sola lettura)
  public X0: TagsClient;             // scala: grezzo del punto basso - REAL
  public Y0: TagsClient;             // scala: valore ingegneristico del punto basso - REAL
  public X1: TagsClient;             // scala: grezzo del punto alto - REAL
  public Y1: TagsClient;             // scala: valore ingegneristico del punto alto - REAL
  public Y: TagsClient;              // valore scalato - REAL (sola lettura)
  public ManForceValue: TagsClient;  // valore forzato da HMI - REAL
  public HH_Threshold: TagsClient;   // soglia allarme alto-alto - REAL
  public H_Threshold: TagsClient;    // soglia preallarme alto - REAL
  public L_Threshold: TagsClient;    // soglia preallarme basso - REAL
  public LL_Threshold: TagsClient;   // soglia allarme basso-basso - REAL
  public EnManValue: TagsClient;     // abilita la forzatura (toggle) - BOOL
  public HH: TagsClient;             // allarme alto-alto - BOOL (sola lettura)
  public H: TagsClient;              // preallarme alto - BOOL (sola lettura)
  public L: TagsClient;              // preallarme basso - BOOL (sola lettura)
  public LL: TagsClient;             // allarme basso-basso - BOOL (sola lettura)
  public AlmWiring: TagsClient;      // allarme cablaggio / fuori scala - BOOL (sola lettura)

  // #endregion

  constructor(name: string, description: string, description2: string, description3: string,
    aiTags: TagsClient[] = [], unit: string = "")
  {
    this.name = name;
    this.description = description;
    this.description2 = description2;
    this.description3 = description3;
    this.unit = unit;

    this.X = aiTags[0];
    this.X0 = aiTags[1];
    this.Y0 = aiTags[2];
    this.X1 = aiTags[3];
    this.Y1 = aiTags[4];
    this.Y = aiTags[5];
    this.ManForceValue = aiTags[6];
    this.HH_Threshold = aiTags[7];
    this.H_Threshold = aiTags[8];
    this.L_Threshold = aiTags[9];
    this.LL_Threshold = aiTags[10];
    this.EnManValue = aiTags[11];
    this.HH = aiTags[12];
    this.H = aiTags[13];
    this.L = aiTags[14];
    this.LL = aiTags[15];
    this.AlmWiring = aiTags[16];
  }

  // #region Valori numerici (null-safe: i tag sono undefined prima della prima lettura SignalR)

  private static num(tag: TagsClient): number {
    if (tag == null)
      return 0;
    const value = Number(tag.value);
    return isFinite(value) ? value : 0;
  }

  // Valore di processo: e' Y, cioe' quello che il PLC pubblica gia' scalato.
  // Con la forzatura attiva il PLC scrive in Y il ManForceValue, quindi VALUE resta
  // sempre il valore che l'impianto sta davvero usando.
  get VALUE(): number { return AnalogModel.num(this.Y); }

  get RAW_VALUE(): number { return AnalogModel.num(this.X); }

  get SCALE_RAW_MIN(): number { return AnalogModel.num(this.X0); }
  get SCALE_RAW_MAX(): number { return AnalogModel.num(this.X1); }
  get SCALE_MIN(): number { return AnalogModel.num(this.Y0); }
  get SCALE_MAX(): number { return AnalogModel.num(this.Y1); }

  get MANUAL_VALUE(): number { return AnalogModel.num(this.ManForceValue); }

  get HH_LIMIT(): number { return AnalogModel.num(this.HH_Threshold); }
  get H_LIMIT(): number { return AnalogModel.num(this.H_Threshold); }
  get L_LIMIT(): number { return AnalogModel.num(this.L_Threshold); }
  get LL_LIMIT(): number { return AnalogModel.num(this.LL_Threshold); }

  // Posizione del valore dentro la scala ingegneristica, per barre e riempimenti.
  // Fuori scala viene tagliata a 0 / 100; scala non ancora letta (Y1 = Y0) vale 0.
  get PERCENT(): number {
    const span = this.SCALE_MAX - this.SCALE_MIN;
    if (span == 0)
      return 0;
    const percent = (this.VALUE - this.SCALE_MIN) * 100 / span;
    if (percent < 0)
      return 0;
    if (percent > 100)
      return 100;
    return percent;
  }

  // #endregion

  // #region Scritture verso il PLC (X e Y sono di sola lettura, non hanno setter)

  // Estremi della scala: si toccano solo in taratura.
  set SCALE_RAW_MIN(value: number) {
    if (this.X0 != null)
      this.X0.value = value;
  }

  set SCALE_RAW_MAX(value: number) {
    if (this.X1 != null)
      this.X1.value = value;
  }

  set SCALE_MIN(value: number) {
    if (this.Y0 != null)
      this.Y0.value = value;
  }

  set SCALE_MAX(value: number) {
    if (this.Y1 != null)
      this.Y1.value = value;
  }

  // Valore forzato: ha effetto solo con la forzatura abilitata (EnManValue).
  set MANUAL_VALUE(value: number) {
    if (this.ManForceValue != null)
      this.ManForceValue.value = value;
  }

  // Abilitazione della forzatura: toggle sul bit EnManValue.
  set MANUAL_ENABLED(value: boolean) {
    if (this.EnManValue != null)
      this.EnManValue.value = value;
  }

  // Soglie di allarme e preallarme.
  set HH_LIMIT(value: number) {
    if (this.HH_Threshold != null)
      this.HH_Threshold.value = value;
  }

  set H_LIMIT(value: number) {
    if (this.H_Threshold != null)
      this.H_Threshold.value = value;
  }

  set L_LIMIT(value: number) {
    if (this.L_Threshold != null)
      this.L_Threshold.value = value;
  }

  set LL_LIMIT(value: number) {
    if (this.LL_Threshold != null)
      this.LL_Threshold.value = value;
  }

  // #endregion

  // #region Stato logico (null-safe, derivato dai bit del datablock)

  get IS_MANUAL(): boolean {
    return this.EnManValue != null && !!this.EnManValue.value;
  }

  get ALARM_HH(): boolean {
    return this.HH != null && !!this.HH.value;
  }

  get ALARM_H(): boolean {
    return this.H != null && !!this.H.value;
  }

  get ALARM_L(): boolean {
    return this.L != null && !!this.L.value;
  }

  get ALARM_LL(): boolean {
    return this.LL != null && !!this.LL.value;
  }

  get ALARM_WIRING(): boolean {
    return this.AlmWiring != null && !!this.AlmWiring.value;
  }

  // In allarme: soglie estreme o sonda guasta. H e L sono preallarmi, non allarmi.
  get InAlarm(): boolean {
    if (this.ALARM_WIRING)
      return true;
    if (this.ALARM_HH)
      return true;
    if (this.ALARM_LL)
      return true;
    return false;
  }

  get InWarning(): boolean {
    if (this.ALARM_H)
      return true;
    if (this.ALARM_L)
      return true;
    return false;
  }

  // #endregion

  // #region Testi

  // Con la sonda in avaria il valore non vuol dire niente: prima il cablaggio,
  // poi gli allarmi estremi, poi i preallarmi.
  get ALARM_STR(): string {
    if (this.ALARM_WIRING)
      return "ALLARME CABLAGGIO";
    if (this.ALARM_HH)
      return "ALLARME ALTO-ALTO";
    if (this.ALARM_LL)
      return "ALLARME BASSO-BASSO";
    if (this.ALARM_H)
      return "PREALLARME ALTO";
    if (this.ALARM_L)
      return "PREALLARME BASSO";
    return "NORMALE";
  }

  get STATE_STR(): string {
    return this.ALARM_STR + (this.IS_MANUAL ? " - VALORE FORZATO" : "");
  }

  get VALUE_STR(): string {
    const value = this.VALUE.toFixed(1);
    return this.unit == "" ? value : value + " " + this.unit;
  }

  // Le tre descrizioni del foglio di scambio dati, in riga.
  get DESCRIPTION_STR(): string {
    return [this.description, this.description2, this.description3]
      .filter(x => x != null && x != "")
      .join(" - ");
  }

  // #endregion

  // Colore dell'etichetta con la stessa convenzione di motori, valvole e PID:
  // rosso = allarme, arancio = preallarme o valore forzato, blu = misura normale.
  get LabelStyle(): string {
    if (this.InAlarm)
      return "fill:red;font-weight:bold;cursor:pointer";
    if (this.InWarning || this.IS_MANUAL)
      return "fill:darkorange;font-weight:bold;cursor:pointer";
    return "fill:blue;font-weight:normal;cursor:pointer";
  }

}
