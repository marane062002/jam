import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourriersEntrantsComponent } from './add-courriers-entrants.component';

describe('AddCourriersEntrantsComponent', () => {
  let component: AddCourriersEntrantsComponent;
  let fixture: ComponentFixture<AddCourriersEntrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourriersEntrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourriersEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
