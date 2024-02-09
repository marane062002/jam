import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneMoraleListComponent } from './personne-morale-list.component';

describe('PersonneMoraleListComponent', () => {
  let component: PersonneMoraleListComponent;
  let fixture: ComponentFixture<PersonneMoraleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneMoraleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneMoraleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
