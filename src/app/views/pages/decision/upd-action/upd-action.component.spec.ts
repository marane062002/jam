import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdActionComponent } from './upd-action.component';

describe('UpdActionComponent', () => {
  let component: UpdActionComponent;
  let fixture: ComponentFixture<UpdActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
