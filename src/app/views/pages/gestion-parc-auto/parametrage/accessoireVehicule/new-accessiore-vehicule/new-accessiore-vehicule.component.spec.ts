import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccessioreVehiculeComponent } from './new-accessiore-vehicule.component';

describe('NewAccessioreVehiculeComponent', () => {
  let component: NewAccessioreVehiculeComponent;
  let fixture: ComponentFixture<NewAccessioreVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccessioreVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccessioreVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
