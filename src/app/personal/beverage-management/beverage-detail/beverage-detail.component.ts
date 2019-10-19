import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/shared/enums/utils';
import { CrudType} from 'src/app/shared/enums/crud-type.enum'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    "Fruit Tea",
    "Smoothie",
    "Coffee"
  ]
  sizeHeaders = ['Size', 'Price', 'Amount Of Sugar'];
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.initForm();
    this.initFormSize();
    this.route.params.subscribe(params => {
      if (params.mode == Utils.PATH_UPDATE) {
        this.mode = CrudType.UPDATE;
        this.title = CrudType.UPDATE_TITLE
        // this.initData(params.id);
      } else if (params.item == Utils.PATH_VIEW) {
        this.mode = CrudType.VIEW;
        // this.initData(params.id);
      } else {
        this.mode = CrudType.CREATE;
        this.title = CrudType.ADD_TITLE
      }
    });
  }

  initForm() {
    this.beverageForm = this.formBuilder.group({
      beverageName: ['', Validators.required],
      description: ['', Validators.required],
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
}
