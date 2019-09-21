import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCompoment } from './about.component';

describe('AboutCompoment', () => {
  let component: AboutCompoment;
  let fixture: ComponentFixture<AboutCompoment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCompoment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
