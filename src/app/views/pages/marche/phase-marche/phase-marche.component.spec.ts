import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseMarcheComponent } from './phase-marche.component';

describe('PhaseMarcheComponent', () => {
  let component: PhaseMarcheComponent;
  let fixture: ComponentFixture<PhaseMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
