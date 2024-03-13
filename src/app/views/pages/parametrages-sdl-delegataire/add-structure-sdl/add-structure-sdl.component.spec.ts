import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructureSdlComponent } from './add-structure-sdl.component';

describe('AddStructureSdlComponent', () => {
  let component: AddStructureSdlComponent;
  let fixture: ComponentFixture<AddStructureSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStructureSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructureSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
