import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourriersEntrantsComponent } from './list-courriers-entrants.component';

describe('ListCourriersEntrantsComponent', () => {
  let component: ListCourriersEntrantsComponent;
  let fixture: ComponentFixture<ListCourriersEntrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourriersEntrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourriersEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
