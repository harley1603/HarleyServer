import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { UserService } from 'src/app/shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Status', 'Role',''];
  users: User[] = [];
  constructor(private userService: UserService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.bindUser();
  }

  bindUser(): void {
    this.spinner.show();
    this.userService.getListOfUsers().subscribe((users) => {
      users.forEach((user) => {
        let data = user.data();
        let temp = new User();
        temp.setUserDetail(data);
        temp.uid = user.id;
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
}
