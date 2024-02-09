import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculDixJoursComponent } from './calcul-dix-jours.component';

describe('VehiculesComponent', () => {
  let component: CalculDixJoursComponent;
  let fixture: ComponentFixture<CalculDixJoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculDixJoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculDixJoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
