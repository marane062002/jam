import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypePlatComponent } from './add-type-plat.component';

describe('AddTypePlatComponent', () => {
  let component: AddTypePlatComponent;
  let fixture: ComponentFixture<AddTypePlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypePlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
