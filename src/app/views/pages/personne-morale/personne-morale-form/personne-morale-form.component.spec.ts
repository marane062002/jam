import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneMoraleFormComponent } from './personne-morale-form.component';

describe('PersonneMoraleFormComponent', () => {
  let component: PersonneMoraleFormComponent;
  let fixture: ComponentFixture<PersonneMoraleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneMoraleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneMoraleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
