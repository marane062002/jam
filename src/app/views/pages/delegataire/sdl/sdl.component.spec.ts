import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdlComponent } from './sdl.component';

describe('SDLComponent', () => {
  let component: SdlComponent;
  let fixture: ComponentFixture<SdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
