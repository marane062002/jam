import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeDashboardComponent } from './bon-commande-dashboard.component';

describe('BonCommandeDashboardComponent', () => {
  let component: BonCommandeDashboardComponent;
  let fixture: ComponentFixture<BonCommandeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonCommandeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonCommandeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
