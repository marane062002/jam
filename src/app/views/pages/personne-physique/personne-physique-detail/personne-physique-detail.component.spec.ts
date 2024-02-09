import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnePhysiqueDetailComponent } from './personne-physique-detail.component';

describe('PersonnePhysiqueDetailComponent', () => {
  let component: PersonnePhysiqueDetailComponent;
  let fixture: ComponentFixture<PersonnePhysiqueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnePhysiqueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnePhysiqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
