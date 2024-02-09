import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeVaccinationComponent } from './details-type-vaccination.component';

describe('DetailsTypeVaccinationComponent', () => {
  let component: DetailsTypeVaccinationComponent;
  let fixture: ComponentFixture<DetailsTypeVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
