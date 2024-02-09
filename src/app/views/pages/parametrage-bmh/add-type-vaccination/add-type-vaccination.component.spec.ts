import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeVaccinationComponent } from './add-type-vaccination.component';

describe('AddTypeVaccinationComponent', () => {
  let component: AddTypeVaccinationComponent;
  let fixture: ComponentFixture<AddTypeVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
