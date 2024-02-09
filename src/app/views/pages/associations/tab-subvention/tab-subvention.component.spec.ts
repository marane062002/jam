import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSubventionComponent } from './tab-subvention.component';

describe('TabSubventionComponent', () => {
  let component: TabSubventionComponent;
  let fixture: ComponentFixture<TabSubventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabSubventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabSubventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
