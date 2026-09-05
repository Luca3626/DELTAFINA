import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';

@Injectable()
export class HelpService {

  constructor() { }

  public static getPositionByElement(elRef: any): any {
    var x = elRef.offsetWidth;
    var y = 0;
    while (elRef && !isNaN(elRef.offsetLeft) && !isNaN(elRef.offsetTop)) {
      x += elRef.offsetLeft - elRef.scrollLeft;
      y += elRef.offsetTop - elRef.scrollTop;
      elRef = elRef.offsetParent;
    }
    return { top: y, left: x };
  }

  public static getPositionBySvgElement(elRef: any, width: any, height: any): any {

    var x = elRef.pageX;
    if (x + width > 1900)
      x = x - width;

    var y = elRef.pageY;
    if (y + height > 1000)
      y = y - height;

    return { top: y, left: x };
  }

  public static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Ricompone un REAL del PLC scritto su due word consecutive di un DB di Int
  // (i totalizzatori dei misuratori di portata sul DB190: V336+V337, V338+V339,
  // V343+V344). La prima word e' la parte alta, come dice lo scambio dati, e le
  // word arrivano dal server come INT16 con segno: vanno riportate a 16 bit senza
  // segno prima di rileggere i quattro byte come float IEEE754 big endian.
  public static realFromWords(high: any, low: any): number {
    if (high == null || low == null) return null;
    var view = new DataView(new ArrayBuffer(4));
    view.setUint16(0, Number(high) & 0xFFFF);
    view.setUint16(2, Number(low) & 0xFFFF);
    return view.getFloat32(0);
  }

}
