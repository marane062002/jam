import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdTypeComponent } from './upd-type.component';

describe('UpdTypeComponent', () => {
  let component: UpdTypeComponent;
  let fixture: ComponentFixture<UpdTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
