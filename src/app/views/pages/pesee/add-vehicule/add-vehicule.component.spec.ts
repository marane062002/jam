import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiculeComponent } from './add-vehicule.component';

describe('AddVehiculeComponent', () => {
  let component: AddvehiculeComponent;
  let fixture: ComponentFixture<AddvehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
