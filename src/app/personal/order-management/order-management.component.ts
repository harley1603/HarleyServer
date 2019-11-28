import { Component, OnInit } from '@angular/core';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { Order } from 'src/app/shared/classes/order';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  CrudType = CrudType;
  headers = ['Order No.', 'Order Type', 'Customer Name', 'Amount', 'Status','Created By', 'Created At'];
  orders: Order[] = [];
  orderObject = { 
    selectedOrder: new Order(),
    selectedIndex: -1
  }
  constructor(private router: Router,
    private orderService: OrderService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initOrders();
  }

  navigateOrder(mode: string, code?: string) {
    this.router.navigateByUrl(`/personal/order-management/${mode}/${code}`);
  }

  navigateNewOrder() {
    this.router.navigateByUrl(`/personal/order-management/create`);
  }

  initOrders() {
    this.spinner.show();
    this.orderService.getListOfOrders().subscribe((snapshot: DocumentChangeAction<any>[]) => {
      this.orders = [];
      snapshot.forEach(beverage => {
        let temp = new Order();
        const code = beverage.payload.doc.id;
        const data = beverage.payload.doc.data();
        temp.orderNo = code;
        temp.setOrderDetail(data);
        this.orders.push(temp);
        this.spinner.hide();
      })
    })
  }

  selectOrder(order: Order, index: number){
    this.orderObject.selectedOrder = order;
    this.orderObject.selectedIndex = index;
  }
}
