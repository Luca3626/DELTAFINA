import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

import { MatDialog } from '@angular/material/dialog';
import { MotorPlateComponent } from '../../device-plate/motor-plate/motor-plate.component';
import { MotorRevPlateComponent } from '../../device-plate/motor-rev-plate/motor-rev-plate.component';
import { ValvePlateComponent } from '../../device-plate/valve-plate/valve-plate.component';
import { PidPlateComponent } from '../../device-plate/pid-plate/pid-plate.component';
import { ScalePlateComponent } from '../../device-plate/scale-plate/scale-plate.component';
import { SettingCasingComponent } from '../../device-plate/settingCasing/settingCasing.component';

import { MotorModel } from '../../models/device/motor.models';
import { SiloModel } from '../../models/device/silo.models';
import { DeviceService } from '../../services/device.service';
import { HelpService } from '../../services/help.service';
import { SignalRService } from '../../signalr-client/signalr.service';
import { TagsList } from '../../tags/tags-list';
import { TagsClient } from '../../tags/tags-client';
import { UserService } from '../../services/user.service';
import { ZoneAlarmService } from '../../services/zone-alarm.service';

import { TestPlateComponent } from './test-plate/test-plate.component';   // TEST TEMPORANEO


@Component({
  selector: 'silo-fill', // tslint:disable-line
  templateUrl: './silo-fill.component.html',
  styleUrls: ['silo-fill.css'],
})
export class SiloFillComponent implements OnInit {
  // Stato dello switcher "Mostra Nomi" nel titolo (mostra/nasconde le etichette dei device nel sinottico).
  showName: boolean = true;

  cmdVisible: boolean = true;

  // Apertura del menu "Comandi" nella testata (comandi di zona).
  cmdOpen: boolean = false;

  // #region Pannello impostazioni (ex popup "IMPOSTAZIONI SILOS FILL")
  // Tipo di riempimento dei sili (DB190: V310 globale, V1111..V1114 per silo).
  // Valori scelti nelle combobox, scritti sul PLC dai pulsanti di conferma.
  newFillTypeGlobal: number;
  newFillType: number[] = [];   // indicizzato come siloList.silos (S1..S4)

  // Silo di destinazione delle due linee (DB190: V311 Virginia, V312 Burley).
  newLineSiloVirginia: number;
  newLineSiloBurley: number;
  // #endregion

  constructor(private appService: AppService, private userService: UserService, public dialog: MatDialog, private layoutService: LayoutService, private router: Router) { }

  async ngOnInit() {
    // Precarica gli SVG di stato per evitare flicker al primo cambio di xlink:href
    [SiloFillComponent.CONVEYOR_ON,
     SiloFillComponent.CONVEYOR_ALARM,
     SiloFillComponent.CARRELLO_ON,
     SiloFillComponent.CARRELLO_ALARM].forEach(u => { var i = new Image(); i.src = u; });

    // Le combobox dei pannelli impostazioni partono dal valore gia' scritto sul PLC:
    // cosi' l'operatore vede la selezione corrente e un OK dato senza scegliere nulla
    // non manda un valore vuoto.
    this.newLineSiloVirginia = this.lineSiloOf(this.TagList.VAR_V311);
    this.newLineSiloBurley = this.lineSiloOf(this.TagList.VAR_V312);

    if (this.siloList == null) return;
    this.newFillTypeGlobal = this.siloList.FILL_TYPE_GLOBAL;
    this.siloList.silos.forEach((silo, i) => this.newFillType[i] = silo.FILL_TYPE);
  }

  // #region Immagini di stato conveyor / carrelli feed

  private static readonly CONVEYOR_OFF = "assets/svg/custom/my_belt_conveyor_grey.svg";
  private static readonly CONVEYOR_ON = "assets/svg/custom/my_belt_conveyor_green.svg";
  private static readonly CONVEYOR_ALARM = "assets/svg/custom/my_belt_conveyor_red.svg";
  private static readonly CARRELLO_OFF = "assets/svg/custom/carrello_feed.svg";
  private static readonly CARRELLO_ON = "assets/svg/custom/carrello_feed_green.svg";
  private static readonly CARRELLO_ALARM = "assets/svg/custom/carrello_feed_red.svg";

  private findMotor(name: string): MotorModel {
    if (name == null || name == "") return null;
    return DeviceService.motorList.motors.filter(x => x.name == name)[0];
  }

  getConveyorImg(name: string): string {
    var motor = this.findMotor(name);
    if (motor == null || motor.STATE == null || !motor.RUNNING)
      return SiloFillComponent.CONVEYOR_OFF;
    if (motor.OUT_ALARM != null && motor.OUT_ALARM)
      return SiloFillComponent.CONVEYOR_ALARM;
    return SiloFillComponent.CONVEYOR_ON;
  }

  getCarrelloImg(name: string): string {
    var motor = this.findMotor(name);
    if (motor == null || motor.STATE == null || !motor.RUNNING)
      return SiloFillComponent.CARRELLO_OFF;
    if (motor.OUT_ALARM != null && motor.OUT_ALARM)
      return SiloFillComponent.CARRELLO_ALARM;
    return SiloFillComponent.CARRELLO_ON;
  }

  // #endregion

  // #region Posizione carrelli di carico sili (fotocellule FWD/MID/REV)
  // Le tre fotocellule della navetta (DB121, gruppo PE) non sono mai attive
  // insieme: quando una risponde aggiorna l'ultima posizione nota del carrello,
  // quando non risponde nessuna (carrello in transito) resta valida l'ultima.
  // Il movimento vero e proprio lo fa la transizione CSS su x (silo-fill.css),
  // applicata a entrambe le immagini _ON/_OFF del layer Carrelli.
  // Le x sono uguali per i quattro sili: colonne FWD/MID/REV del disegno.

  // La x e' il bordo sinistro dell'immagine, non il suo centro: il disegno mostra
  // gia' la navetta in posizione avanti, quindi la x di Inkscape (90,958) E' la
  // posizione FWD. Il vecchio valore 128,825 era esattamente 90,958 + 37,868, cioe'
  // meta' della larghezza del carrello (75,735): la navetta finiva mezza sagoma
  // troppo a destra.
  private static readonly CARRELLO_X_FWD: number = 90.958;
  private static readonly CARRELLO_X_MID: number = 144.404;
  private static readonly CARRELLO_X_REV: number = 213.195;
  private static readonly CARRELLO_X_PARK: number = 90.958;  // x del disegno: vale finche' nessuna fotocellula ha ancora risposto (coincide con FWD)

  // Ultima posizione nota di ogni carrello (S1..S4).
  private carrelloX_S1: number = SiloFillComponent.CARRELLO_X_PARK;
  private carrelloX_S2: number = SiloFillComponent.CARRELLO_X_PARK;
  private carrelloX_S3: number = SiloFillComponent.CARRELLO_X_PARK;
  private carrelloX_S4: number = SiloFillComponent.CARRELLO_X_PARK;

  getCarrelloX(silo: SiloModel): number {
    if (silo == null)
      return SiloFillComponent.CARRELLO_X_PARK;

    // Posizione letta adesso dalle fotocellule: null = carrello in transito.
    var x: number = null;
    if (silo.SHUTTLE_FWD)
      x = SiloFillComponent.CARRELLO_X_FWD;
    if (silo.SHUTTLE_MID)
      x = SiloFillComponent.CARRELLO_X_MID;
    if (silo.SHUTTLE_REV)
      x = SiloFillComponent.CARRELLO_X_REV;

    switch (silo.name) {
      case "S1":
        if (x != null) this.carrelloX_S1 = x;
        return this.carrelloX_S1;
      case "S2":
        if (x != null) this.carrelloX_S2 = x;
        return this.carrelloX_S2;
      case "S3":
        if (x != null) this.carrelloX_S3 = x;
        return this.carrelloX_S3;
      case "S4":
        if (x != null) this.carrelloX_S4 = x;
        return this.carrelloX_S4;
    }
    return SiloFillComponent.CARRELLO_X_PARK;
  }

  // Frecce di marcia appoggiate sul carrello: la coppia del carrello (F13, F18, F23,
  // F28) e quella del nastro che ci sta sopra (F12, F17, F22, F27) sono disegnate sulla
  // sagoma della navetta, quindi devono scorrere con lei. Come per le frecce dei nastri
  // di alimentazione non si muove una freccia per volta: nel template stanno in un
  // gruppo ARROW_FWD_REV_SILOn (dentro al layer ARROW_FWD_REV_CARRELLI, che nel disegno
  // sta fra Carrelli e Conveyor_Sotto) e qui si calcola solo la sua traslazione.
  //
  // Il layer ARROW_FWD_REV_CARRELLI ha la stessa matrice del layer Carrelli, quindi la corsa e'
  // la stessa x di getCarrelloX e non serve nessuna conversione: basta la differenza fra
  // la posizione attuale e quella in cui le frecce sono disegnate, cioe' quella in cui
  // e' disegnato il carrello (CARRELLO_X_FWD, vedi il commento delle costanti).
  // La transizione - stessa durata di quella del carrello - e' in silo-fill.css.
  getArrowCarrelloTransform(silo: SiloModel): string {
    const dx: number = this.getCarrelloX(silo) - SiloFillComponent.CARRELLO_X_FWD;
    return "translate(" + dx.toFixed(3) + ",0)";
  }

  // #endregion

  // #region Posizione dei nastri di alimentazione (fotocellule X-Shuttle FWD/REV)
  // I quattro nastri verticali del layer Carrello_Feed - B19C e B20C sulla linea
  // Burley, V12C e V11C su quella Virginia - si spostano fra due sole posizioni,
  // comandate dalle fotocellule di X-Shuttle del silo. Le fotocellule sono in comune:
  // B19c/V12c valgono per i sili 1-2, B20c/V11c per i 3-4, quindi il template passa
  // S1 per la prima coppia di nastri e S3 per la seconda.
  // Stessa logica dei carrelli: quando nessuna delle due fotocellule risponde (nastro
  // in transito) resta valida l'ultima posizione nota, e il movimento lo fa la
  // transizione CSS - piu' lenta di quella dei carrelli, vedi silo-fill.css.
  //
  // Attenzione alla coordinata: le immagini hanno transform="rotate(90)", quindi la
  // posizione verticale a video e' l'attributo x, e il layer ha la sua matrice. La
  // conversione dalla y letta in Inkscape e':
  //     x = (y_inkscape + 18,643254) / 1,1887585
  // Il verso e' quello del silo che il nastro va a servire, e i sili sono incolonnati
  // dal basso: silo 1 in fondo (etichetta a y 176), silo 2 a 130, silo 3 a 74, silo 4
  // in cima a 27. Quindi la x piu' grande e' sempre il silo dispari della coppia.
  //     sili 1-2  FWD = verso Silo 1 (y 149,46 -> x 141,41245)
  //               REV = verso Silo 2 (y 131,47 -> x 126,27818)
  //     sili 3-4  FWD = verso Silo 3 (y  50,46 -> x  58,13397)
  //               REV = verso Silo 4 (y  29,30 -> x  40,32800)
  // 28/08/2026: i due nastri dei sili 1-2 andavano al contrario e sono stati scambiati;
  // quelli dei sili 3-4 erano gia' giusti e non sono stati toccati.

  private static readonly FEED_X_S12_FWD: number = 141.41245;
  private static readonly FEED_X_S12_REV: number = 126.27818;
  private static readonly FEED_X_S34_FWD: number = 58.13397;
  private static readonly FEED_X_S34_REV: number = 40.32800;

  // Ultima posizione nota dei quattro nastri: si parte da dove sono disegnati, cioe'
  // B19C a 141,41245 (verso il silo 1) e gli altri tre nella posizione opposta.
  private feedBurleyX_S12: number = SiloFillComponent.FEED_X_S12_FWD;    // B19C
  private feedBurleyX_S34: number = SiloFillComponent.FEED_X_S34_REV;    // B20C
  private feedVirginiaX_S12: number = SiloFillComponent.FEED_X_S12_REV;  // V12C
  private feedVirginiaX_S34: number = SiloFillComponent.FEED_X_S34_REV;  // V11C

  // I sili 1-2 usano la prima coppia di posizioni, i 3-4 la seconda.
  private static isFirstPair(silo: SiloModel): boolean {
    return silo.name == "S1" || silo.name == "S2";
  }

  // Linea Burley: nastro B19C (sili 1-2) e nastro B20C (sili 3-4).
  getFeedBurleyX(silo: SiloModel): number {
    if (silo == null)
      return SiloFillComponent.FEED_X_S12_FWD;

    const first = SiloFillComponent.isFirstPair(silo);

    // Posizione letta adesso dalle fotocellule: null = nastro in transito.
    var x: number = null;
    if (silo.XS_BURLEY_FWD)
      x = first ? SiloFillComponent.FEED_X_S12_FWD : SiloFillComponent.FEED_X_S34_FWD;
    if (silo.XS_BURLEY_REV)
      x = first ? SiloFillComponent.FEED_X_S12_REV : SiloFillComponent.FEED_X_S34_REV;

    if (first) {
      if (x != null) this.feedBurleyX_S12 = x;
      return this.feedBurleyX_S12;
    }
    if (x != null) this.feedBurleyX_S34 = x;
    return this.feedBurleyX_S34;
  }

  // Linea Virginia: nastro V12C (sili 1-2) e nastro V11C (sili 3-4).
  getFeedVirginiaX(silo: SiloModel): number {
    if (silo == null)
      return SiloFillComponent.FEED_X_S12_REV;   // posizione del disegno

    const first = SiloFillComponent.isFirstPair(silo);

    var x: number = null;
    if (silo.XS_VIRGINIA_FWD)
      x = first ? SiloFillComponent.FEED_X_S12_FWD : SiloFillComponent.FEED_X_S34_FWD;
    if (silo.XS_VIRGINIA_REV)
      x = first ? SiloFillComponent.FEED_X_S12_REV : SiloFillComponent.FEED_X_S34_REV;

    if (first) {
      if (x != null) this.feedVirginiaX_S12 = x;
      return this.feedVirginiaX_S12;
    }
    if (x != null) this.feedVirginiaX_S34 = x;
    return this.feedVirginiaX_S34;
  }

  // #endregion

  // #region Posizione delle frecce di marcia dei nastri di alimentazione
  // Le frecce del layer Arrows_FWD-REV_Carrello_Feed poggiano sui quattro nastri
  // verticali, quindi devono scorrere insieme a loro: se si muove solo il nastro le
  // frecce restano indietro. Ogni gruppo ARROW_FWD_REV_* tiene le quattro frecce di
  // un nastro (due posizioni lungo il nastro, ognuna nella versione FWD e REV), e si
  // sposta tutto insieme: basta quindi ricalcolare la traslazione verticale della
  // matrice del gruppo, non le x/y delle singole frecce.
  //
  // La matrice e' la stessa per tutti e quattro i gruppi tranne l'ultimo termine:
  //     matrix(1.1887585, 0, 0, 1.1887585, -33.838367, ty)
  // e quel ty e' una traslazione in unita' del documento, perche' il layer non ha
  // trasformazioni proprie. I valori sono ricavati dal disegno: il gruppo del V12C e'
  // disegnato in posizione FWD, gli altri tre in REV, e la corsa misurata e' 17,462
  // unita' per i nastri dei sili 1-2 e 20,638 per quelli dei sili 3-4.
  //   frecce del B19C (gruppo F07)  FWD  -0,66388   REV -18,12588
  //   frecce del V12C (gruppo F04)  FWD  -0,66438   REV -18,12638
  //   frecce del B20C (gruppo F09)  FWD   2,51127   REV -18,12673
  //   frecce del V11C (gruppo F02)  FWD   5,30678   REV -15,33122
  // 28/08/2026: scambiate quelle di B19C e V12C insieme al loro nastro, perche' la ty
  // di ogni verso deve restare accoppiata alla x che il nastro assume in quel verso.
  // Le fotocellule interrogate sono le stesse che muovono il nastro (X-Shuttle della
  // linea), quindi nastro e frecce cambiano posizione nello stesso istante e la
  // transizione CSS - stessa durata - li fa arrivare insieme.

  private static readonly ARROW_MATRIX: string = "matrix(1.1887585,0,0,1.1887585,-33.838367,";

  private static readonly ARROW_TY_B19C_FWD: number = -0.66388;
  private static readonly ARROW_TY_B19C_REV: number = -18.12588;
  private static readonly ARROW_TY_V12C_FWD: number = -0.66438;
  private static readonly ARROW_TY_V12C_REV: number = -18.12638;
  private static readonly ARROW_TY_B20C_FWD: number = 2.51127;
  private static readonly ARROW_TY_B20C_REV: number = -18.12673;
  private static readonly ARROW_TY_V11C_FWD: number = 5.30678;
  private static readonly ARROW_TY_V11C_REV: number = -15.33122;

  // Ultima posizione nota dei quattro gruppi (valore iniziale = quello del disegno).
  private arrowTyBurley_S12: number = SiloFillComponent.ARROW_TY_B19C_FWD;
  private arrowTyBurley_S34: number = SiloFillComponent.ARROW_TY_B20C_REV;
  private arrowTyVirginia_S12: number = SiloFillComponent.ARROW_TY_V12C_REV;
  private arrowTyVirginia_S34: number = SiloFillComponent.ARROW_TY_V11C_REV;

  private static arrowMatrix(ty: number): string {
    return SiloFillComponent.ARROW_MATRIX + ty.toFixed(5) + ")";
  }

  // Frecce sui nastri della linea Burley: B19C (sili 1-2) e B20C (sili 3-4).
  getArrowBurleyTransform(silo: SiloModel): string {
    if (silo == null)
      return SiloFillComponent.arrowMatrix(SiloFillComponent.ARROW_TY_B19C_FWD);

    const first = SiloFillComponent.isFirstPair(silo);

    // null = nastro in transito: resta valida l'ultima posizione nota.
    var ty: number = null;
    if (silo.XS_BURLEY_FWD)
      ty = first ? SiloFillComponent.ARROW_TY_B19C_FWD : SiloFillComponent.ARROW_TY_B20C_FWD;
    if (silo.XS_BURLEY_REV)
      ty = first ? SiloFillComponent.ARROW_TY_B19C_REV : SiloFillComponent.ARROW_TY_B20C_REV;

    if (first) {
      if (ty != null) this.arrowTyBurley_S12 = ty;
      return SiloFillComponent.arrowMatrix(this.arrowTyBurley_S12);
    }
    if (ty != null) this.arrowTyBurley_S34 = ty;
    return SiloFillComponent.arrowMatrix(this.arrowTyBurley_S34);
  }

  // Frecce sui nastri della linea Virginia: V12C (sili 1-2) e V11C (sili 3-4).
  getArrowVirginiaTransform(silo: SiloModel): string {
    if (silo == null)
      return SiloFillComponent.arrowMatrix(SiloFillComponent.ARROW_TY_V12C_REV);   // posizione del disegno

    const first = SiloFillComponent.isFirstPair(silo);

    var ty: number = null;
    if (silo.XS_VIRGINIA_FWD)
      ty = first ? SiloFillComponent.ARROW_TY_V12C_FWD : SiloFillComponent.ARROW_TY_V11C_FWD;
    if (silo.XS_VIRGINIA_REV)
      ty = first ? SiloFillComponent.ARROW_TY_V12C_REV : SiloFillComponent.ARROW_TY_V11C_REV;

    if (first) {
      if (ty != null) this.arrowTyVirginia_S12 = ty;
      return SiloFillComponent.arrowMatrix(this.arrowTyVirginia_S12);
    }
    if (ty != null) this.arrowTyVirginia_S34 = ty;
    return SiloFillComponent.arrowMatrix(this.arrowTyVirginia_S34);
  }

  // #endregion

  // #region Liste device (alimentate in tempo reale da SignalR)

  get TagList(): TagsList {
    return SignalRService.tagList;
  }

  get motorList() {
    return DeviceService.motorList;
  }

  get valveList() {
    return DeviceService.valveList;
  }

  get pidList() {
    return DeviceService.pidList;
  }

  get scaleList() {
    return DeviceService.scaleList;
  }

  get siloList() {
    return DeviceService.siloList;
  }

  // #endregion

  // #region Popup device (click sugli elementi SVG, identificati da inkscape:label)

  openMotorDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("MOTOR_", "").replace("_MOTOR", "");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (motorDev == null) return; // device non (ancora) registrato in MotorList
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(MotorPlateComponent, {
        id: name,
        width: '400px',
        data: { motor: motorDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  // Motori bidirezionali (IOList, colonna "Bidirezionale"): stesso contratto
  // dell'altro popup, cambia solo il plate aperto (marcia FWD e REV separate).
  openMotorRevDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("MOTOR_", "").replace("_MOTOR", "");
    if (name != null) {
      var motorDev = DeviceService.motorList.motors.filter(x => x.name == name)[0];
      if (motorDev == null) return; // device non (ancora) registrato in MotorList
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(MotorRevPlateComponent, {
        id: name,
        width: '400px',
        data: { motor: motorDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  openValveDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_VALVE", "");
    if (name != null) {
      var valveDev = DeviceService.valveList.valves.filter(x => x.name == name.toString())[0];
      if (valveDev == null) return; // device non (ancora) registrato in ValveList
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 350, 330);
      const dialogRef = this.dialog.open(ValvePlateComponent, {
        id: name,
        width: '350px!important',
        data: { valve: valveDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  // Bottoni PID del sinottico: sono pulsanti HTML, quindi il nome del loop arriva come
  // parametro invece di essere letto dall'inkscape:label come fa il resto del disegno.
  openPidDialog(name: string, event): void {
    if (name != null) {
      var pidDev = DeviceService.pidList.pids.filter(x => x.name == name.toString())[0];
      if (pidDev == null) return; // loop non (ancora) registrato in PidList
      if (this.dialog.getDialogById(name) != null) return;
      // Popup largo: si apre centrato invece che sul punto di click, che a questa
      // larghezza lo manderebbe fuori schermo. Resta trascinabile dal titolo.
      const dialogRef = this.dialog.open(PidPlateComponent, {
        id: name,
        width: '1000px',
        maxWidth: '95vw',
        panelClass: 'plate-dialog',
        data: { pid: pidDev },
        hasBackdrop: false
      });
    }
  }

  openScaleDialogBySVG(event): void {
    var name = event.currentTarget.attributes["inkscape:label"].value.replace(".", "_").replace("LBL_", "").replace("_Unity", "").replace("_Weight", "").replace("_PERC", "");
    if (name != null) {
      var scaleDev = DeviceService.scaleList.scales.filter(x => x.name == name.toString())[0];
      if (scaleDev == null) return; // device non (ancora) registrato in ScaleList
      if (this.dialog.getDialogById(name) != null) return;
      var position = HelpService.getPositionBySvgElement(event, 400, 330);
      const dialogRef = this.dialog.open(ScalePlateComponent, {
        id: name,
        width: '350px!important',
        data: { scale: scaleDev },
        hasBackdrop: false,
        position: {
          top: position.top.toString() + 'px', left: position.left.toString() + 'px'
        }
      });
    }
  }

  // Non piu' richiamato dal template: il contenuto di "IMPOSTAZIONI SILOS FILL" e' ora
  // sempre visibile nel sinottico (vedi la region "Pannello impostazioni" qui sotto).
  // Resta qui per poter rimettere il pulsante nel titolo con una riga sola.
  openSettingsDialog() {
    this.dialog.open(SettingCasingComponent, {
      width: '1200px',
      height: '900px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'wide-dialog',
      data: { title: 'IMPOSTAZIONI SILOS FILL' },
      hasBackdrop: true,
      disableClose: false,
    });
  }

  // #endregion

  // #region Pannello impostazioni - tipo di riempimento silos
  // Stessa logica del popup SettingCasingComponent da cui il pannello e' stato spostato:
  // log del cambio parametro e poi scrittura sul PLC.

  onFillTypeGlobalConfirm(): void {
    if (this.newFillTypeGlobal == null) return;
    try { this.userService.logParameterTagValues("SILOS FILL: setpoint tipo di riempimento globale silos", this.siloList.SET_FILL_TYPE_GLOBAL, this.newFillTypeGlobal, "", this.appService.user); } catch (e) { }
    this.siloList.FILL_TYPE_GLOBAL = this.newFillTypeGlobal;
  }

  // Il setpoint del singolo silo lo prende in carico il PLC solo con il globale a zero.
  onFillTypeConfirm(index: number): void {
    var silo = this.siloList.silos[index];
    if (silo == null || this.newFillType[index] == null) return;
    try { this.userService.logParameterTagValues("SILOS FILL: setpoint tipo di riempimento " + silo.description, silo.SET_FILL_TYPE, this.newFillType[index], "", this.appService.user); } catch (e) { }
    silo.FILL_TYPE = this.newFillType[index];
  }

  // Silo di destinazione delle due linee (DB190: V311 Virginia, V312 Burley).
  // Stesso contratto dei setpoint di riempimento: si sceglie nella combobox e si
  // conferma con l'OK, log del parametro e poi scrittura.

  onLineSiloVirginiaConfirm(): void {
    this.setLineSilo(this.TagList.VAR_V311, "Virginia", this.newLineSiloVirginia);
  }

  onLineSiloBurleyConfirm(): void {
    this.setLineSilo(this.TagList.VAR_V312, "Burley", this.newLineSiloBurley);
  }

  private setLineSilo(tag: TagsClient, linea: string, silo: number): void {
    if (tag == null || silo == null) return;
    try { this.userService.logParameterTagValues("SILOS FILL: silo da riempire con linea " + linea, tag, silo, "", this.appService.user); } catch (e) { }
    tag.value = silo;
  }

  // Valore corrente del setpoint, null se non e' fra 0 e 4: cosi' la combobox parte
  // vuota invece di agganciarsi a un valore che non ha opzione. Lo 0 e' "nessun silo",
  // cioe' il fermo riempimento della linea, ed e' un'opzione come le altre.
  private lineSiloOf(tag: TagsClient): number {
    if (tag == null) return null;
    const value = Number(tag.value);
    return (value >= 0 && value <= 4) ? value : null;
  }

  // #endregion

  // #region Comandi di zona (DB120 - FROM_HMI)
  // Stessa logica della dashboard: la zona 3.1 ha due bit toggle,
  // State_off_ON (0=stop, 1=start) e Mode_mn_AUT (0=man, 1=AUT).
  // Il tag arriva dal template: log del parametro e poi scrittura.
  private setZoneBool(tag: TagsClient, descrizione: string, valore: boolean): void {
    if (tag == null) return;
    try { this.userService.logParameterTagValues(descrizione, tag, valore, "", this.appService.user); } catch (e) { }
    tag.value = valore;
  }

  onZoneMode(tag: TagsClient, zona: string, aut: boolean): void {
    this.setZoneBool(tag, zona + ": modo " + (aut ? "automatico" : "manuale"), aut);
  }

  onZoneState(tag: TagsClient, zona: string, start: boolean): void {
    this.setZoneBool(tag, zona + ": " + (start ? "start" : "stop"), start);
  }
  // #endregion

  // #region Navigazione verso le pagine collegate (label zona nel sinottico)

  // "Zona 1.0 Virginia Infeed"
  goToZone1_0(): void {
    this.router.navigate(['/zona-1-0']);
  }

  // "Zona 2.1 Burley Line"
  goToZone2_1(): void {
    this.router.navigate(['/zona-2-1']);
  }

  // #endregion

  // #region Allarmi e feedback di zona (DB121 - TO_HMI)
  // Stessi bit che fanno lampeggiare il riquadro della zona sulla dashboard: la
  // condizione sta in services/zone-alarm.service.ts, qui ci sono solo le scorciatoie per il
  // template. MOL_nok = scatto termico cumulativo, DAC_ok a 0 = sezionatore aperto.
  readonly ZONA: string = "3_1";

  molAlarm(): boolean {
    return ZoneAlarmService.molAlarm(this.ZONA);
  }

  dacAlarm(): boolean {
    return ZoneAlarmService.dacAlarm(this.ZONA);
  }

  // Quadro MCC della zona senza tensione (bit mCC*_SS_ok del DB121, logica invertita).
  mccAlarm(): boolean {
    return ZoneAlarmService.mccAlarm(this.ZONA);
  }

  // La zona 3.1 ha un All_ON per silo (S1..S4), non uno solo per la zona.
  siloOn(silo: number): boolean {
    return ZoneAlarmService.siloAllOn(silo);
  }

  // #endregion

  // #region TEST TEMPORANEO - popup di forzatura tag
  // Il pulsante "TEST" nella testata apre una finestra di prova da cui si scrivono
  // le parole di stato dei motori (DB107), i loro feedback (DB105) e le fotocellule
  // dei sili (DB121), senza dover andare su /settings/tag-list. Il popup non ha
  // backdrop e si trascina dal titolo, cosi' le animazioni restano visibili.
  //
  // DA RIMUOVERE A FINE TEST (cercare "TEST TEMPORANEO"):
  //   - questa region e l'import di TestPlateComponent qui sopra
  //   - il pulsante TEST in silo-fill.component.html
  //   - le righe marcate in silo-fill.module.ts
  //   - la cartella silos/silo-fill/test-plate

  // Motori disegnati nel sinottico: sono quelli citati in silo-fill.component.html.
  private static readonly TEST_MOTORS: string[] = [
    "F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10",
    "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20",
    "F21", "F22", "F23", "F24", "F25", "F26", "F27", "F28", "F29", "F30",
    "F34", "B46"
  ];

  openTestDialog(): void {
    if (this.dialog.getDialogById("TEST_SILO_FILL") != null) return;
    this.dialog.open(TestPlateComponent, {
      id: "TEST_SILO_FILL",
      width: '980px',
      maxWidth: '95vw',
      panelClass: 'plate-dialog',
      data: {
        motorNames: SiloFillComponent.TEST_MOTORS,
        silos: this.siloList != null ? this.siloList.silos : []
      },
      hasBackdrop: false,
      position: { top: '64px', right: '16px' }
    });
  }

  // #endregion

}
