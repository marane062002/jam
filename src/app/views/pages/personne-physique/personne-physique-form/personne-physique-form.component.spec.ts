import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnePhysiqueFormComponent } from './personne-physique-form.component';

describe('PersonnePhysiqueFormComponent', () => {
  let component: PersonnePhysiqueFormComponent;
  let fixture: ComponentFixture<PersonnePhysiqueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnePhysiqueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnePhysiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
