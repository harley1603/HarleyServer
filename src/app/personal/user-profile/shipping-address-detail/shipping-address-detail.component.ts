import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddressService } from 'src/app/shared/services/address.service';
import { City } from 'src/app/shared/classes/city';
import { District } from 'src/app/shared/classes/district';
import { Ward } from 'src/app/shared/classes/ward';
import { Address } from 'src/app/shared/classes/address';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
declare var $ : any;

@Component({
  selector: 'app-shipping-address-detail',
  templateUrl: './shipping-address-detail.component.html',
  styleUrls: ['./shipping-address-detail.component.scss']
})
export class ShippingAddressDetailComponent implements OnInit {
  CrudType = CrudType;
  shippingAddressDetailForm: FormGroup;
  cities: City[];
  districts: District[];
  wards: Ward[];
  @Input() title: string;
  @Input() mode: any;
  @Input() selectedAddress: Address;
  @Output() updateData = new EventEmitter<Address>();
  constructor(private formBuilder: FormBuilder, 
    private addressService: AddressService) {
    this.initForm();
    this.bindCity();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.mode === CrudType.CREATE) {
      this.shippingAddressDetailForm.reset();
      this.setValueToFormName('city', '');
      this.setValueToFormName('district', '');
      this.setValueToFormName('ward', '');
    }
    else {
      if (Object.keys(this.selectedAddress).length > 0 ) {
        let cityId = this.cities.find((city) => city.title == this.selectedAddress.city).id;
        this.bindDistrictByCityId(cityId);
        
        if (this.districts) {
          let districtId = this.districts.find((district) => district.title ==  this.selectedAddress.district).id;
          this.bindWardByDistrictId(districtId);
        }
        this.shippingAddressDetailForm.patchValue({
          receiverName: this.selectedAddress.receiverName,
          phoneNumber: this.selectedAddress.phoneNumber,
          city: this.selectedAddress.city,
          district: this.selectedAddress.district,
          ward: this.selectedAddress.ward,
          street: this.selectedAddress.street,
        })
      }
    }
  }

  initForm(): void {
    this.shippingAddressDetailForm = this.formBuilder.group({
      addressName: ['', Validators.required],
      receiverName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      ward: [''],
      street: ['', Validators.required],
    })
  }

  onSelectOption(event, name: string) {
    // console.log(event.target.value);
    switch (name) {
      case 'city':
        let cityId = this.cities.find((city) => city.title == event.target.value).id;
        this.bindDistrictByCityId(cityId);
        this.setValueToFormName('district', '');
        this.setValueToFormName('ward', '');
        break;
      case 'district':
        let districtId = this.districts.find((district) => district.title == event.target.value).id;
        this.bindWardByDistrictId(districtId);
        this.setValueToFormName('ward', '');
        break;
    }
  }

  getValueFromFormName(name: string) {
    return this.shippingAddressDetailForm.controls[name].value;
  }

  setValueToFormName(name: string, value: any){
    return this.shippingAddressDetailForm.controls[name].setValue(value);
  }

  bindCity(){
    this.addressService.getListOfCities().subscribe((cities) => {
      this.cities = Object.keys(cities).map((key) => {
        let temp  = new City();
        temp.id = cities[key].id;
        temp.title = cities[key].name;
        return temp;
      });
      this.cities.sort((a: City, b: City) => a.title.localeCompare(b.title));
    });
  }

  bindDistrictByCityId(cityId: string){
    this.addressService.getListOfDistrictsByCityId(cityId).subscribe((districts) => {
      this.districts = Object.keys(districts).map((key) => {
        let temp  = new District();
        temp.id = districts[key].id;
        temp.title = districts[key].name;
        return temp;
      });
      this.districts.sort((a: District, b: District) => a.title.localeCompare(b.title));
    });
  }

  bindWardByDistrictId(districtId: string){
    this.addressService.getListOfWardsByDistrictId(districtId).subscribe((wards) => {
      this.wards = Object.keys(wards).map((key) => {
        let temp  = new District();
        temp.id = wards[key].id;
        temp.title = wards[key].name;
        return temp;
      });
      this.wards.sort((a: District, b: District) => a.title.localeCompare(b.title));
    });
  }

  saveForm(){
    this.updateData.emit(this.getDataUpload());
    $('#modal-shipping-address').modal('hide');
    this.shippingAddressDetailForm.reset();
  }

  getDataUpload(): Address {
    let data = new Address();
    // let city = this.cities.find( (city) => {
    //   return city.id == this.getValueFromFormName('city');
    // });
    // let cityName = city.title || '';

    // let district = this.districts.find( (district) => {
    //   return district.id == this.getValueFromFormName('district');
    // });
    // let districtName = district.title || '';
    // let ward = this.wards.find( (ward) => {
    //   return ward.id == this.getValueFromFormName('ward');
    // });
    // let wardName = ward.title || '';
    data.addressName = this.getValueFromFormName('addressName');
    data.receiverName = this.getValueFromFormName('receiverName');
    data.phoneNumber = this.getValueFromFormName('phoneNumber');
    data.city = this.getValueFromFormName('city');
    data.district = this.getValueFromFormName('district');
    data.ward = this.getValueFromFormName('ward');
    data.street = this.getValueFromFormName('street');

    return data;
  }
}
