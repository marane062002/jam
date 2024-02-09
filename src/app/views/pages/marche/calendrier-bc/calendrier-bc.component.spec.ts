import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierBcComponent } from './calendrier-bc.component';

describe('CalendrierBcComponent', () => {
  let component: CalendrierBcComponent;
  let fixture: ComponentFixture<CalendrierBcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierBcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
