import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCourriersComponent } from './personnel-courriers.component';

describe('PersonnelCourriersComponent', () => {
  let component: PersonnelCourriersComponent;
  let fixture: ComponentFixture<PersonnelCourriersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelCourriersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelCourriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
