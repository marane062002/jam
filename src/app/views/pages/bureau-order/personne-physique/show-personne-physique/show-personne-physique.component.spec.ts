import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonnePhysiqueComponent } from './show-personne-physique.component';

describe('ShowPersonnePhysiqueComponent', () => {
  let component: ShowPersonnePhysiqueComponent;
  let fixture: ComponentFixture<ShowPersonnePhysiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPersonnePhysiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPersonnePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
