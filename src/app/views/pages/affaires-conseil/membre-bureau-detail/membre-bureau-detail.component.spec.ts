import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreBureauDetailComponent } from './membre-bureau-detail.component';

describe('MembreBureauDetailComponent', () => {
  let component: MembreBureauDetailComponent;
  let fixture: ComponentFixture<MembreBureauDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembreBureauDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembreBureauDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
