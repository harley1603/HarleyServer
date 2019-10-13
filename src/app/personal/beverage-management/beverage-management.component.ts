import { Component, OnInit } from '@angular/core';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';

@Component({
  selector: 'app-beverage-management',
  templateUrl: './beverage-management.component.html',
  styleUrls: ['./beverage-management.component.scss']
})
export class BeverageManagementComponent implements OnInit {
  CrudType = CrudType;
  title = "View";
  mode = CrudType.VIEW;
  constructor() { }

  ngOnInit() {
  }

  openDetailModal(crudType) {
    switch (crudType) {
      case CrudType.CREATE:
        this.title = CrudType.ADD_TITLE;
        this.mode = CrudType.CREATE;
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
}
