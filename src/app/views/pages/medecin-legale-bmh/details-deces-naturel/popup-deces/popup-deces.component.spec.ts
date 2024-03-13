import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDecesComponent } from './popup-deces.component';

describe('PopupDecesComponent', () => {
  let component: PopupDecesComponent;
  let fixture: ComponentFixture<PopupDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
