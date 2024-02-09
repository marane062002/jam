import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVaccinationStatutComponent } from './update-vaccination-statut.component';

describe('UpdateVaccinationStatutComponent', () => {
  let component: UpdateVaccinationStatutComponent;
  let fixture: ComponentFixture<UpdateVaccinationStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVaccinationStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVaccinationStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
