import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  getCurrentDateTime(): string {
    return moment().format('DD-MM-YYYY HH:mm:ss');
  }
}
