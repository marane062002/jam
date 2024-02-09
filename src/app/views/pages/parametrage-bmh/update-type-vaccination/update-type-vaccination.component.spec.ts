import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeVaccinationComponent } from './update-type-vaccination.component';

describe('UpdateTypeVaccinationComponent', () => {
  let component: UpdateTypeVaccinationComponent;
  let fixture: ComponentFixture<UpdateTypeVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
