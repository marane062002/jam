import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPenalitesComponent } from './list-penalites.component';

describe('ListPenalitesComponent', () => {
  let component: ListPenalitesComponent;
  let fixture: ComponentFixture<ListPenalitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPenalitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPenalitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
