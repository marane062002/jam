import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnePhysiqueEditComponent } from './personne-physique-edit.component';

describe('PersonnePhysiqueEditComponent', () => {
  let component: PersonnePhysiqueEditComponent;
  let fixture: ComponentFixture<PersonnePhysiqueEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnePhysiqueEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnePhysiqueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
