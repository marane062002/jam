import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMagasinsComponent } from './tab-magasins.component';

describe('TabMagasinsComponent', () => {
  let component: TabMagasinsComponent;
  let fixture: ComponentFixture<TabMagasinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMagasinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMagasinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
