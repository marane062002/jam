import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBordereauPrixDetailComponent } from './ligne-bordereau-prix-detail.component';

describe('LigneBordereauPrixDetailComponent', () => {
  let component: LigneBordereauPrixDetailComponent;
  let fixture: ComponentFixture<LigneBordereauPrixDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBordereauPrixDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBordereauPrixDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
