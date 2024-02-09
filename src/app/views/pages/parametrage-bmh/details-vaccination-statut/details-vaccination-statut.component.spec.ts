import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVaccinationStatutComponent } from './details-vaccination-statut.component';

describe('DetailsVaccinationStatutComponent', () => {
  let component: DetailsVaccinationStatutComponent;
  let fixture: ComponentFixture<DetailsVaccinationStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVaccinationStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVaccinationStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
