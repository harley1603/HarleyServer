import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  calculateGrandTotal(orderLines: any[]){
    return orderLines.reduce((current, value) => {
      current += value.price * value.quantity;
      return current;
    }, 0);
  }
}
