import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelShowComponent } from './personnel-show.component';

describe('PersonnelShowComponent', () => {
  let component: PersonnelShowComponent;
  let fixture: ComponentFixture<PersonnelShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
