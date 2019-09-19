import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isShown: boolean = false;
  displayButton: string = 'Show chat';
  constructor() { 
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    switch (window.location.pathname) {
      case '/dashboard/menu':
        setTimeout(() => {
          this.scrollToElement('menu');
        }, 1000);
        break;
      case '/dashboard/contact':
          this.scrollToElement('contact');
        break;
      default:
        break;
    }
  }

  changePopup(){
    if (this.isShown){
      this.isShown = false;
      this.displayButton = 'Show chat';
    }
    else {
      this.isShown = true;
      this.displayButton = 'Hide chat';
    }
  }

  scrollToElement(id: string){
    let element = document.getElementById(id);
    element.scrollIntoView({behavior: "smooth"});
  }
}
