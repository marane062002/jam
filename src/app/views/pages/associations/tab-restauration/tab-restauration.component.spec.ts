import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRestaurationComponent } from './tab-restauration.component';

describe('TabRestaurationComponent', () => {
  let component: TabRestaurationComponent;
  let fixture: ComponentFixture<TabRestaurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRestaurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRestaurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
