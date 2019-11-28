import { Component, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../shared/classes/user';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUrl = '';
  constructor(public user: UserService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // let userStorage = JSON.parse(localStorage.getItem('user'));
    // if (userStorage){
    //   this.user.setUser(userStorage);
    //   console.log(this.user);
    // }
  }
  changeBackground(){
    $(".collapse").on('show.bs.collapse', function(){
      $('nav').removeClass('nav-transparent');
      $('nav').addClass('nav-expand');
      $('.navbar-collapse').addClass('nav-expand');
    });
    $(".collapse").on('hidden.bs.collapse', function(){
      $('nav').addClass('nav-transparent');
      $('nav').removeClass('nav-expand');
      $('.navbar-collapse').removeClass('nav-expand');
    });
  }
  focusNav(e){
    // $('nav').removeClass('nav-transparent');
    // $('nav').addClass('nav-black');
  }
  blurNav(e){
    $('nav').addClass('nav-transparent');
    $('nav').removeClass('nav-black');
  }
  scrollToElement(id: string){
    let element = document.getElementById(id);
    element.scrollIntoView({behavior: "smooth"});
  }

  logout(){
    this.loginService.logout();
    // this.user.setEmpty();
  }

  navTo(link: string){
    this.currentUrl = link;
    let activatedRouteUrl = this.router.url;
    console.log(activatedRouteUrl);
    if (activatedRouteUrl.includes('dashboard') || activatedRouteUrl == '/') {
      switch (link) {
        case '/':
          this.scrollToElement('bs-carousel');
          this.router.navigate([link]);
          break;
        case '/dashboard/menu':
          this.scrollToElement('menu');
          this.router.navigate([link]);
          break;
        case '/dashboard/about':
          this.scrollToElement('about');
          this.router.navigate([link]);
          break;
        case '/dashboard/contact':
          this.scrollToElement('contact');
          this.router.navigate([link]);
          break;
        default: 
          this.router.navigate([link]);
      }
    }
    else {
      this.router.navigate([link]);
    }
  }

  openLoginModal(): void {
    $("#login-modal").modal('show');
  }
}
