import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/shared/enums/utils';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/classes/user';
import { ROLE } from 'src/app/shared/enums/role.enum';
import { Address } from 'src/app/shared/classes/address';
import { OptionType } from 'src/app/shared/enums/option-type.enum';
import { BeverageService } from 'src/app/shared/services/beverage.service';
import { Beverage } from 'src/app/shared/classes/beverage';
import { BeverageOrderLine } from 'src/app/shared/classes/models/beverage-order-line';
import { BeverageSize } from 'src/app/shared/classes/models/beverage-size';
import { Order } from 'src/app/shared/classes/order';
import { TimeService } from 'src/app/shared/services/time.service';
import { CalculationService } from 'src/app/shared/services/calculation.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/shared/services/utils.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  CrudType = CrudType;
  OptionType = OptionType;
  orderLinesHeader = ['Beverage Code', 'Beverage Name', 'Size', 'Quantity', 'Price', 'Amount'];
  orderForm: FormGroup;
  beverageInputForm: FormGroup;
  mode: number;
  title: string;
  orderTypes = [
    'Direct',
    'Remote'
  ];
  customers: User[];
  shippingAddresses: Address[];
  beverages: Beverage[];
  beverageSizes: BeverageSize[];
  orderLines: BeverageOrderLine[] = [];
  errorForm = false;
  constructor(private location: Location, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService,
    private beverageService: BeverageService,
    private user: User,
    private timeService: TimeService,
    private calculationService: CalculationService,
    private orderService: OrderService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.initForm();
    this.initCustomer();
    this.initBeverages();
    this.route.params.subscribe(params => {
      if (params.mode == Utils.PATH_UPDATE) {
        this.mode = CrudType.UPDATE;
        this.title = CrudType.UPDATE_TITLE
        this.initData(params.id);
      } else if (params.mode == Utils.PATH_VIEW) {
        this.mode = CrudType.VIEW;
        this.initData(params.id);
      } else {
        this.mode = CrudType.CREATE;
        this.title = CrudType.ADD_TITLE;
        this.orderForm.patchValue({
          status: 'Unhandled'
        })
      }
    });
  }

  initForm(): void {
    this.orderForm = this.formBuilder.group({
      orderNo: ['', Validators.required],
      orderType: ['', Validators.required],
      customerId: ['', Validators.required],
      shippingAddressId: ['', Validators.required],
      phone: [''],
      receiverName: [''],
      fullShippingAddress: [''],
      handledBy: ['', Validators.required],
      status: [''],
      addressName: ['', Validators.required],
    });

    this.beverageInputForm = this.formBuilder.group({
      beverageCode: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  initData(id: string): void {
    this.spinner.show();
    this.orderService.getOrderById(id).subscribe(order => {
      // const id = order.orderNo;
      // const value = order;
      const id = order.payload.id;
      const value = order.payload.data() as Order;
      let customerId = value.customerId; 
      this.orderForm.patchValue({
        orderNo: id,
        orderType: value.orderType,
        customerId: customerId,
        addressName: value.shippingAddress ? value.shippingAddress.addressName : '',
        fullShippingAddress: value.shippingAddress ? this.getFullShippingAddress(value.shippingAddress) : '',
        handledBy: value.handledBy,
        status: value.status
      });
      this.bindShippingAddresses(customerId);
      this.orderLines = value.orderLines ? value.orderLines : [];
      this.spinner.hide();
    })
  }

  initCustomer(): void {
    this.userService.getListOfUsers().subscribe((users) => {
      this.customers = [];
      users.forEach(user => {
        let data = user.payload.doc.data();
        let id = user.payload.doc.id;
        let tempUser = new User();
        tempUser.setUserDetail(data);
        tempUser.uid = id;
        if (tempUser.user_role && tempUser.user_role === ROLE.CUSTOMER) {
          this.customers.push(tempUser);
        }
      })
    })
  }

  initBeverages(){
    this.beverageService.getListOfBeverages().subscribe(beverages => {
      this.beverages = [];
      beverages.forEach(beverage => {
        let data = beverage.payload.doc.data();
        let id = beverage.payload.doc.id;
        let tempBeverage = new Beverage();
        tempBeverage.code = id;
        tempBeverage.setBeverageDetail(data);
        this.beverages.push(tempBeverage);
      });
      this.beverages.sort((a,b) => a.name > b.name ? 1 : -1)
    })
  }

  back(): void {
    this.location.back();
  }

  onSelectOption(event, name) {
    switch (name) {
      case OptionType.CUSTOMER:
        let customerId = this.getValueFromOrderForm('customerId');
        this.bindShippingAddresses(customerId);
        this.orderForm.patchValue({
          addressName: null,
          fullShippingAddress: null
        })
        break;
      case OptionType.SHIPPING_ADDRESS:
        let addressName = this.getValueFromOrderForm('addressName');
        const shippingAddress = this.getShippingAddress(addressName);
        if (shippingAddress) {
          let receiver = shippingAddress.receiverName;
          let phone = shippingAddress.phoneNumber;
          let fullAddress = this.getFullShippingAddress(shippingAddress);
          this.setValueToFormControl('fullShippingAddress', fullAddress);
        }
        break;
      case OptionType.BEVERAGE:
        let beverageCode = this.getValueFromBeverageInputForm('beverageCode');
        const beverage = this.getBeverageByCode(beverageCode);
        this.beverageSizes = beverage.listOfSizes;
      default:
        break;
    }
  }

  getValueFromOrderForm(name: string) {
    return this.orderForm.controls[name].value;
  }


  setValueToFormControl(name: string, value: any) {
    this.orderForm.controls[name].setValue(value);
  }

  getValueFromBeverageInputForm(name: string) {
    return this.beverageInputForm.controls[name].value;
  }

  bindShippingAddresses(customerId: string) {
    const customer = this.customers.find(customer => customer.uid === customerId);
    this.shippingAddresses = [];
    this.shippingAddresses = customer ? customer.shipping_address : [];
  }

  getShippingAddress(addressName: string) {
    return this.shippingAddresses.find(address => addressName === address.addressName);
  }

  getFullShippingAddress(shippingAddress: Address) {
    let ward = shippingAddress.ward ? ', ' + shippingAddress.ward : '';
    return shippingAddress.street + ward + "," + shippingAddress.district + "," + shippingAddress.city;
  }
  getBeverageByCode(beverageCode: string) {
    return this.beverages.find(beverage => beverage.code === beverageCode);
  }

  addOrderLine(): void {
    if (this.beverageInputForm.invalid) {
      this.errorForm  = true;
      return;
    }

    //Prepare Order Line Data
    let beverageCode = this.getValueFromBeverageInputForm('beverageCode');
    const beverage = this.getBeverageByCode(beverageCode);
    let beverageOrderLine = new BeverageOrderLine();
    beverageOrderLine.beverageCode = beverageCode;
    beverageOrderLine.beverageName = beverage.name;
    const size = this.getValueFromBeverageInputForm('size');
    const beverageSize = beverage.listOfSizes.find(beverageSize => beverageSize.size === size);
    beverageOrderLine.size = size;
    beverageOrderLine.quantity = this.getValueFromBeverageInputForm('quantity');
    beverageOrderLine.price = beverageSize.price;

    this.orderLines.push(beverageOrderLine);
  }

  save(): void {
    this.spinner.show();
    let data = this.getDataUpload();
    switch (this.mode) {
      case CrudType.CREATE:
        data.orderNo = this.utilsService.generateOrderNo();
        this.orderService.updateOrder(data).then(result => {
          this.spinner.hide();
          this.toastr.success('Create Order successfully');
          this.location.back();
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error('Error has occured. Please try again.');
          console.error(err);
        });
        break;
      case CrudType.UPDATE:
        this.orderService.updateOrder(data).then(result => {
          this.spinner.hide();
          this.toastr.success('Updated Order successfully', 'Order Management');
          this.location.back();
        }).catch(err => {
          this.spinner.hide();
          this.toastr.error('Error has occured. Please try again.');
          console.error(err);
        })
      default:
        break;
    }
  }

  getDataUpload(): Order {
    let data = new Order();
    let orderType = this.getValueFromOrderForm('orderType');
    if (orderType === 'Remote') {
      data.orderNo = this.getValueFromOrderForm('orderNo');
      data.orderType = orderType;
      data.status = 'Unhandled';
      data.createdBy = this.user.display_name;
      data.createdDate = this.timeService.getCurrentDateTime();
      let customerId = this.getValueFromOrderForm('customerId');
      data.customerId = customerId;
      data.customer = this.customers.find(customer => customer.uid === customerId);
      data.grandTotal = this.calculationService.calculateGrandTotal(this.orderLines);
      data.orderLines = this.orderLines;
      data.shipperName = 'Nghiên';
      const addressName = this.getValueFromOrderForm('addressName');
      data.shippingAddress = this.getShippingAddress(addressName);
    }
    return data;
  }

  handleOrder() {
    const orderNo = this.getValueFromOrderForm('orderNo');
    const user = this.user;
    this.orderService.handleOrder(orderNo, user).then(() => {
      this.toastr.info('Handling order...');
    }).catch(err => {
      this.toastr.error('Error has occurred. Please check again');
      console.error(err);
    })
  }

  deliverOrder(): void {
    const orderNo = this.getValueFromOrderForm('orderNo');
    const user = this.user;
    this.orderService.deliverOrder(orderNo, user).then(() => {
      this.toastr.info('Delivering order...');
    }).catch(err => {
      this.toastr.error('Error has occurred. Please check again');
      console.error(err);
    })
  }
}
