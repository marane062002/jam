import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersSortantsComponent } from './courriers-sortants.component';

describe('CourriersSortantsComponent', () => {
  let component: CourriersSortantsComponent;
  let fixture: ComponentFixture<CourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
