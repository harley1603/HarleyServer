import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  getOrderById(id: string) {
    return this.db.collection('/order').doc(id).get();
  }

  updateOrder(order: Order) {
    return this.db.collection('/order').add({
      orderType: order.orderType,
      status: order.status,
      createdBy: order.createdBy,
      createdDate: order.createdDate,
      customerId: order.customerId,
      customer: Object.assign({}, order.customer),
      grandTotal: order.grandTotal,
      orderLines: order.orderLines.map(orderLine => Object.assign({}, orderLine)) ,
      shipperName: order.shipperName,
      shippingAddress: Object.assign({}, order.shippingAddress)
    });
  }

  getListOfOrders(){
    return this.db.collection('/order').snapshotChanges();
  }
}
