import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeIndicateurDelegataireComponent } from './list-type-indicateur-delegataire.component';

describe('ListTypeIndicateurDelegataireComponent', () => {
  let component: ListTypeIndicateurDelegataireComponent;
  let fixture: ComponentFixture<ListTypeIndicateurDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeIndicateurDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeIndicateurDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
