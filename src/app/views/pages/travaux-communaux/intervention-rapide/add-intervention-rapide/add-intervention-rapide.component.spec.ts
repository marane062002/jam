import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventionRapideComponent } from './add-intervention-rapide.component';

describe('AddInterventionRapideComponent', () => {
  let component: AddInterventionRapideComponent;
  let fixture: ComponentFixture<AddInterventionRapideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterventionRapideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventionRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
