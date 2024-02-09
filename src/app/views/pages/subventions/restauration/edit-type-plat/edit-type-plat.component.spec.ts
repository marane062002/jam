import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypePlatComponent } from './edit-type-plat.component';

describe('EditTypePlatComponent', () => {
  let component: EditTypePlatComponent;
  let fixture: ComponentFixture<EditTypePlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypePlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
