import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelIndexComponent } from './personnel-index.component';

describe('PersonnelIndexComponent', () => {
  let component: PersonnelIndexComponent;
  let fixture: ComponentFixture<PersonnelIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
