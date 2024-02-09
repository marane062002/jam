import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreBureauEditComponent } from './membre-bureau-edit.component';

describe('MembreBureauEditComponent', () => {
  let component: MembreBureauEditComponent;
  let fixture: ComponentFixture<MembreBureauEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreBureauEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreBureauEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
