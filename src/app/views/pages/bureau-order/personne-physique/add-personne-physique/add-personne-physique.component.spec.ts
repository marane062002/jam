import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonnePhysiqueComponent } from './add-personne-physique.component';

describe('AddPersonnePhysiqueComponent', () => {
  let component: AddPersonnePhysiqueComponent;
  let fixture: ComponentFixture<AddPersonnePhysiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonnePhysiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonnePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
