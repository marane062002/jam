import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPhaseComponent } from './tab-phase.component';

describe('TabPhaseComponent', () => {
  let component: TabPhaseComponent;
  let fixture: ComponentFixture<TabPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
