import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCompoment } from './contact.component';

describe('ContactCompoment', () => {
  let component: ContactCompoment;
  let fixture: ComponentFixture<ContactCompoment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCompoment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
