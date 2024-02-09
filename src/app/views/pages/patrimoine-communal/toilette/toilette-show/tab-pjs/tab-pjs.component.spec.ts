import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPjsComponent } from './tab-pjs.component';

describe('TabPjsComponent', () => {
  let component: TabPjsComponent;
  let fixture: ComponentFixture<TabPjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
