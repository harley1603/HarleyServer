import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BeverageService {

  constructor(private db: AngularFirestore) { }

  updateBeverage(data: any) {
    return this.db.collection(`/beverage`).doc(data.code).set({
        name: data.name,
        description: data.description || "",
        type: data.type,
        list_of_size: data.listOfSizes ? data.listOfSizes.map((sizeItem) => Object.assign({}, sizeItem)) : {},
      });
  }

  getBeverageByCode(code: string) {
    return this.db.collection('/beverage').doc(code).get();
  }

  getListOfBeverages() {
    return this.db.collection('/beverage').snapshotChanges();
  }


}
