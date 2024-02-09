import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreBureauAddComponent } from './membre-bureau-add.component';

describe('MembreBureauAddComponent', () => {
  let component: MembreBureauAddComponent;
  let fixture: ComponentFixture<MembreBureauAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreBureauAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreBureauAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
