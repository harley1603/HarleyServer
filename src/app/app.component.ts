import { Component } from "@angular/core";
import { User } from './shared/classes/user';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  constructor() {
    // let userStorage = JSON.parse(localStorage.getItem('user'));
    // if (userStorage){
    //   this.user.setUser(userStorage);
    // }
  }
}
