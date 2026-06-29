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

}
