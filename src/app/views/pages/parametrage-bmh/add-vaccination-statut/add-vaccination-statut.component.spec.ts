import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaccinationStatutComponent } from './add-vaccination-statut.component';

describe('AddVaccinationStatutComponent', () => {
  let component: AddVaccinationStatutComponent;
  let fixture: ComponentFixture<AddVaccinationStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVaccinationStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVaccinationStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
