import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPersonneMoraleComponent } from './show-personne-morale.component';

describe('ShowPersonneMoraleComponent', () => {
  let component: ShowPersonneMoraleComponent;
  let fixture: ComponentFixture<ShowPersonneMoraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPersonneMoraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPersonneMoraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
