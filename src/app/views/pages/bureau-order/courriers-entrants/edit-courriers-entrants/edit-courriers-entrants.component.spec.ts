import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourriersEntrantsComponent } from './edit-courriers-entrants.component';

describe('EditCourriersEntrantsComponent', () => {
  let component: EditCourriersEntrantsComponent;
  let fixture: ComponentFixture<EditCourriersEntrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourriersEntrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourriersEntrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
