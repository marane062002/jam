import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLoyerPjsComponent } from './tab-loyer-pjs.component';

describe('TabLoyerPjsComponent', () => {
  let component: TabLoyerPjsComponent;
  let fixture: ComponentFixture<TabLoyerPjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabLoyerPjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLoyerPjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
