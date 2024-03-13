import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeIndicateurDelegataireComponent } from './add-type-indicateur-delegataire.component';

describe('AddTypeIndicateurDelegataireComponent', () => {
  let component: AddTypeIndicateurDelegataireComponent;
  let fixture: ComponentFixture<AddTypeIndicateurDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeIndicateurDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeIndicateurDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
