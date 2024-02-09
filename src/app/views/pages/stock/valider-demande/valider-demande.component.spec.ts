import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderDemandeComponent } from './valider-demande.component';

describe('ValiderDemandeComponent', () => {
  let component: ValiderDemandeComponent;
  let fixture: ComponentFixture<ValiderDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
