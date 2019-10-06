import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { UserService } from '../shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorForm = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder, 
    private loginService: LoginService, 
    private userService: UserService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  signUp(): void {
    if (this.signUpForm.invalid){
      this.errorForm = true;
      return;
    }

    let password = this.getValueFromFormName('password');
    let confirmPassword = this.getValueFromFormName('confirmPassword');

    if (password !== confirmPassword){
      this.errorForm = true;
      this.errorMessage = 'Password does not match. Please type again.';
      return;
    }
    this.spinner.show();
    let signUpData = this.getDataUpload();

    this.loginService.signUp(signUpData.email, signUpData.password).then( result => {
      let user = result.user;
      this.userService.updateUserByUid(user.uid, signUpData).then(value => {
        console.log('Created Successfully');
        this.signUpForm.reset();
        this.spinner.hide();
        $("#signup-modal").modal('hide');
      });
    })
    .catch(err => {
      this.errorForm = true;
      this.errorMessage = err.message;
      console.error(err.message);
    });
  }

  getDataUpload(): any {
    let data = {
      first_name: this.getValueFromFormName('firstName'),
      last_name: this.getValueFromFormName('lastName'),
      email: this.getValueFromFormName('email'),
      password: this.getValueFromFormName('password')
    }
    return data;
  }

  getValueFromFormName(name: string): any {
    return this.signUpForm.controls[name].value;
  }
}
