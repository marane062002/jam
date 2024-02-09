import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeDetailComponent } from './bon-commande-detail.component';

describe('BonCommandeDetailComponent', () => {
  let component: BonCommandeDetailComponent;
  let fixture: ComponentFixture<BonCommandeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
