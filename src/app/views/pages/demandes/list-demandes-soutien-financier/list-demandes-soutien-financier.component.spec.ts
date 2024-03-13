import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandesSoutienFinancierComponent } from './list-demandes-soutien-financier.component';

describe('ListDemandesSoutienFinancierComponent', () => {
  let component: ListDemandesSoutienFinancierComponent;
  let fixture: ComponentFixture<ListDemandesSoutienFinancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandesSoutienFinancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandesSoutienFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
