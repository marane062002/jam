import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabSdlComponent } from './add-tab-sdl.component';

describe('AddTabSdlComponent', () => {
  let component: AddTabSdlComponent;
  let fixture: ComponentFixture<AddTabSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTabSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTabSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
