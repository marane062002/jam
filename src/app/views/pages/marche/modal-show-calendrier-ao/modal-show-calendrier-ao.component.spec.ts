import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShowCalendrierAoComponent } from './modal-show-calendrier-ao.component';

describe('ModalShowCalendrierAoComponent', () => {
  let component: ModalShowCalendrierAoComponent;
  let fixture: ComponentFixture<ModalShowCalendrierAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowCalendrierAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowCalendrierAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
