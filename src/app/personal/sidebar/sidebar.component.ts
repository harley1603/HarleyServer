import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/classes/user';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/enums/role.enum';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() navTo = new EventEmitter<string>();
  url: string;
  ROLE = ROLE;
  constructor(private user: User, private router: Router) {
    $(function(){
      $('[data-toggle="tooltip"]').tooltip();
      $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
          $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
      });
      $('.side-nav .collapse').on("show.bs.collapse", function() {                        
          $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
      });
    }) 
    let userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage){
      this.user.setUser(userStorage);
    }
  }

  ngOnInit() {
  }

  navToLink(link: string){
    this.navTo.emit(link);
  }
  
}
