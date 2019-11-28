import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { User } from '../shared/classes/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
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
  constructor(public authService: AuthService, private user: User,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.initForm();
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
  }

  setValueFromFormName(name: string, value: any) {
    return this.loginForm.controls[name].setValue(value);
  }

  getValueFromFormName(name) {
    return this.loginForm.controls[name].value;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginFail = true;
    }
    let { email, password } = this.loginForm.value;
    this.spinner.show();
    this.authService.login(email, password).then(result => {
      this.spinner.hide();
      if (result) {
        this.user.setUser(result.user);
        this.toastr.success('Login successfully.');
        $('#login-modal').modal('hide');
        this.loginForm.reset();
      }
    }, (err) => {
      this.spinner.hide();
      this.loginFail = true;
      this.messageError = err.message;
    })
  }

  loginFacebook() {
    this.spinner.show();
    this.authService.FacebookAuth().then((result) => {
      this.spinner.hide();
      console.log(result);
    }, (err) => {
      this.spinner.hide();
      this.loginFail = true;
      this.messageError = err.message;
    });
  }

  keyPress(event: any) {
    this.loginFail = false;
    if (event.keyCode === 13) {
      this.login();
    }
  }
}
