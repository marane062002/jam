import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterventionRapideComponent } from './list-intervention-rapide.component';

describe('ListInterventionRapideComponent', () => {
  let component: ListInterventionRapideComponent;
  let fixture: ComponentFixture<ListInterventionRapideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInterventionRapideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterventionRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
