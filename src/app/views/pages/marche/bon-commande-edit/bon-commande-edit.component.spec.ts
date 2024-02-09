import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeEditComponent } from './bon-commande-edit.component';

describe('BonCommandeEditComponent', () => {
  let component: BonCommandeEditComponent;
  let fixture: ComponentFixture<BonCommandeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
