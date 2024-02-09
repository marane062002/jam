import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjAoComponent } from './pj-ao.component';

describe('PjAoComponent', () => {
  let component: PjAoComponent;
  let fixture: ComponentFixture<PjAoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjAoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
