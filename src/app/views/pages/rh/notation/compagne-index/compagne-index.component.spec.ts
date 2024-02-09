import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagneIndexComponent } from './compagne-index.component';

describe('CompagneIndexComponent', () => {
  let component: CompagneIndexComponent;
  let fixture: ComponentFixture<CompagneIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompagneIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompagneIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
