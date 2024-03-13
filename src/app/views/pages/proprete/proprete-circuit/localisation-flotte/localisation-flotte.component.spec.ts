import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationFlotteComponent } from './localisation-flotte.component';

describe('LocalisationFlotteComponent', () => {
  let component: LocalisationFlotteComponent;
  let fixture: ComponentFixture<LocalisationFlotteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalisationFlotteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalisationFlotteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
