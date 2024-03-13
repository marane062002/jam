import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandesSoutienLogistiqueComponent } from './show-demandes-soutien-logistique.component';

describe('ShowDemandesSoutienLogistiqueComponent', () => {
  let component: ShowDemandesSoutienLogistiqueComponent;
  let fixture: ComponentFixture<ShowDemandesSoutienLogistiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandesSoutienLogistiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandesSoutienLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
