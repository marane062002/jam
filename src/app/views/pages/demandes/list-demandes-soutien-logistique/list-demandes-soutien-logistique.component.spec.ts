import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandesSoutienLogistiqueComponent } from './list-demandes-soutien-logistique.component';

describe('ListDemandesSoutienLogistiqueComponent', () => {
  let component: ListDemandesSoutienLogistiqueComponent;
  let fixture: ComponentFixture<ListDemandesSoutienLogistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandesSoutienLogistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandesSoutienLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
