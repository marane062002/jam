import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeIndicateurSdlComponent } from './add-type-indicateur-sdl.component';

describe('AddTypeIndicateurSdlComponent', () => {
  let component: AddTypeIndicateurSdlComponent;
  let fixture: ComponentFixture<AddTypeIndicateurSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeIndicateurSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeIndicateurSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
