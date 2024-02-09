import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvmlocationEditComponent } from './mvmlocation-edit.component';

describe('MvmlocationEditComponent', () => {
  let component: MvmlocationEditComponent;
  let fixture: ComponentFixture<MvmlocationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvmlocationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvmlocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
