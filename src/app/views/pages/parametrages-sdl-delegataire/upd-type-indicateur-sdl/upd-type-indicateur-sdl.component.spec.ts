import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdTypeIndicateurSdlComponent } from './upd-type-indicateur-sdl.component';

describe('UpdTypeIndicateurSdlComponent', () => {
  let component: UpdTypeIndicateurSdlComponent;
  let fixture: ComponentFixture<UpdTypeIndicateurSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdTypeIndicateurSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdTypeIndicateurSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
