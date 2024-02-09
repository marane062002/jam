import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdProgrammeComponent } from './upd-programme.component';

describe('UpdProgrammeComponent', () => {
  let component: UpdProgrammeComponent;
  let fixture: ComponentFixture<UpdProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
