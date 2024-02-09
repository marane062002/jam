import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneMoraleDetailComponent } from './personne-morale-detail.component';

describe('PersonneMoraleDetailComponent', () => {
  let component: PersonneMoraleDetailComponent;
  let fixture: ComponentFixture<PersonneMoraleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneMoraleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneMoraleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
