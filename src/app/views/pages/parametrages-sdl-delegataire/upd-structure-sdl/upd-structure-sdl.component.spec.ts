import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdStructureSdlComponent } from './upd-structure-sdl.component';

describe('UpdStructureSdlComponent', () => {
  let component: UpdStructureSdlComponent;
  let fixture: ComponentFixture<UpdStructureSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdStructureSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdStructureSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
