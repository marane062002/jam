import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeListAdjugeComponent } from './bon-commande-list-adjuge.component';

describe('BonCommandeListAdjugeComponent', () => {
  let component: BonCommandeListAdjugeComponent;
  let fixture: ComponentFixture<BonCommandeListAdjugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeListAdjugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeListAdjugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
