import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeListComponent } from './bon-commande-list.component';

describe('BonCommandeListComponent', () => {
  let component: BonCommandeListComponent;
  let fixture: ComponentFixture<BonCommandeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
