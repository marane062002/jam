import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceIndexComponent } from './permanence-index.component';

describe('PermanenceIndexComponent', () => {
  let component: PermanenceIndexComponent;
  let fixture: ComponentFixture<PermanenceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
