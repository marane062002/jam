import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageBmhComponent } from './parametrage-bmh.component';

describe('ParametrageBmhComponent', () => {
  let component: ParametrageBmhComponent;
  let fixture: ComponentFixture<ParametrageBmhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrageBmhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageBmhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
