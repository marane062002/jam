import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienReservatiosDetailComponent } from './bien-reservatios-detail.component';

describe('BienReservatiosDetailComponent', () => {
  let component: BienReservatiosDetailComponent;
  let fixture: ComponentFixture<BienReservatiosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienReservatiosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienReservatiosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
