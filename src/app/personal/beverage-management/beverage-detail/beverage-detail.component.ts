import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/shared/enums/utils';
import { CrudType} from 'src/app/shared/enums/crud-type.enum'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Beverage } from 'src/app/shared/classes/beverage';
import { BeverageService } from 'src/app/shared/services/beverage.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
@Component({
  selector: 'app-beverage-detail',
  templateUrl: './beverage-detail.component.html',
  styleUrls: ['./beverage-detail.component.scss']
})
export class BeverageDetailComponent implements OnInit {
  CrudType = CrudType;
  mode: number;
  title: string;
  beverageForm: FormGroup;
  beverageSizeForm: FormGroup;
  typeOfBeverage = [
    "Milk Tea",
    "Tea",
    "Smoothie",
    "Coffee"
  ];
  sizeOfBeverages = [
    "M",
    "L",
  ]
  sizeHeaders = ['Size', 'Price', 'Amount Of Sugar'];
  isError = false;
  listOfSizes = [];
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private beverageService: BeverageService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.initForm();
    this.initFormSize();
    this.route.params.subscribe(params => {
      if (params.mode == Utils.PATH_UPDATE) {
        this.mode = CrudType.UPDATE;
        this.title = CrudType.UPDATE_TITLE
        this.initData(params.code);
      } else if (params.mode == Utils.PATH_VIEW) {
        this.mode = CrudType.VIEW;
        this.initData(params.code);
      } else {
        this.mode = CrudType.CREATE;
        this.title = CrudType.ADD_TITLE
      }
    });
  }

  initForm() {
    this.beverageForm = this.formBuilder.group({
      beverageCode: ['', Validators.required],
      beverageName: ['', Validators.required],
      description: [''],
      type: ['', Validators.required]
    })
  }

  initFormSize() {
    this.beverageSizeForm = this.formBuilder.group({
      size: ['', Validators.required],
      price: ['', Validators.required],
      amountOfSugar: ['']
    });
  }


  initData(code: string) {
    this.spinner.show();
    this.beverageService.getBeverageByCode(code).subscribe(beverage => {
      const value = beverage.data();
      this.beverageForm.patchValue({
        beverageCode: beverage.id,
        beverageName: value.name,
        description: value.description,
        type: value.type 
      });
      this.listOfSizes = value.list_of_size || [];
      this.spinner.hide();
    })
  }
  saveBeverage(): void {
    if (this.beverageForm.invalid) {
      this.isError = true;
      return;
    }
    this.spinner.show();
    let data = this.getDataUpload();
    this.beverageService.updateBeverage(data).then(result => {
      this.spinner.hide();
      this.toastr.success( "Updated beverage successfully!");
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
    })
  }

  getDataUpload(): any {
    let data = new Beverage();
    data.code = this.getValueFromFormName('beverageCode');
    data.name = this.getValueFromFormName('beverageName');
    data.description = this.getValueFromFormName('description');
    data.type = this.getValueFromFormName('type');
    data.listOfSizes = this.listOfSizes;
    return data;
  }

  getValueFromFormName(name: string): any {
    return this.beverageForm.controls[name].value;
  }

  getValueFromSizeFormName(name: string): any {
    return this.beverageSizeForm.controls[name].value;
  }
  addNewSize(): void {
    let data = {
      size: this.getValueFromSizeFormName('size'),
      price: this.getValueFromSizeFormName('price'),
      amount_of_sugar: this.getValueFromSizeFormName('amountOfSugar')
    }
    const existSize = this.listOfSizes.find(value => data.size == value.size);
    this.beverageSizeForm.reset();
    if (existSize) {
      this.toastr.error("Size is exist. If you want to edit this size, please delete and re-add new one.",);
      return;
    }
    this.listOfSizes.push(data);
  }

  back(): void {
    this.location.back();
  }
}
