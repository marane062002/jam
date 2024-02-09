import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdCarteComponent } from './upd-carte.component';

describe('UpdCarteComponent', () => {
  let component: UpdCarteComponent;
  let fixture: ComponentFixture<UpdCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
