import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCourrierEntrantsComponent } from './tab-courrier-entrants.component';

describe('TabCourrierEntrantsComponent', () => {
  let component: TabCourrierEntrantsComponent;
  let fixture: ComponentFixture<TabCourrierEntrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCourrierEntrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCourrierEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
