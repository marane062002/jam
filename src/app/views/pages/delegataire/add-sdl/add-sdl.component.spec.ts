import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSdlComponent } from './add-sdl.component';

describe('AddSdlComponent', () => {
  let component: AddSdlComponent;
  let fixture: ComponentFixture<AddSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
