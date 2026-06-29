import { Injectable } from '@angular/core';
declare var $: any;

//import { saveAs } from 'file-saver';

@Injectable()
export class CsvDataService {

  static exportToCsv(filename: string, rows: object[], separator: string = ',', showHeader: boolean = true) {
    if (!rows || !rows.length) {
      return;
    }
    //const separator = ',';
    const keys = Object.keys(rows[0]);

    let csvContent: string = "";

    if (showHeader) {
      csvContent = csvContent +
        keys.join(separator) +
        '\n';
    }
    csvContent =
      csvContent +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    //const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel' });
    const blob = new Blob([csvContent], { type: 'text/csv' }); //;charset=utf-8;
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      //saveAs(blob, filename);
    }
  }
}
