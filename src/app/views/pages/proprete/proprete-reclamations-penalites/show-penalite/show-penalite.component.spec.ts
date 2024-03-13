import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPenaliteComponent } from './show-penalite.component';

describe('ShowPenaliteComponent', () => {
  let component: ShowPenaliteComponent;
  let fixture: ComponentFixture<ShowPenaliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPenaliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPenaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
