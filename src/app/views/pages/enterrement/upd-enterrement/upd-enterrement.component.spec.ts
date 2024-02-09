import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdEnterrementComponent } from './upd-enterrement.component';

describe('UpdEnterrementComponent', () => {
  let component: UpdEnterrementComponent;
  let fixture: ComponentFixture<UpdEnterrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdEnterrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdEnterrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
