import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ROLE } from 'src/app/shared/enums/role.enum';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';

declare var $: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  CrudType = CrudType;
  @Input() title: string;
  @Input() mode: any;
  @Input() selectedUser: User;
  @Output() updateData = new EventEmitter<User>();
  roles = [
    { role: ROLE.ADMIN, displayName: 'Administrator'},
    { role: ROLE.USER, displayName: 'User'},
    { role: ROLE.CUSTOMER, displayName: 'Customer'},
  ]
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.initForm();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (Object.keys(this.selectedUser).length > 0) {
      this.userForm.patchValue({
        uid: this.selectedUser.uid,
        firstName: this.selectedUser.first_name,
        lastName: this.selectedUser.last_name,
        email: this.selectedUser.email,
        phone: this.selectedUser.phone,
        role: this.selectedUser.role,
        status: this.selectedUser.status
      })
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      uid: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      role: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  saveForm(){
    this.updateData.emit(this.getDataUpload());
    $('#modal-shipping-address').modal('hide');
    this.userForm.reset();
  }

  getDataUpload(): User {
    let data = new User();

    data.uid = this.getValueFromFormName('uid');
    data.first_name = this.getValueFromFormName('firstName');
    data.last_name = this.getValueFromFormName('lastName');
    data.email = this.getValueFromFormName('email');
    data.phone = this.getValueFromFormName('phone');
    data.role = this.getValueFromFormName('role');
    data.status = this.getValueFromFormName('status');

    return data;
  }

  getValueFromFormName(name: string) {
    return this.userForm.controls[name].value;
  }
  
}
