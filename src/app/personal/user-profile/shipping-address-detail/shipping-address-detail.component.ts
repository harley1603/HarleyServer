import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-address-detail',
  templateUrl: './shipping-address-detail.component.html',
  styleUrls: ['./shipping-address-detail.component.scss']
})
export class ShippingAddressDetailComponent implements OnInit {
  shippingAddressDetailForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.shippingAddressDetailForm = this.formBuilder.group({
      receiverName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      street: ['', Validators.required],
    })
  }

}
