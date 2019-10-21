import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  updateOrder(order: Order) {
    return this.db.collection('/order').add({
      orderType: order.orderType,
      status: order.status,
      createdBy: order.createdBy,
      createdDate: order.createdDate,
      customerId: order.customerId,
      grandTotal: order.grandTotal,
      orderLines: order.orderLines.map(orderLine => Object.assign({}, orderLine)) ,
      shipperName: order.shipperName,
      shippingAddress: Object.assign({}, order.shippingAddress)
    });
  }
}
