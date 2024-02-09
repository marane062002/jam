import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonneMoraleComponent } from './list-personne-morale.component';

describe('ListPersonneMoraleComponent', () => {
  let component: ListPersonneMoraleComponent;
  let fixture: ComponentFixture<ListPersonneMoraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonneMoraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonneMoraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
