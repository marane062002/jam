import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdVaccinationComponent } from './upd-vaccination.component';

describe('UpdVaccinationComponent', () => {
  let component: UpdVaccinationComponent;
  let fixture: ComponentFixture<UpdVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
