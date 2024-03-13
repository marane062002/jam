import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandesSoutienFinancierComponent } from './show-demandes-soutien-financier.component';

describe('ShowDemandesSoutienFinancierComponent', () => {
  let component: ShowDemandesSoutienFinancierComponent;
  let fixture: ComponentFixture<ShowDemandesSoutienFinancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDemandesSoutienFinancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDemandesSoutienFinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
