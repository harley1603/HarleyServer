import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutCompoment implements OnInit {
  isShown: boolean = false;
  displayButton: string = 'Show chat';


  imgPlaceRight = true;

  constructor() {  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.contentWayPoint();
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
  
  // Animation
  contentWayPoint(){
    let i = 0;
    $('.ftco-animate').waypoint( function( direction ) {
      if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function(){
  
          $('body .ftco-animate.item-animate').each(function(k){
            var el = $(this);
            setTimeout( function () {
              var effect = el.data('animate-effect');
              if ( effect === 'fadeIn') {
                el.addClass('fadeIn ftco-animated');
              } else if ( effect === 'fadeInLeft') {
                el.addClass('fadeInLeft ftco-animated');
              } else if ( effect === 'fadeInRight') {
                el.addClass('fadeInRight ftco-animated');
              } else {
                el.addClass('fadeInUp ftco-animated');
              }
              el.removeClass('item-animate');
            },  k * 50, 'easeInOutExpo' );
          });
          
        }, 100);
      }
    } , { offset: '95%' } );
  }
}

