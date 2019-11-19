import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore, private timeService: TimeService) { }

  getOrderById(id: string) {
    return this.db.collection('/order').doc(id).snapshotChanges();
  }

  createOrder(order: Order) {
    return this.db.collection('/order').doc(order.orderNo).set({
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

  updateOrder(order: Order) {
    let ward = order.shippingAddress.ward ? ', ' + order.shippingAddress.ward : '';
    let fullAddress = order.shippingAddress.street + ward + "," + order.shippingAddress.district + "," + order.shippingAddress.city;
    return this.db.collection('/order').doc(order.orderNo).set({
      orderType: order.orderType,
      status: order.status,
      createdBy: order.createdBy,
      createdDate: order.createdDate,
      customerId: order.customerId,
      customer: Object.assign({}, order.customer),
      grandTotal: order.grandTotal,
      orderLines: order.orderLines.map(orderLine => Object.assign({}, orderLine)) ,
      shipperName: order.shipperName,
      shippingAddress: Object.assign({}, order.shippingAddress),
      shippingInformation: {
        receiver: order.customer.display_name,
        phone: order.customer.phone,
        address: fullAddress,
        shippingDate: order.createdDate
      }
    });
  }

  handleOrder(orderNo: string, user: User) {
    return this.db.collection('/order').doc(orderNo).update({
      handledBy: user.display_name,
      handledDate: this.timeService.getCurrentDateTime(),
      status: 'Handling'
    });
  }

  deliverOrder(orderNo: string, user: User) {
    return this.db.collection('/order').doc(orderNo).update({
      shipperName: user.display_name,
      status: 'Delivering'
    })
  }

  getListOfOrders(){
    return this.db.collection('/order').snapshotChanges();
  }

  doneOrder(orderNo: string, user: User) {
    return this.db.collection('/order').doc(orderNo).update({
      status: 'Paid'
    })
  }
}
