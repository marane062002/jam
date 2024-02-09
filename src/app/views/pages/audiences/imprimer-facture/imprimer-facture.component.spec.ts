import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerFactureComponent } from './imprimer-facture.component';

describe('ImprimerFactureComponent', () => {
  let component: ImprimerFactureComponent;
  let fixture: ComponentFixture<ImprimerFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimerFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimerFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
