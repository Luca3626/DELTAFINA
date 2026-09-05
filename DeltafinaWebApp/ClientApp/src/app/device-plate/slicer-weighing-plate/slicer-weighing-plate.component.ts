import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { SlicerWeighingModel } from 'src/app/models/slicer-weighing.models';
import { SlicerWeighingService } from 'src/app/services/slicer-weighing.service';

// Registro delle pesate casse di una linea slicer (tabella SlicerWeighings, scritta da
// SlicerWeighingTask a ogni cassa che passa dal nastro pesatore).
//
// Il popup e' aperto dalla finestra produzione delle pagine slicer e riceve la linea in
// data: { lineCode, line }. Virginia vede solo "VSL" e Burley solo "BSL", il filtro di
// linea non e' scegliibile dall'operatore.
//
// I filtri "Dal"/"Al" sono giornate produttive (la giornata comincia alle 06:00, come nei
// totalizzatori di turno), non istanti di registrazione: una cassa pesata all'una di notte
// resta nella giornata del giorno prima. Le date viaggiano verso il server come
// "aaaa-mm-gg", quindi non c'e' un fuso orario che sposti gli estremi.
@Component({
  selector: 'slicer-weighing-plate',
  templateUrl: './slicer-weighing-plate.component.html',
  styleUrls: ['slicer-weighing-plate.css'],
})
export class SlicerWeighingPlateComponent implements OnInit {

  // Estremi del filtro, come nella pagina Allarmi: NgbDateStruct legato al datepicker.
  dateFrom: NgbDateStruct;
  dateTo: NgbDateStruct;

  displayMonths = 1;

  weighings: SlicerWeighingModel[] = [];

  // Stato della richiesta: serve a distinguere "sto caricando" da "nessuna pesata".
  loading: boolean = false;
  loadError: string = null;

  constructor(private slicerWeighingService: SlicerWeighingService,
    private calendar: NgbCalendar,
    public dialogRef: MatDialogRef<SlicerWeighingPlateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // Si apre sulla giornata di oggi: e' il caso d'uso normale a bordo macchina.
    this.dateFrom = this.calendar.getToday();
    this.dateTo = this.calendar.getToday();
  }

  async ngOnInit() {
    await this.loadData();
  }


  get lineCode(): string {
    return this.data != null ? this.data.lineCode : null;
  }

  get line(): string {
    return this.data != null ? this.data.line : null;
  }


  // #region Caricamento dati

  // NgbDateStruct -> "aaaa-mm-gg" (il formato che si aspetta il controller).
  private toQueryDate(date: NgbDateStruct): string {
    if (date == null) return null;

    var month: string = date.month < 10 ? "0" + date.month : date.month.toString();
    var day: string = date.day < 10 ? "0" + date.day : date.day.toString();

    return date.year + "-" + month + "-" + day;
  }

  async loadData() {

    var dateFrom: string = this.toQueryDate(this.dateFrom);
    var dateTo: string = this.toQueryDate(this.dateTo);

    if (this.lineCode == null || dateFrom == null || dateTo == null) return;

    this.loading = true;
    this.loadError = null;

    try {
      this.weighings = await this.slicerWeighingService.getWeighings(this.lineCode, dateFrom, dateTo);
    } catch (e) {
      this.weighings = [];
      this.loadError = "Lettura del registro non riuscita.";
    }

    this.loading = false;
  }

  async onSearch() {
    await this.loadData();
  }

  // #endregion


  // #region Riepilogo dell'intervallo filtrato

  get count(): number {
    return this.weighings != null ? this.weighings.length : 0;
  }

  get totalWeight(): number {
    if (this.weighings == null) return 0;

    var total: number = 0;
    for (let w of this.weighings)
      total = total + (w.weight != null ? w.weight : 0);

    return total;
  }

  get averageWeight(): number {
    if (this.count == 0) return 0;
    return this.totalWeight / this.count;
  }

  // #endregion


  // {C1500} Virginia / {C1000} Burley: 0 = continuo, 1 = singolo.
  cutModeTxt(value: boolean): string {
    return value ? "SINGOLO" : "CONTINUO";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
