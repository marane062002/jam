import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCommissionOuverturePlisComponent } from './gestion-commission-ouverture-plis.component';

describe('GestionCommissionOuverturePlisComponent', () => {
  let component: GestionCommissionOuverturePlisComponent;
  let fixture: ComponentFixture<GestionCommissionOuverturePlisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCommissionOuverturePlisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCommissionOuverturePlisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
