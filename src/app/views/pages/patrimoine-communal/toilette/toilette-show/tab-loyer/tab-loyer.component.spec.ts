import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLoyerComponent } from './tab-loyer.component';

describe('TabLoyerComponent', () => {
  let component: TabLoyerComponent;
  let fixture: ComponentFixture<TabLoyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabLoyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
