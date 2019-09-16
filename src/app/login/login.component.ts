import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { LoginService } from "./login.service";
import { User } from '../shared/classes/user';
import { UserService } from '../shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  showLoading = false;
  loginFail = false;
  messageError: string;
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }
  public loginForm: FormGroup;
  constructor(public loginService: LoginService, private user: User, private userService: UserService, private spinner: NgxSpinnerService) {
    this.initForm();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
  }

  setValueFromFormName(name: string, value: any){
    return this.loginForm.controls[name].setValue(value);
  }

  getValueFromFormName(name){
    return this.loginForm.controls[name].value;
  }

  login() {
    if (this.loginForm.invalid){
      this.loginFail = true;
    }
    let { email, password } = this.loginForm.value;
    // this.showLoading = true;
    this.spinner.show();
    this.loginService.login(email, password).then(result => {
      this.spinner.hide();
      if (result) {
        this.user.setUser(result.user);
        $('#login-modal').modal('hide');
        this.loginForm.reset();
      }
    }, (err) => {
      this.spinner.hide();
      this.loginFail = true;
      this.messageError = err.message;
    })
  }

  loginFacebook(){
    this.spinner.show();
    this.loginService.FacebookAuth().then((result) => {
      this.spinner.hide();
      console.log(result);
    }, (err) => {
      this.spinner.hide();
      this.loginFail = true;
      this.messageError = err.message;
    });
  }

  keyPress(event: any){
    this.loginFail = false;
    if (event.keyCode === 13){
      this.login();
    }
  }
}
