import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabActivitesComponent } from './tab-activites.component';

describe('TabActivitesComponent', () => {
  let component: TabActivitesComponent;
  let fixture: ComponentFixture<TabActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
