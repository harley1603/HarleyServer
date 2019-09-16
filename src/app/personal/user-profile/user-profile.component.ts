import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/classes/user';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private user: User, 
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    let userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage){
      this.user.setUser(userStorage);
    }
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
      'format': 'dd-mm-yyyy',
      'autoclose': true
    }).on('change', function (e) {
      if (e.target.value) {
        self.setValueFromFormName('birthday', e.target.value);
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
    })
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
    let data = this.getDataUpload();
    let uid = this.user.uid;

    this.userService.updateUserByUid(uid, data).then((result) => {
      console.log('Updated user successfully');
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
}
