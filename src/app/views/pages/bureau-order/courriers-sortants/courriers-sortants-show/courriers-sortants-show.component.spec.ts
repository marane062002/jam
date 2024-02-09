import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourriersSortantsShowComponent } from './courriers-sortants-show.component';

describe('CourriersSortantsShowComponent', () => {
  let component: CourriersSortantsShowComponent;
  let fixture: ComponentFixture<CourriersSortantsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourriersSortantsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourriersSortantsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
