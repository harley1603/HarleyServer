import { Component, OnInit } from '@angular/core';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { Router } from '@angular/router';
import { BeverageService } from 'src/app/shared/services/beverage.service';
import { Beverage } from 'src/app/shared/classes/beverage';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-beverage-management',
  templateUrl: './beverage-management.component.html',
  styleUrls: ['./beverage-management.component.scss']
})
export class BeverageManagementComponent implements OnInit {
  CrudType = CrudType;
  title = "View";
  mode = CrudType.VIEW;
  listOfBeverages: Beverage[];
  constructor(private router: Router, private beverageService: BeverageService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initBeverages();
  }

  openDetailModal(crudType) {
    switch (crudType) {
      case CrudType.CREATE:
        this.title = CrudType.ADD_TITLE;
        this.mode = CrudType.CREATE;
        this.router.navigate(['personal/beverage-management/create']);
        break;
      case CrudType.UPDATE:
        this.title = CrudType.UPDATE_TITLE;
        this.mode = CrudType.UPDATE;
        break;
      case CrudType.VIEW:
        this.title = CrudType.VIEW_TITLE;
        this.mode = CrudType.VIEW;
        break;
      case CrudType.DELETE:
        this.title = CrudType.DELETE_TITLE;
        this.mode = CrudType.DELETE;
        break;
      default:
        break;
    }
  }

  initBeverages(): void {
    this.spinner.show();
    this.beverageService.getListOfBeverages().subscribe(snapshot => {
      this.listOfBeverages = [];
      snapshot.forEach(beverage => {
        let temp = new Beverage();
        const code = beverage.payload.doc.id;
        const data = beverage.payload.doc.data();
        temp.code = code;
        temp.setBeverageDetail(data);
        this.listOfBeverages.push(temp);
      });
      this.spinner.hide();
    })
  }

  navigateBeverage(mode, code) {
    this.router.navigateByUrl(`/personal/beverage-management/${mode}/${code}`);
  }
}
