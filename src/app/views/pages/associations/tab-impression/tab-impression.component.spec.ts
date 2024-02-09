import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabImpressionComponent } from './tab-impression.component';

describe('TabImpressionComponent', () => {
  let component: TabImpressionComponent;
  let fixture: ComponentFixture<TabImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
