import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLocauxComponent } from './tab-locaux.component';

describe('TabLocauxComponent', () => {
  let component: TabLocauxComponent;
  let fixture: ComponentFixture<TabLocauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabLocauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLocauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
