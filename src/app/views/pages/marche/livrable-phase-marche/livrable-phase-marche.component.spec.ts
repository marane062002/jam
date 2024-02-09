import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrablePhaseMarcheComponent } from './livrable-phase-marche.component';

describe('LivrablePhaseMarcheComponent', () => {
  let component: LivrablePhaseMarcheComponent;
  let fixture: ComponentFixture<LivrablePhaseMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrablePhaseMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrablePhaseMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
