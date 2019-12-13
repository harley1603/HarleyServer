import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../shared/classes/user';
import { UserService } from '../shared/services/user.service';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  constructor(public user: User, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.bindUserData();
  }

  navToLink(link: string) {
    this.router.navigate([link], { relativeTo: this.route });
  }

  bindUserData() {
    this.spinner.show();
    try {
      this.userService.getUserDataByUid(this.user.uid).subscribe((result: DocumentSnapshot<any>) => {
        let userDetail = result.data();
        this.user.setUserDetail(userDetail);
        this.spinner.hide();
      });
    } catch (error) {
      console.error(error);
      this.spinner.hide();
    }
  }

}
