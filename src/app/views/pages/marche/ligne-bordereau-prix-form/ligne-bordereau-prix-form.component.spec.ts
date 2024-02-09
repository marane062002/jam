import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneBordereauPrixFormComponent } from './ligne-bordereau-prix-form.component';

describe('LigneBordereauPrixFormComponent', () => {
  let component: LigneBordereauPrixFormComponent;
  let fixture: ComponentFixture<LigneBordereauPrixFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneBordereauPrixFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneBordereauPrixFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
