import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneMoraleEditComponent } from './personne-morale-edit.component';

describe('PersonneMoraleEditComponent', () => {
  let component: PersonneMoraleEditComponent;
  let fixture: ComponentFixture<PersonneMoraleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneMoraleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneMoraleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
