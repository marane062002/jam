import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivitesComponent } from './edit-activites.component';

describe('EditActivitesComponent', () => {
  let component: EditActivitesComponent;
  let fixture: ComponentFixture<EditActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
