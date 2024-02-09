import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterventionRapideComponent } from './edit-intervention-rapide.component';

describe('EditInterventionRapideComponent', () => {
  let component: EditInterventionRapideComponent;
  let fixture: ComponentFixture<EditInterventionRapideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInterventionRapideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInterventionRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
