import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageManagementComponent } from './beverage-management.component';

describe('BeverageManagementComponent', () => {
  let component: BeverageManagementComponent;
  let fixture: ComponentFixture<BeverageManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeverageManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeverageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
