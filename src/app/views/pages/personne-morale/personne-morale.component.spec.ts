import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneMoraleComponent } from './personne-morale.component';

describe('PersonneMoraleComponent', () => {
  let component: PersonneMoraleComponent;
  let fixture: ComponentFixture<PersonneMoraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneMoraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneMoraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
