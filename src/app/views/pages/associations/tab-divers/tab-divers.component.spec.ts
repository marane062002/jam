import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDiversComponent } from './tab-divers.component';

describe('TabDiversComponent', () => {
  let component: TabDiversComponent;
  let fixture: ComponentFixture<TabDiversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDiversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
