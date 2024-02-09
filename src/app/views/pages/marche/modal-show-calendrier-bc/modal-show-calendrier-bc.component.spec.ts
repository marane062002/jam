import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowCalendrierBcComponent } from './modal-show-calendrier-bc.component';

describe('ModalShowCalendrierBcComponent', () => {
  let component: ModalShowCalendrierBcComponent;
  let fixture: ComponentFixture<ModalShowCalendrierBcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowCalendrierBcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowCalendrierBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
