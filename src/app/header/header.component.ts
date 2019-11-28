import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUrl = '';
  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  scrollToElement(id: string){
    let element = document.getElementById(id);
    element.scrollIntoView({behavior: "smooth"});
  }

  logout(){
    this.authService.logout();
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
}
