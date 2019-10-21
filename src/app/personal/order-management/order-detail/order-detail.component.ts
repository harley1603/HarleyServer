import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/shared/enums/utils';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  CrudType = CrudType;
  orderForm: FormGroup;
  mode: number;
  title: string;
  customer: [];
  constructor(private location: Location, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.initForm();
    this.initCustomer();
    this.route.params.subscribe(params => {
      if (params.mode == Utils.PATH_UPDATE) {
        this.mode = CrudType.UPDATE;
        this.title = CrudType.UPDATE_TITLE
        this.initData(params.id);
      } else if (params.mode == Utils.PATH_VIEW) {
        this.mode = CrudType.VIEW;
        this.initData(params.code);
      } else {
        this.mode = CrudType.CREATE;
        this.title = CrudType.ADD_TITLE
      }
    });
  }

  initForm(): void {
    this.orderForm = this.formBuilder.group({
      orderNo: ['', Validators.required],
    })
  }

  initData(id: string): void {

  }

  initCustomer(): void {
    // this.userService.getListOfUsers().subscribe(users => {
    // })
  }
  
  back(): void {
    this.location.back();
  }
}
