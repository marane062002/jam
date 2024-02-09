import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculDixJoursModalComponent } from './calcul-dix-jours-modal.component';

describe('CalculDixJoursModalComponent', () => {
  let component: CalculDixJoursModalComponent;
  let fixture: ComponentFixture<CalculDixJoursModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculDixJoursModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculDixJoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
