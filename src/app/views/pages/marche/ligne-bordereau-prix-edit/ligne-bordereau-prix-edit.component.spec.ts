import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBordereauPrixEditComponent } from './ligne-bordereau-prix-edit.component';

describe('LigneBordereauPrixEditComponent', () => {
  let component: LigneBordereauPrixEditComponent;
  let fixture: ComponentFixture<LigneBordereauPrixEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBordereauPrixEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBordereauPrixEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
