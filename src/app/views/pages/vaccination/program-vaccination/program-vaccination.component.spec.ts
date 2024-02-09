import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramVaccinationComponent } from './program-vaccination.component';

describe('ProgramVaccinationComponent', () => {
  let component: ProgramVaccinationComponent;
  let fixture: ComponentFixture<ProgramVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
