//import { Component } from '@angular/core';
//import { AppService } from '../app.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { FileUploader } from 'ng2-file-upload';

import { timer } from 'rxjs';
import { AlarmModel, AlarmQueryModel } from '../models/alarm.models';
import { ResultIntValue } from '../models/help.models';
import { DosingService } from '../services/dosing.service';
import { Router } from '@angular/router';
import { now } from 'moment';
import { DosingDetailModel, DosingWorkshiftTotalizerModel } from '../models/dosing.models';
import { MatEndDate } from '@angular/material/datepicker';

@Component({
  selector: 'dosings', // tslint:disable-line
  templateUrl: './dosings.component.html',
  styles: [`
    :host ::ng-deep .ngx-charts text {
      fill: #4a4a4a;
    }
    :host ::ng-deep .ngx-charts-outer ngx-charts-legend-entry > .active {
      color: #4a4a4a;
    }
  `, `
    .dark-style :host ::ng-deep .ngx-charts text { fill: #a0aabe; }
    .dark-style :host ::ng-deep .ngx-charts .tooltip-anchor { fill: rgb(255, 255, 255); }
    .dark-style :host ::ng-deep .ngx-charts .gridline-path { stroke: #2f3646; }
    .dark-style :host ::ng-deep .ngx-charts .refline-path { stroke: #455066; }
    .dark-style :host ::ng-deep .ngx-charts .reference-area { fill: #fff; }
    .dark-style :host ::ng-deep .ngx-charts .grid-panel.odd rect { fill: rgba(255, 255, 255, 0.05); }
    .dark-style :host ::ng-deep .ngx-charts .number-card p { color: #f0f1f6; }
    .dark-style :host ::ng-deep .ngx-charts .gauge .background-arc path { fill: #2f3646; }
    .dark-style :host ::ng-deep .ngx-charts .gauge .gauge-tick path { stroke: #a0aabe; }
    .dark-style :host ::ng-deep .ngx-charts .gauge .gauge-tick text { fill: #a0aabe; }
    .dark-style :host ::ng-deep .ngx-charts .linear-gauge .background-bar path { fill: #2f3646; }
    .dark-style :host ::ng-deep .ngx-charts .linear-gauge .units { fill: #72809b; }
    .dark-style :host ::ng-deep .ngx-charts .timeline .brush-background { fill: rgba(255, 255, 255, 0.05); }
    .dark-style :host ::ng-deep .ngx-charts .timeline .brush .selection {
    .dark-style :host ::ng-deep .ngx-charts   fill: rgba(255, 255, 255, 0.1);
    .dark-style :host ::ng-deep .ngx-charts   stroke: #aaa;
    .dark-style :host ::ng-deep .ngx-charts }
    .dark-style :host ::ng-deep .ngx-charts .polar-chart .polar-chart-background { fill: rgb(30, 34, 46); }
    .dark-style :host ::ng-deep .chart-legend .legend-labels { background: rgba(255, 255, 255, 0.05) !important; }
    .dark-style :host ::ng-deep .chart-legend .legend-item:hover { color: #fff; }
    .dark-style :host ::ng-deep .chart-legend .legend-label:hover { color: #fff !important; }
    .dark-style :host ::ng-deep .chart-legend .legend-label .active .legend-label-text { color: #fff !important; }
    .dark-style :host ::ng-deep .chart-legend .scale-legend-label { color: #a0aabe; }
    .ngx-charts-outer { width:100%!important }
  `]
})
export class DosingsComponent {

  colors = {
    domain: ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514']
  };

  singleDataOrigin = [{
    name: 'Germany',
    value: 40632
  }, {
    name: 'United States',
    value: 49737
  }, {
    name: 'France',
    value: 36745
  }, {
    name: 'United Kingdom',
    value: 36240
  }, {
    name: 'Spain',
    value: 33000
  }, {
    name: 'Italy',
    value: 35800
  }];

  multiDataOrigin = [{
    name: 'Germany',
    series: [{
      name: '1990',
      value: 31476
    }, {
      name: '2000',
      value: 36953
    }, {
      name: '2010',
      value: 40632
    }]
  }, {
    name: 'United States',
    series: [{
      name: '1990',
      value: 37060
    }, {
      name: '2000',
      value: 45986
    }, {
      name: '2010',
      value: 49737
    }]
  }, {
    name: 'France',
    series: [{
      name: '1990',
      value: 29476
    }, {
      name: '2000',
      value: 34774
    }, {
      name: '2010',
      value: 36745
    }]
  }, {
    name: 'United Kingdom',
    series: [{
      name: '1990',
      value: 26424
    }, {
      name: '2000',
      value: 32543
    }, {
      name: '2010',
      value: 36240
    }]
  }];

  dosingsData: DosingDetailModel[] = [];
  originalDosingsData: DosingDetailModel[] = [];

  dosingsWorkshiftTotalizerData: DosingWorkshiftTotalizerModel[] = [];
  originalDosingsWorkshiftTotalizerData: DosingWorkshiftTotalizerModel[] = [];

  query: AlarmQueryModel = new AlarmQueryModel();
  modelFrom: NgbDateStruct;
  modelTo: NgbDateStruct;

  useFilter: boolean;
  sortBy = 'id';
  sortDesc = true;
  perPage = 18;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  //numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1
  numbers: Array<number>;

  dosingQuery;

  today;
  yesterday;
  dateRange;
  dateFrom: Date;
  dateTo: Date;

  dosingMode = true;
  totalizerMode = false;


  singleData = [];
  multiData = [];
  autoScale: boolean;
  yScaleMin: number;
  yScaleMax: number;
  materialList = [];
  showChart: boolean;
  showChart_Workshift: boolean;


  onShowDosingMode() {
    this.dosingMode = true;
    this.totalizerMode = false;
  }

  onShowTotalizerMode() {
    this.dosingMode = false;
    this.totalizerMode = true;
  }

  private countDestinations(): void {
    // Inizializza i contatori a 0. Faccio così perché, nel
    // caso in cui dosingsData_New si null, i contatori sono
    // inizializzati a 0. Prima non era così ed in console
    // avevo errore undefined su dosingsData_New
    this.tf1Count = 0;
    this.tf2Count = 0;

    // Controllo se dosingsData_New è null/undefined o non è un array
    if (!this.dosingsData_New) {
      return; // Esce immediatamente mantenendo i contatori a 0
    }

    // Mappa per tenere traccia dei conteggi
    const destinationCounts = new Map<string, number>();

    // Scansiona tutti i dati processati
    this.dosingsData_New.forEach(item => {
      // Controllo aggiuntivo per sicurezza sull'item
      if (!item) return;

      // Cerca solo le righe di totale con destinazione TF1/TF2
      if (item.material === "TOTALI MISCELA CON ROTTAME" &&
        (item.silo === "TF1" || item.silo === "TF2")) {
        destinationCounts.set(item.silo, (destinationCounts.get(item.silo) || 0) + 1);
      }
    });

    // Assegna i valori ai contatori
    this.tf1Count = destinationCounts.get("TF1") || 0;
    this.tf2Count = destinationCounts.get("TF2") || 0;
  }


  constructor(private appService: AppService, calendar: NgbCalendar, private dosingService: DosingService, public router: Router) {
    this.appService.pageTitle = 'Dosings';
    this.loadData();
  }

  public getRequestedQuantity(dosing: DosingDetailModel): string {

    let rValue: number = 0;

    if (dosing.silo == "TF1" || dosing.silo == "TF2")
      rValue = dosing.requestedQuantityInMix;
    else if (dosing.material == "TOTALI MISCELA")
      rValue = dosing.requestedQuantityInMix;
    else
      rValue = (dosing.requestedQuantityInMix * dosing.repetitionInMix) + (dosing.requestedQuantityNoMix * dosing.repetitionNoMix);

    return rValue.toFixed(1);
  }

  onKey(event: any) {

    if (event.target.name == 'fNumber')
      this.dosingQuery = event.target.value;

    this.update();
  }

  onToday() {
    this.today = true;
    this.yesterday = false;
    this.dateRange = false;

    this.loadData();
  }

  onYesterday() {
    this.today = false;
    this.yesterday = true;
    this.dateRange = false;

    this.loadDataYesterday();
  }

  onRange() {
    this.today = false;
    this.yesterday = false;
    this.dateRange = true;
  }

  async onRangeSearch() {
    let fromDate: Date = new Date(this.dateFrom);
    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 6, 0, 0, 0);
    let toDate: Date = new Date(this.dateTo);
    toDate = new Date(toDate.getTime() + (1000 * 60 * 60 * 24));
    toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 5, 59, 59, 999);

    this.originalDosingsData = await this.dosingService.getDetailListByRange(fromDate, toDate);
    this.update();
  }

  async loadDataYesterday() {
    let currDate: Date = new Date(Date.now());

    let fromDate: Date = new Date(currDate.getTime() - 1 * (1000 * 60 * 60 * 24));
    fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 6, 0, 0, 0);
    let toDate: Date = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 5, 59, 59, 999);

    this.originalDosingsData = await this.dosingService.getDetailListByRange(fromDate, toDate);
    this.update();
  }

  async loadData() {
    this.today = true;        // Queste tre variabili booleane controllano quale opzione 
    this.yesterday = false;   // è attiva nella UI (oggi, ieri, intervallo di date). Qui 
    this.dateRange = false;   // viene selezionata la modalità "oggi".

    // Viene creata una variabile currDate con l’orario attuale,
    // utilizzata come base per calcolare l’intervallo temporale
    // del turno.
    let currDate: Date = new Date(Date.now());

    // Calcolo dell'orario di inizio. Viene inizialmente impostata la fromDate
    // a 24 ore prima dell’orario attuale: currDate.getTime() restituisce il
    // timestamp attuale in millisecondi. 1000 * 60 * 60 * 24 è il numero di
    // millisecondi in 24 ore(= 86.400.000). Quindi: currDate.getTime() - 86400000
    // è l’orario di esattamente 24 ore fa.
    // Questo valore viene passato al costruttore new Date(...), ottenendo un
    // oggetto Date che rappresenta ieri alla stessa ora di adesso.
    // Perché lo fa? Serve come base temporanea per poter poi accedere alla data
    // di ieri (utile se siamo prima delle 6: 00 e il turno è iniziato il giorno
    // prima).
    // È solo un valore di partenza. Poi però vedi sotto...
    let fromDate: Date = new Date(currDate.getTime() - (1000 * 60 * 60 * 24));

    // Se l’ora attuale è maggiore o uguale a 6 (cioè dopo le 6 del mattino),
    // allora imposta fromDate come anno, mese e giorno di oggi e ora alle 6:00:00.000.
    // Quindi, se siamo dopo le 6 del mattino, il turno inizia oggi alle 6:00.
    if (currDate.getHours() >= 6)
      fromDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), 6, 0, 0, 0);
    // Se l’ora attuale è prima delle 6, allora usa la fromDate calcolata prima
    // (cioè ieri alla stessa ora), E la imposta su ieri alle 6:00:00.000.
    // Quindi, se siamo prima delle 6 del mattino, il turno attuale è ancora
    // quello di ieri, iniziato ieri alle 6: 00.
    else if (currDate.getHours() < 6)
      fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 6, 0, 0, 0);


    let toDate: Date = new Date(currDate.getTime());
    if (currDate.getHours() >= 6)
      toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999);
    else if (currDate.getHours() < 6)
      toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 5, 59, 59, 999);

    //DETTAGLIO DOSAGGI
    this.originalDosingsData = await this.dosingService.getDetailListByRange(fromDate, toDate);

    //TOTALI DOSAGGI DI TURNO
    this.dosingsWorkshiftTotalizerData = await this.dosingService.getWorkshiftTotalizerListByRange(fromDate, toDate);


    this.update();
  }

  tf1Count: number = 0;
  tf2Count: number = 0;
  globalTotalDosedInMix = 0;
  globalTotalDosed = 0;
  dosingsData_New: Array<DosingDetailModel>;
  update() {
    const data = this.applyFilters();
    this.totalItems = data.length;
    //this.sort(data);
    this.dosingsData = data;
    this.globalTotalDosedInMix = 0;
    this.globalTotalDosed = 0;
    this.tf1Count = 0;
    this.tf2Count = 0;

    if (this.dosingsData != null && this.dosingsData.length > 0) {

      let totalDosedQuantity = 0;
      let totalDosedQuantityNoRottame = 0;
      let totalRequestedQuantityDosaggio: number = 0;
      let totalRequestedQuantityDosaggioInMix: number = 0;
      let destination = "";
      let recipe = "";
      let endDate: Date;
      let totalDosRow: DosingDetailModel = new DosingDetailModel();
      let totalDosRowNoRottame: DosingDetailModel = new DosingDetailModel();
      this.dosingsData_New = new Array<DosingDetailModel>();
      let numAct: number = this.dosingsData[0].number;


      //DETTAGLIO DOSAGGI
      let hasRows: boolean = false;
      for (var j = 0; j < this.dosingsData.length; j++) {
        if (this.dosingsData[j].number == numAct) {
          hasRows = true;

          this.dosingsData_New.push(this.dosingsData[j]);         

          // CALCOLO QUANTITA' RICHIESTE E QUANTITA' DOSATE
          // Se non ricordo male dovrebbe funzionare così:
          // ● La quantità richiesta rappresenta il valore
          //   teorico, che è stato previsto all'inizio del
          //   processo di dosaggio e che dovrebbe essere
          //   dosato secondo la ricetta o comunque secondo
          //   le istruzioni date a monte del processo.
          if (this.dosingsData[j].siloCode == "T4A" || this.dosingsData[j].siloCode == "T4B") {
            totalRequestedQuantityDosaggio += ((this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix)) / 1000;
            totalDosedQuantity += this.dosingsData[j].dosedQuantity / 1000;
          }
          else {
            totalRequestedQuantityDosaggio += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
            totalDosedQuantity += this.dosingsData[j].dosedQuantity;
          }

          destination = this.dosingsData[j].destionation;
          recipe = this.dosingsData[j].recipe;
          endDate = this.dosingsData[j].endDate;

          // CALCOLO QUANTITA' SENZA ROTTAME
          if (this.dosingsData[j].silo != "S1" && this.dosingsData[j].silo != "S2") {
            if (this.dosingsData[j].siloCode == "T4A" || this.dosingsData[j].siloCode == "T4B") {
              totalRequestedQuantityDosaggioInMix += ((this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix)) / 1000;
              totalDosedQuantityNoRottame += this.dosingsData[j].dosedQuantity / 1000;   // quantità calcolata in tonnellate
            }
            else {
              totalRequestedQuantityDosaggioInMix += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
              totalDosedQuantityNoRottame += this.dosingsData[j].dosedQuantity;          // quantità lasciata in chili
            }

            //totalDosedQuantityNoRottame += this.dosingsData[j].dosedQuantity;
            //totalRequestedQuantityDosaggioInMix += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
          }

          if (this.dosingsData[j].siloProgressiveId == 118) {

            this.globalTotalDosedInMix += totalDosedQuantityNoRottame;

            totalDosRowNoRottame = new DosingDetailModel();
            totalDosRowNoRottame.material = "TOTALI MISCELA";
            totalDosRowNoRottame.dosedQuantity = totalDosedQuantityNoRottame;
            totalDosRowNoRottame.requestedQuantityInMix = totalRequestedQuantityDosaggioInMix;
            totalDosRowNoRottame.number = numAct;
            totalDosRowNoRottame.silo = "";
            totalDosRowNoRottame.unity = "KG";
            totalDosRowNoRottame.recipe = recipe;
            totalDosRowNoRottame.endDate = endDate;

            this.dosingsData_New.push(totalDosRowNoRottame);
          }
        }
        if (this.dosingsData[j].number != numAct || j == this.dosingsData.length - 1) {
          //Aggiungo la riga dei totali
          if (hasRows) {

            this.globalTotalDosed += totalDosedQuantity;

            totalDosRow = new DosingDetailModel();
            totalDosRow.material = "TOTALI MISCELA CON ROTTAME";
            totalDosRow.dosedQuantity = totalDosedQuantity;
            totalDosRow.requestedQuantityInMix = totalRequestedQuantityDosaggio;
            totalDosRow.number = numAct;
            totalDosRow.silo = destination;
            totalDosRow.unity = "KG";
            totalDosRow.recipe = recipe;
            totalDosRow.endDate = endDate;

            this.dosingsData_New.push(totalDosRow);
          }

          totalDosedQuantity = 0;
          totalDosedQuantityNoRottame = 0;

          totalRequestedQuantityDosaggio = 0;
          totalRequestedQuantityDosaggioInMix = 0;

          destination = "";
          recipe = "";
          endDate = null;

          if (j != this.dosingsData.length - 1) {
            numAct = this.dosingsData[j].number;
            hasRows = true;

            //totalDosedQuantity += this.dosingsData[j].dosedQuantity;
            //totalRequestedQuantityDosaggio += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
            if (this.dosingsData[j].siloCode == "T4A" || this.dosingsData[j].siloCode == "T4B") {
              totalRequestedQuantityDosaggio += ((this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix) / 1000);
              totalDosedQuantity += this.dosingsData[j].dosedQuantity / 1000;
            }
            else {
              totalRequestedQuantityDosaggio += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
              totalDosedQuantity += this.dosingsData[j].dosedQuantity;
            }

            destination = this.dosingsData[j].destionation;
            recipe = this.dosingsData[j].recipe;
            endDate = this.dosingsData[j].endDate;

            this.dosingsData_New.push(this.dosingsData[j]);

            if (this.dosingsData[j].silo != "S1" && this.dosingsData[j].silo != "S2") {
              if (this.dosingsData[j].siloCode == "T4A" || this.dosingsData[j].siloCode == "T4B") {
                totalRequestedQuantityDosaggioInMix += ((this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix)) / 1000;
                totalDosedQuantityNoRottame += this.dosingsData[j].dosedQuantity / 1000;
              }
              else {
                totalRequestedQuantityDosaggioInMix += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
                totalDosedQuantityNoRottame += this.dosingsData[j].dosedQuantity;
              }

              //totalRequestedQuantityDosaggioInMix += (this.dosingsData[j].requestedQuantityInMix * this.dosingsData[j].repetitionInMix) + (this.dosingsData[j].requestedQuantityNoMix * this.dosingsData[j].repetitionNoMix);
              //totalDosedQuantityNoRottame += this.dosingsData[j].dosedQuantity;
            }
            if (this.dosingsData[j].siloProgressiveId == 118) {

              this.globalTotalDosedInMix += totalDosedQuantityNoRottame;

              totalDosRowNoRottame = new DosingDetailModel();
              totalDosRowNoRottame.material = "TOTALI MISCELA";
              totalDosRowNoRottame.dosedQuantity = totalDosedQuantityNoRottame;
              totalDosRowNoRottame.requestedQuantityInMix = totalRequestedQuantityDosaggioInMix;
              totalDosRowNoRottame.number = numAct;
              totalDosRowNoRottame.silo = "";
              totalDosRowNoRottame.unity = "KG";
              totalDosRowNoRottame.recipe = recipe;
              totalDosRowNoRottame.endDate = endDate;

              this.dosingsData_New.push(totalDosRowNoRottame);
            }
          }
        }
      }

      //Cerco di ordinare le righe di dosaggio facendo prima vedere le materie che vanno nel mix,
      //poi il totale miscelata, poi il rottame ed infine il totale con il rottame
      let arrayTmp: any[] = [];
      let rowS1: DosingDetailModel;
      let rowS2: DosingDetailModel;
      this.dosingsData_New.forEach(x => {
        if (x.silo == "S1")
          rowS1 = x;
        else if (x.silo == "S2")
          rowS2 = x;
        else if (x.silo == "" && x.material == "TOTALI MISCELA") {
          arrayTmp.push(x);
          arrayTmp.push(rowS1);
          arrayTmp.push(rowS2);
        }
        else {
          arrayTmp.push(x);
        }
      });
      this.dosingsData_New = arrayTmp;

      //TOTALIZZATORI DI GIORNATA
      this.dosingsData.forEach(item => {
        let result = this.materialList.filter(x => x.key == item.siloCode + "_" + item.material);
        if (!result || result.length == 0)
          this.materialList.push({ material: item.material, siloCode: item.siloCode, key: item.siloCode + "_" + item.material });
      });
      //Costruisco le serie
      this.singleData = [];
      this.materialList.forEach(item => {
        let result: DosingDetailModel[] = this.dosingsData.filter(x => x.material == item.material && x.siloCode == item.siloCode);
        let total: number = 0;
        result.forEach(dos => {
          total += dos.dosedQuantity;
        });

        if (result != null && result.length > 0) {
          //let points: any = { name: item, value: total };

          //const maxValue = points.reduce((oa, u) => Math.max(oa, u.value), 0);
          //const minValue = points.reduce((ya, u) => Math.min(ya, u.value), Number.MAX_VALUE);

          this.singleData.push({
            name: item.siloCode != "T4A" && item.siloCode != "T4B" ? item.material + " " + item.siloCode + " (ton)" : item.material + " " + item.siloCode + " (Kg)", //item.material + " (" + item.siloCode + ")",
            value: total > 0 ? (total / 1000).toFixed(2) : 0//item.siloCode != "T4A" && item.siloCode != "T4B" ? total / 1000 : total
          });
          //this.multiData.push({
          //  name: item,//result[0].description + " (" + result[0].unit + ")",
          //  //series: points,
          //  value: total//points
          //});
        }
      });


    //  //TOTALIZZATORI DI TURNO
    //let materialListMulti = [];
    //this.dosingsWorkshiftTotalizerData.forEach(item => {
    //  if (!materialListMulti.includes(item.material))
    //    materialListMulti.push(item.material);
    //});    

    ////Costruisco le serie
    //let tmpData = [];
    //this.materialList.forEach(item => {
    //  let result: DosingWorkshiftTotalizerModel[] = this.dosingsWorkshiftTotalizerData.filter(x => x.material == item.material);
    //  //let total: number = 0;
    //  result.forEach(dos => {
    //    tmpData.push({ material: dos.material, workshift: dos.workshift, totalDosed: dos.totalDosedQuantity });
    //  });
    //  //tmpData.push({ material: item.material, siloCode: item.siloCode, totalDosed: total });
    //  //tmpData.push({ material: item.material, workshift: item.workshift, totalDosed: item.totalDosedQuantity });
    //});

    //this.multiData = [];
    //materialListMulti.forEach(item => {
    //  let subSeries = [];
    //  tmpData.forEach(subItem => {
    //    if (subItem.material == item) {
    //      subSeries.push({ name: subItem.workshift, value: subItem.totalDosed });
    //    }
    //  });
    //  this.multiData.push({
    //    name: item, series: subSeries
    //  });
    //});



    //let materialListMulti = [];
    //this.dosingsData.forEach(item => {
    //  if (!materialListMulti.includes(item.material))
    //    materialListMulti.push(item.material);
    //});    

    ////Costruisco le serie
    //let tmpData = [];
    //this.materialList.forEach(item => {
    //  let result: DosingDetailModel[] = this.dosingsData.filter(x => x.material == item.material && x.siloCode == item.siloCode);
    //  let total: number = 0;
    //  result.forEach(dos => {
    //    total += dos.dosedQuantity;
    //  });

    //  tmpData.push({ material: item.material, siloCode: item.siloCode, totalDosed: total });
    //});

    //this.multiData = [];
    //materialListMulti.forEach(item => {
    //  let subSeries = [];
    //  tmpData.forEach(subItem => {
    //    if (subItem.material == item) {
    //      subSeries.push({ name: subItem.siloCode, value: subItem.totalDosed });
    //    }
    //  });
    //  this.multiData.push({
    //    name: item, series: subSeries
    //  });
    //});


    }
    this.countDestinations();
  }

  showCycle() {
    this.showChart = false;
    this.showChart_Workshift = false;
  }

  showGraphic() {
    this.showChart = true;
    this.showChart_Workshift = false;
  }

  showGraphicWorkshift() {
    this.showChart = false;
    this.showChart_Workshift = true;
  }


  getRowCustomStyle(index): string {
    //var remainder19 = (index + 1) % 20;
    if (this.dosingsData_New[index].silo == "TF1" || this.dosingsData_New[index].silo == "TF2")
      return "background-color:black;color:white;font-weight:bold";
    else if (this.dosingsData_New[index].material == "TOTALI MISCELA")
      return "background-color:gray;color:white;font-weight:bold";
    else if (this.dosingsData_New[index].silo == "S1" || this.dosingsData_New[index].silo == "S2" || this.dosingsData_New[index].silo == "R1_R2" || this.dosingsData_New[index].silo == "T25" || this.dosingsData_New[index].silo == "TRAMOGGIA ROTTAMI")
      return "background-color:darkgray;color:white;font-weight:bold";

    //var remainder19 = (index + 1) % 19;
    //if (this.dosingsData_New[index].silo == "T26" || this.dosingsData_New[index].silo == "T27")
    //  return "background-color:black;color:white;font-weight:bold";
    //else if (this.dosingsData_New[index].material == "TOTALI MISCELA")
    //  return "background-color:gray;color:white;font-weight:bold";
    //else if (this.dosingsData_New[index].silo == "S12" || this.dosingsData_New[index].silo == "S13" || this.dosingsData_New[index].silo == "T24" || this.dosingsData_New[index].silo == "T25" || this.dosingsData_New[index].silo == "TRAMOGGIA ROTTAMI")
    //  return "background-color:darkgray;color:white;font-weight:bold";
  }

  //getIs15thRow(index): boolean {
  //  var remainder = (index + 1) % 15;
  //  if (remainder == 0 && index != 0)
  //    return true;
  //  else
  //    return false;
  //}

  //getIsEndRow(index): boolean {
  //  var remainder = (index + 1) % 19;
  //  if (remainder == 0 && index != 0)
  //    return true;
  //  else
  //    return false;
  //}

  applyFilters() {
    let tempArray: Array<any> = [];
    let isOk: boolean;
    for (let c of this.originalDosingsData) {

      isOk = true;

      if (this.dosingQuery != null && this.dosingQuery != "" && c.number != this.dosingQuery)
        isOk = false;

      if (isOk)
        tempArray.push(c);
    }

    return tempArray;
  }

  sort(data: any) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) { return this.sortDesc ? 1 : -1; }
      if (a > b) { return this.sortDesc ? -1 : 1; }
      return 0;
    });
  }

  paginate(data: any) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key: any) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }

    this.currentPage = 1;
    this.applyFilters();
  }

  get totalPages() {
    if (this.dosingsData != null && this.dosingsData.length > 0)
      return this.dosingsData[0].number;
    else
      return 0;

    //return Math.ceil(this.totalItems / this.perPage);
  }

}
