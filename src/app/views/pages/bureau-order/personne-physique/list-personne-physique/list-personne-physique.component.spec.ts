import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonnePhysiqueComponent } from './list-personne-physique.component';

describe('ListPersonnePhysiqueComponent', () => {
  let component: ListPersonnePhysiqueComponent;
  let fixture: ComponentFixture<ListPersonnePhysiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonnePhysiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonnePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
