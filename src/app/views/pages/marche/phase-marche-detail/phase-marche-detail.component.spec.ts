import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseMarcheDetailComponent } from './phase-marche-detail.component';

describe('PhaseMarcheDetailComponent', () => {
  let component: PhaseMarcheDetailComponent;
  let fixture: ComponentFixture<PhaseMarcheDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseMarcheDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseMarcheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
