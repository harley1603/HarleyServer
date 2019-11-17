import { Beverage } from './beverage';
import { Address } from './address';
import { BeverageOrderLine } from './models/beverage-order-line';
import { User } from './user';

export class Order {
    orderNo: string;
    orderType: string;
    status: string;
    customerId: string;
    customer: User;
    createdBy: string;
    createdDate: string;
    handledBy: string;
    handledDate: string;
    shipperName: string;
    shippingAddress: Address;
    grandTotal: number;
    orderLines: BeverageOrderLine[];

    setOrderDetail(order: any) {
        this.orderType =  order.orderType;
        this.status =  order.status;
        this.customerId =  order.customerId;
        this.customer = order.customer;
        this.createdBy =  order.createdBy;
        this.createdDate =  order.createdDate;
        this.shipperName =  order.shipperName;
        this.shippingAddress =  order.shippingAddress;
        this.grandTotal =  order.grandTotal;
        this.orderLines =  order.orderLines;
    }
}
