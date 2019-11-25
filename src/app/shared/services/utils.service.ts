import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  generateRemoteOrderNo(): string {
    let n = 5; // -> 
    const year = new Date().getFullYear().toString().substr(-2) ;
    let orderNo = new Array(n).join('0').slice(n * -1) + (Math.floor(Math.random() * 99999999) + 1);
    return 'RM' + year + orderNo;
  }

  generateDirectOrderNo(): string {
    let n = 5; // -> 
    const year = new Date().getFullYear().toString().substr(-2) ;
    let orderNo = new Array(n).join('0').slice(n * -1) + (Math.floor(Math.random() * 99999999) + 1);
    return 'DR' + year + orderNo;
  }
}
