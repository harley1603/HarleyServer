import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CrudType } from 'src/app/shared/enums/crud-type.enum';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
// Jquery
declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  CrudType = CrudType;
  headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Status', 'Role',''];
  users: User[] = [];
  userDetail = {
    title : CrudType.ADD_TITLE,
    mode : CrudType.CREATE,
    selectedUser: {},
    selectedIndex: 0
  }
  
  constructor(private userService: UserService, private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.bindUser();
  }

  bindUser(): void {
    this.spinner.show();
    this.userService.getListOfUsers().subscribe(users => {
      this.users = [];
      users.forEach((user) => {
        let data = user.payload.doc.data();
        let temp = new User();
        temp.setUserDetail(data);
        temp.uid = user.payload.doc.id;

        // temp.display_name = data.display_name;
        // temp.first_name = data.first_name;
        // temp.last_name = data.last_name;
        // temp.phone = data.phone;
        // temp.email = data.email;
        // temp.birthday = data.birthday;
        // temp.address = data.address;
        // temp.user_role = data.role;
        // temp.avatar = data.avatar;
        this.users.push(temp);
      });
      this.spinner.hide();
    });
  }

  showUserDetailModal(crudType) {
    switch (crudType) {
      case CrudType.VIEW:
        this.userDetail.title = CrudType.VIEW_TITLE;
        this.userDetail.mode = CrudType.VIEW;
        break;
      case CrudType.CREATE:
        this.userDetail.title = CrudType.ADD_TITLE;
        this.userDetail.mode = CrudType.CREATE;
        break;
      case CrudType.UPDATE:
        this.userDetail.title = CrudType.UPDATE_TITLE;
        this.userDetail.mode = CrudType.UPDATE;
        break;
      case CrudType.BLOCK:
        this.userDetail.title = CrudType.BLOCK_TITLE;
        this.userDetail.mode = CrudType.BLOCK;
        break;
      case CrudType.ACTIVE:
        this.userDetail.title = CrudType.ACTIVE_TITLE;
        this.userDetail.mode = CrudType.ACTIVE;
        break;
      default:
        break;
    }
    $('#modal-user').modal('show');
  }

  selectUser(selectedUser: User, index: number){
    this.userDetail.selectedUser = selectedUser;
    this.userDetail.selectedIndex = index;
  }

  updateUserDetail(user: User){
    switch (this.userDetail.mode) {
      case CrudType.CREATE:
        // this.loginService.signUp(user.email, user.password).then( result => {
        //   let user = result.user;
        //   this.userService.updateUserByUid(user.uid, user).then(value => {
        //     console.log('Created Successfully');
        //     this.signUpForm.reset();
        //     this.spinner.hide();
        //     $("#signup-modal").modal('hide');
        //   });
        // })
        // .catch(err => {
        //   this.errorForm = true;
        //   this.errorMessage = err.message;
        //   console.error(err.message);
        // });
        // this.login
        // this.userService.updateUserByUid(user.uid, user);
        break;
      case CrudType.UPDATE:
        this.spinner.show();
        this.userService.updateUserByUid(user.uid, user, user.user_role).then(result => {
          this.spinner.hide();
          this.toastr.success('Updated user successfully');
        }).catch(err => {
          console.log(err.message);
          this.spinner.hide();
          this.toastr.error('An Error has occured. Please try again!');
        });
        break;
      case CrudType.DELETE:
        // this.userDetail.listAddress.splice(this.userDetail.selectedIndex, 1);
        break;
      case CrudType.BLOCK:
        this.spinner.show();
        this.userService.blockUser(user.uid, user).then(result => {
          this.toastr.success("Blocked the user.");
        }).catch(err => {
          this.toastr.error("Error has occured. Please try again.");
          console.error(err);
        })
        break;
      case CrudType.ACTIVE:
        this.spinner.show();
        this.userService.activeUser(user.uid, user).then(result => {
          this.toastr.success("Actived the user.");
        }).catch(err => {
          this.toastr.error("Error has occured. Please try again.");
          console.error(err);
        })
        break;
      default:
        break;
    }
    $('#modal-user').modal('hide');
  }
}
