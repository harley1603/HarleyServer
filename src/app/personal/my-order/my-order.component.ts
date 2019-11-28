import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { Order } from 'src/app/shared/classes/order';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/shared/classes/user';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  CrudType = CrudType;
  headers = ['Order No.', 'Beverage Name', 'Customer Name', 'Amount', 'Status','Created By', 'Created At'];
  orders: Order[] = [];
  orderObject = { 
    selectedOrder: new Order(),
    selectedIndex: -1
  }
  constructor(private router: Router,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private user:User) { }
  
  ngOnInit() {
    this.initOrders();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let userStorage = JSON.parse(localStorage.getItem('user'));
    if(userStorage){
      this.user.setUser(userStorage);
    }
  }
  navigateOrder(mode: string, code?: string) {
    this.router.navigateByUrl(`/personal/my-order/${mode}/${code}`);
  }
  
  navigateNewOrder() {
    this.router.navigateByUrl(`/personal/my-order/create`);
  }
  initOrders() {
    this.spinner.show();
    try {this.orderService.getListOfOrdersbyCustomerID(this.user.uid).subscribe((snapshot: DocumentChangeAction<any>[]) => {
      this.orders = [];
      snapshot.forEach(beverage => {
        let temp = new Order();
        const code = beverage.payload.doc.id;
        const data = beverage.payload.doc.data();
        temp.orderNo = code;
        temp.setOrderDetail(data);
        this.orders.push(temp);
      })
      this.spinner.hide();
    })
      
    } catch (error) {
      console.error(error);
      this.spinner.hide();
    }
    
  }

  selectOrder(order: Order, index: number){
    this.orderObject.selectedOrder = order;
    this.orderObject.selectedIndex = index;
  }

}

