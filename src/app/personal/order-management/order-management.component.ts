import { Component, OnInit } from '@angular/core';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { Order } from 'src/app/shared/classes/order';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  CrudType = CrudType;
  headers = ['Order No.', 'Beverage Name', 'Customer Name', 'Amount', 'Status',,'Created By', 'Created At'];
  orders: Order[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateOrder(mode: string, code?: string) {
    this.router.navigateByUrl(`/personal/order-management/${mode}/${code}`);
  }

  navigateNewOrder() {
    this.router.navigateByUrl(`/personal/order-management/create`);
  }
}
