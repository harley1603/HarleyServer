import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generateOrderNo(): string {
    let n = 7; // -> 
    const year = new Date().getFullYear().toString().substr(-2) ;
    let orderNo = new Array(n).join('0').slice(n * -1) + (Math.floor(Math.random() * 99999999) + 1);
    return year + orderNo;
  }
}
