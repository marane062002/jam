import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurationComponent } from './add-restauration.component';

describe('AddRestaurationComponent', () => {
  let component: AddRestaurationComponent;
  let fixture: ComponentFixture<AddRestaurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRestaurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
