import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConventionComponent } from './tab-convention.component';

describe('TabConventionComponent', () => {
  let component: TabConventionComponent;
  let fixture: ComponentFixture<TabConventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabConventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
