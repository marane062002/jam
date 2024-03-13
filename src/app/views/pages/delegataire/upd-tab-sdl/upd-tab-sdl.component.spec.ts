import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdTabSdlComponent } from './upd-tab-sdl.component';

describe('UpdTabSdlComponent', () => {
  let component: UpdTabSdlComponent;
  let fixture: ComponentFixture<UpdTabSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdTabSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdTabSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
