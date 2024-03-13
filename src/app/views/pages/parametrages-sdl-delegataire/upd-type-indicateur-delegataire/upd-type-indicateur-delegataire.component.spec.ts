import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdTypeIndicateurDelegataireComponent } from './upd-type-indicateur-delegataire.component';

describe('UpdTypeIndicateurDelegataireComponent', () => {
  let component: UpdTypeIndicateurDelegataireComponent;
  let fixture: ComponentFixture<UpdTypeIndicateurDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdTypeIndicateurDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdTypeIndicateurDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
