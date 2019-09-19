import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressDetailComponent } from './shipping-address-detail.component';

describe('ShippingAddressDetailComponent', () => {
  let component: ShippingAddressDetailComponent;
  let fixture: ComponentFixture<ShippingAddressDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAddressDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
