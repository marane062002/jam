import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCircuitComponent } from './list-circuit.component';

describe('ListCircuitComponent', () => {
  let component: ListCircuitComponent;
  let fixture: ComponentFixture<ListCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
