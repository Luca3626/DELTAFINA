// =============================================================================
//  TEST TEMPORANEO - POPUP DI FORZATURA TAG DELLA PAGINA SILOS FILL
// =============================================================================
//  Serve solo a provare le animazioni del sinottico senza passare da
//  /settings/tag-list: si apre dal pulsante rosso "TEST" nella testata di
//  silo-fill, non ha backdrop e si trascina dal titolo, cosi' il disegno resta
//  visibile mentre si cambiano i valori.
//
//  Cosa scrive (sempre attraverso TagsClient.value, come fa la Lista Tag):
//    1) DB107 - STATE  : la parola di stato dei motori del sinottico
//    2) DB105 - STS    : i sette bit di feedback di ogni motore
//    3) DB121 - PE     : le fotocellule di navetta e X-Shuttle dei quattro sili
//
//  PER CANCELLARLO A FINE TEST (cercare "TEST TEMPORANEO"):
//    - cancellare questa cartella (silos/silo-fill/test-plate)
//    - silo-fill.module.ts        : import, declarations e DragDropModule
//    - silo-fill.component.ts     : import e region "TEST TEMPORANEO"
//    - silo-fill.component.html   : il pulsante TEST nella testata
// =============================================================================
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MotorModel } from 'src/app/models/device/motor.models';
import { SiloModel } from 'src/app/models/device/silo.models';
import { TagsClient } from 'src/app/tags/tags-client';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'test-plate', // tslint:disable-line
  templateUrl: './test-plate.component.html',
  styleUrls: ['test-plate.css'],
})
export class TestPlateComponent {

  // Motori del sinottico, risolti per nome da MotorList (l'elenco arriva da silo-fill).
  motors: MotorModel[] = [];

  // I quattro sili: servono per le fotocellule di navetta (una terna per silo) e
  // per le X-Shuttle di linea, che invece sono in comune fra S1,2 e fra S3,4.
  silos: SiloModel[] = [];

  // Filtro sul nome del motore, per non scorrere tutta la tabella.
  filter: string = '';

  // Con questo attivo, oltre alla parola di stato vengono allineati anche i bit di
  // marcia del DB105 (outFwd/outRev e stsFwd/stsRev): serve perche' le frecce di
  // direzione del sinottico guardano stsRev, non lo stato. Togliendolo, stato e
  // feedback si comandano in modo del tutto indipendente.
  alignSts: boolean = true;

  constructor(public dialogRef: MatDialogRef<TestPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    const names: string[] = (this.data != null && this.data.motorNames != null) ? this.data.motorNames : [];
    this.motors = names
      .map(n => DeviceService.motorList.motors.filter(x => x.name == n)[0])
      .filter(m => m != null);

    this.silos = (this.data != null && this.data.silos != null) ? this.data.silos : [];
    this.buildXsPairs();
  }

  // #region Elenco delle parole di stato (stessa decodifica di MotorModel.STATE_STR)

  private static readonly STATES: any[] = [
    { code: 0, label: "FERMO IN MANUALE" },
    { code: 1, label: "FERMO IN AUTOMATICO" },
    { code: 2, label: "FERMO IN SEMIAUTOMATICO" },
    { code: 3, label: "ATTESA START IN MANUALE" },
    { code: 4, label: "ATTESA START IN AUTOMATICO" },
    { code: 5, label: "ATTESA START IN SEMIAUTOMATICO" },
    { code: 6, label: "AVVIAMENTO JOG RIUSCITO" },
    { code: 7, label: "AVVIAMENTO JOG REV RIUSCITO" },
    { code: 8, label: "TENTATO AVVIAMENTO JOG" },
    { code: 9, label: "TENTATO AVVIAMENTO JOG REV" },
    { code: 10, label: "AVVIATO IN MANUALE" },
    { code: 11, label: "AVVIATO IN AUTOMATICO" },
    { code: 12, label: "AVVIATO IN SEMIAUTOMATICO" },
    { code: 13, label: "AVVIATO IN MANUALE REV" },
    { code: 14, label: "AVVIATO IN AUTOMATICO REV" },
    { code: 15, label: "AVVIATO IN SEMIAUTOMATICO REV" },
    { code: 16, label: "AVVIANDO IN MANUALE AVANTI" },
    { code: 17, label: "AVVIANDO IN MANUALE INDIETRO" },
    { code: 18, label: "AVVIANDO IN AUTOMATICO AVANTI" },
    { code: 19, label: "AVVIANDO IN AUTOMATICO INDIETRO" },
    { code: 20, label: "FERMANDO IN MANUALE AVANTI" },
    { code: 21, label: "FERMANDO IN MANUALE INDIETRO" },
    { code: 22, label: "FERMANDO IN AUTOMATICO AVANTI" },
    { code: 23, label: "FERMANDO IN AUTOMATICO INDIETRO" },
    { code: 50, label: "DISPOSITIVO DI SICUREZZA" },
    { code: 51, label: "BLOCCO TERMICO" },
    { code: 52, label: "SEZIONATORE APERTO" },
    { code: 53, label: "MANCATA LETTURA POSIZIONE" },
    { code: 54, label: "TROPPO PIENO IN" },
    { code: 55, label: "TROPPO PIENO OUT" },
    { code: 56, label: "CONTROLLO GIRI" },
    { code: 57, label: "ANTISBANDAMENTO SUPERIORE SX" },
    { code: 58, label: "ANTISBANDAMENTO INFERIORE SX" },
    { code: 59, label: "FAULT INVERTER" },
    { code: 60, label: "MANCATA RISPOSTA CONTATTORE FWD" },
    { code: 61, label: "MANCATA RISPOSTA CONTATTORE REV" },
    { code: 62, label: "CONTATTORE BLOCCATO FWD" },
    { code: 63, label: "CONTATTORE BLOCCATO REV" },
    { code: 64, label: "ANTISBANDAMENTO SUPERIORE DX" },
    { code: 65, label: "ANTISBANDAMENTO INFERIORE DX" },
    { code: 66, label: "DISPOSITIVO DI SICUREZZA LOCALE" },
    { code: 67, label: "BLOCCO TERMICO ELETTROVENTOLA" },
    { code: 68, label: "MANCATA RISPOSTA CONTATTORE ELETTROVENTOLA" },
    { code: 103, label: "FERMO IN MANUALE (103)" },
    { code: 104, label: "MODALITA' NON SELEZIONATA" },
    { code: 105, label: "NON ABILITATO" },
    { code: 107, label: "FERMO IN LOCALE" },
    { code: 108, label: "TENTATIVO AVVIAMENTO IN LOCALE" },
    { code: 109, label: "TENTATIVO AVVIAMENTO IN LOCALE REV" },
    { code: 110, label: "AVVIATO IN LOCALE" },
    { code: 111, label: "AVVIATO IN LOCALE REV" },
    { code: 112, label: "FERMO IN MANUALE DA REMOTO" },
    { code: 113, label: "TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO" },
    { code: 114, label: "TENTATIVO AVVIAMENTO IN MANUALE DA REMOTO REV" },
    { code: 115, label: "AVVIATO IN MANUALE DA REMOTO" },
    { code: 116, label: "AVVIATO IN MANUALE DA REMOTO REV" },
    { code: 117, label: "ATTESA START IN AUTOMATICO DA REMOTO" },
    { code: 118, label: "FERMO IN AUTOMATICO DA REMOTO" },
    { code: 119, label: "TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO" },
    { code: 120, label: "TENTATIVO AVVIAMENTO IN AUTOMATICO DA REMOTO REV" },
    { code: 121, label: "AVVIATO IN AUTOMATICO DA REMOTO" },
    { code: 122, label: "AVVIATO IN AUTOMATICO DA REMOTO REV" },
  ];

  // Stati di marcia all'indietro: con alignSts acceso il feedback di marcia va su REV.
  private static readonly REV_STATES: number[] = [7, 9, 13, 14, 15, 17, 19, 21, 23, 109, 111, 114, 116, 120, 122];

  get states(): any[] {
    return TestPlateComponent.STATES;
  }

  // #endregion

  // #region Lettura / scrittura dei tag
  // Le scritture passano da TagsClient.value, esattamente come la pagina Lista Tag:
  // il valore va al server con SetTag e da li' al PLC. Se il valore non cambia non
  // si scrive, per non riempire la coda di scritture inutili a ogni click.

  isOn(tag: TagsClient): boolean {
    if (tag == null)
      return false;
    const value: any = tag.value;
    if (typeof value === "string")
      return value.toLowerCase() == "true" || value == "1";
    return value ? true : false;
  }

  setOn(tag: TagsClient, value: boolean): void {
    if (tag == null)
      return;
    if (this.isOn(tag) == value)
      return;
    tag.value = value;
  }

  toggle(tag: TagsClient): void {
    this.setOn(tag, !this.isOn(tag));
  }

  tagName(tag: TagsClient): string {
    return tag == null ? "-" : tag.name;
  }

  // #endregion

  // #region 1) Parole di stato (DB107 - STATE)

  stateOf(motor: MotorModel): number {
    if (motor == null || motor.STATE == null)
      return null;
    const value = Number(motor.STATE.value);
    return isFinite(value) ? value : null;
  }

  // Unico punto di scrittura dello stato: lo usano la combobox, il campo numerico
  // e i pulsanti rapidi.
  applyState(motor: MotorModel, code: any): void {
    if (motor == null || motor.STATE == null || code == null || code === "")
      return;
    const value = Number(code);
    if (!isFinite(value))
      return;

    if (this.stateOf(motor) != value)
      motor.STATE.value = value;

    if (!this.alignSts)
      return;

    // RUNNING legge la parola di stato appena scritta: la scrittura su TagsClient
    // aggiorna subito il valore locale, quindi qui il motore e' gia' "in marcia".
    const running: boolean = motor.RUNNING;
    const reverse: boolean = running && TestPlateComponent.REV_STATES.indexOf(value) >= 0;

    this.setOn(motor.STS_OUT_FWD, running && !reverse);
    this.setOn(motor.STS_OUT_REV, reverse);
    this.setOn(motor.STS_FWD, running && !reverse);
    this.setOn(motor.STS_REV, reverse);
  }

  applyStateToAll(code: number): void {
    this.filteredMotors.forEach(m => this.applyState(m, code));
  }

  // Colore del badge dello stato attuale, come le etichette del sinottico.
  stateBadgeClass(motor: MotorModel): string {
    if (motor == null)
      return "badge badge-secondary";
    if (motor.OUT_ALARM)
      return "badge badge-danger";
    if (motor.RUNNING)
      return "badge badge-success";
    return "badge badge-secondary";
  }

  // #endregion

  // #region 2) Feedback dei motori (DB105 - STS)

  // I sette bit realmente usati dal modello, nell'ordine del datablock.
  stsTags(motor: MotorModel): TagsClient[] {
    if (motor == null)
      return [];
    return [motor.STS_OUT_FWD, motor.STS_OUT_REV, motor.STS_FWD, motor.STS_REV,
            motor.STS_LIM_FWD, motor.STS_LIM_REV, motor.STS_ALM_CUM];
  }

  resetSts(motor: MotorModel): void {
    this.stsTags(motor).forEach(t => this.setOn(t, false));
  }

  resetAllSts(): void {
    this.filteredMotors.forEach(m => this.resetSts(m));
  }

  // #endregion

  // #region 3) Fotocellule (DB121 - PE)
  // Navetta di carico: le tre fotocellule non sono mai attive insieme, quindi i
  // pulsanti sono esclusivi. "IN TRANSITO" le spegne tutte: e' la condizione in cui
  // il carrello si muove e il sinottico tiene l'ultima posizione nota.

  setShuttle(silo: SiloModel, position: string): void {
    if (silo == null)
      return;
    this.setOn(silo.LS_NCS_FWD, position == "FWD");
    this.setOn(silo.LS_NCS_MID, position == "MID");
    this.setOn(silo.LS_NCS_REV, position == "REV");
  }

  // X-Shuttle di linea: due sole posizioni, e i tag sono condivisi fra due sili
  // (S1,2 e S3,4), quindi il template passa il silo capofila della coppia.

  setXsVirginia(silo: SiloModel, position: string): void {
    if (silo == null)
      return;
    this.setOn(silo.LS_XS_VIRGINIA_FWD, position == "FWD");
    this.setOn(silo.LS_XS_VIRGINIA_REV, position == "REV");
  }

  setXsBurley(silo: SiloModel, position: string): void {
    if (silo == null)
      return;
    this.setOn(silo.LS_XS_BURLEY_FWD, position == "FWD");
    this.setOn(silo.LS_XS_BURLEY_REV, position == "REV");
  }

  xsVirginiaStr(silo: SiloModel): string {
    if (silo == null)
      return "";
    if (silo.XS_VIRGINIA_FWD)
      return "AVANTI";
    if (silo.XS_VIRGINIA_REV)
      return "INDIETRO";
    return "IN TRANSITO";
  }

  xsBurleyStr(silo: SiloModel): string {
    if (silo == null)
      return "";
    if (silo.XS_BURLEY_FWD)
      return "AVANTI";
    if (silo.XS_BURLEY_REV)
      return "INDIETRO";
    return "IN TRANSITO";
  }

  // Coppie di sili che condividono le X-Shuttle: S1 vale per i sili 1-2, S3 per i 3-4.
  // Calcolate una volta sola nel costruttore: se fosse un getter, *ngFor vedrebbe
  // oggetti nuovi a ogni giro di change detection e rifarebbe le righe ogni volta.
  xsPairs: any[] = [];

  private buildXsPairs(): void {
    if (this.silos[0] != null)
      this.xsPairs.push({ label: "Sili 1 e 2", silo: this.silos[0] });
    if (this.silos[2] != null)
      this.xsPairs.push({ label: "Sili 3 e 4", silo: this.silos[2] });
  }

  // #endregion

  // #region Filtro e chiusura

  get filteredMotors(): MotorModel[] {
    const text = (this.filter || "").trim().toUpperCase();
    if (text == "")
      return this.motors;
    return this.motors.filter(m => m.name.toUpperCase().indexOf(text) >= 0
      || (m.description != null && m.description.toUpperCase().indexOf(text) >= 0));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // #endregion

}
