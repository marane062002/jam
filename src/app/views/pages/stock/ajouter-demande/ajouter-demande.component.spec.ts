import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterDemandeComponent } from './ajouter-demande.component';

describe('AjouterDemandeComponent', () => {
  let component: AjouterDemandeComponent;
  let fixture: ComponentFixture<AjouterDemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterDemandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
