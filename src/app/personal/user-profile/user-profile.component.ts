import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/classes/user';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators  } from '@angular/forms';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { LoginService } from 'src/app/login/login.service';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  shippingAddressHeaders = ['No.','Receiver', 'Phone Number', 'Street', 'Ward', 'District', 'City',''];
  userForm: FormGroup;

  changePasswordForm: FormGroup;
  isError = false;
  // Change password
  successChangePassword = false;
  errorMessage = '';
  errorChangePassword = false;
  // Shipping Address Form
  CrudType = CrudType;
  shippingAddress = {
    title: '',
    mode: CrudType.VIEW
  }
  constructor(
    private user: User,
    private loginService: LoginService, 
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {

   }

  ngOnInit() {
    this.initForm();
    this.bindUserData();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let self = this;
    $('.input-group.date').datepicker({
      'format': 'dd/mm/yyyy',
      'autoclose': true,
      'startDate': '-200y',
      'endDate': '0d'
    }).on('change', function (e) {
      if (e.target.value) {
        if (self.validateDate(e.target.value)){
          self.setValueFromFormName('birthday', e.target.value);
        }
      }
    });
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      uid: [''],
      displayName: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      birthday: ['']
    });

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  bindUserData(){
    this.spinner.show();
    this.userService.getUserDataByUid(this.user.uid).subscribe((result: DocumentSnapshot<any>) => {
      let userDetail = result.data();
      this.user.setUserDetail(userDetail);
      this.userForm.patchValue({
        displayName: this.user.display_name,
        email: this.user.email,
        firstName: this.user.first_name,
        lastName: this.user.last_name,
        phoneNumber: this.user.phone,
        birthday: this.user.birthday
      });
      this.spinner.hide();
    });
  }

  getValueFromFormName(name:string){
    return this.userForm.controls[name].value;
  }

  setValueFromFormName(name:string, value: any){
    return this.userForm.controls[name].setValue(value);
  }

  saveForm(): void{
    this.spinner.show();
    let data = this.getDataUpload();
    let uid = this.user.uid;

    this.userService.updateUserByUid(uid, data).then((result) => {
      this.spinner.hide();
      alert('Updated user successfully');
    }, err => {
      console.error(err);
    });
  }

  getDataUpload(): any {
    let data = {
      displayName: this.getValueFromFormName('displayName'),
      email: this.getValueFromFormName('email'),
      firstName: this.getValueFromFormName('firstName'),
      lastName: this.getValueFromFormName('lastName'),
      phoneNumber: this.getValueFromFormName('phoneNumber'),
      birthday: this.getValueFromFormName('birthday')
    }
    return data;
  }

  validateDate(date: string){
    return moment(date).isValid();
  }

  clearPasswordForm(): void {
    this.successChangePassword = false;
    this.errorMessage = '';
    this.errorChangePassword = false;
    this.changePasswordForm.reset();
  }
  
  changePassword(): void {
    this.errorChangePassword = false;
    this.errorMessage = '';
    let oldPassword = this.getValueFromPasswordFormName('oldPassword');
    let newPassword = this.getValueFromPasswordFormName('newPassword');
    let confirmPassword = this.getValueFromPasswordFormName('confirmPassword');
    if (this.changePasswordForm.invalid){
      this.errorChangePassword = true;
      return;
    }
    if (newPassword !== confirmPassword){
      this.errorMessage = 'Password does not match.'
      this.errorChangePassword = true;
      return;
    }
    this.loginService.changePassword(this.user.email, oldPassword, newPassword).then( () => {
      this.clearPasswordForm();
      this.successChangePassword = true;
    }).catch(err => {
      this.errorChangePassword = true;
      this.errorMessage = 'The old password is invalid. Please try again!';
    });
  }

  getValueFromPasswordFormName(name: string) {
    return this.changePasswordForm.controls[name].value;
  }

  showShippingAddressModal(crudType) {
    switch (crudType) {
      case CrudType.CREATE:
        this.shippingAddress.title = CrudType.ADD_TITLE;
        this.shippingAddress.mode = CrudType.CREATE;
        break;
      case CrudType.UPDATE:
        this.shippingAddress.title = CrudType.UPDATE_TITLE;
        this.shippingAddress.mode = CrudType.UPDATE;
        break;
      default:
        break;
    }
  }
}
