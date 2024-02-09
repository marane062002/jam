import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCourrierSortantsComponent } from './tab-courrier-sortants.component';

describe('TabCourrierSortantsComponent', () => {
  let component: TabCourrierSortantsComponent;
  let fixture: ComponentFixture<TabCourrierSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCourrierSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCourrierSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
