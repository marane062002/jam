import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensEditComponent } from './biens-edit.component';

describe('BiensEditComponent', () => {
  let component: BiensEditComponent;
  let fixture: ComponentFixture<BiensEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiensEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiensEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
