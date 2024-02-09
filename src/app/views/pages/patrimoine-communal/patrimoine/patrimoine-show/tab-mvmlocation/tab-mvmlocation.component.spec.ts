import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMvmlocationComponent } from './tab-mvmlocation.component';

describe('TabMvmlocationComponent', () => {
  let component: TabMvmlocationComponent;
  let fixture: ComponentFixture<TabMvmlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMvmlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMvmlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
