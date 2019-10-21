import { Beverage } from './beverage';
import { Address } from './address';
import { BeverageOrderLine } from './models/beverage-order-line';

export class Order {
    orderNo: string;
    orderType: string;
    status: string;
    customerId: string;
    createdBy: string;
    createdDate: string;
    shipperName: string;
    shippingAddress: Address;
    grandTotal: number;
    orderLines: BeverageOrderLine[];
}
