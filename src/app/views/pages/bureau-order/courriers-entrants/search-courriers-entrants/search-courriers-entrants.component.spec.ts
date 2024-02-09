import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourriersEntrantsComponent } from './search-courriers-entrants.component';

describe('SearchCourriersEntrantsComponent', () => {
  let component: SearchCourriersEntrantsComponent;
  let fixture: ComponentFixture<SearchCourriersEntrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCourriersEntrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCourriersEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
