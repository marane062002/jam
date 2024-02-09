import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderChefLogistiqueComponent } from './valider-chef-logistique.component';

describe('ValiderChefLogistiqueComponent', () => {
  let component: ValiderChefLogistiqueComponent;
  let fixture: ComponentFixture<ValiderChefLogistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderChefLogistiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderChefLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
