import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonnePhysiqueComponent } from './edit-personne-physique.component';

describe('EditPersonnePhysiqueComponent', () => {
  let component: EditPersonnePhysiqueComponent;
  let fixture: ComponentFixture<EditPersonnePhysiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonnePhysiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonnePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
