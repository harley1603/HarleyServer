import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderDetailComponent } from './order-detail.component';

describe('MyorderDetailComponent', () => {
  let component: MyorderDetailComponent;
  let fixture: ComponentFixture<MyorderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
