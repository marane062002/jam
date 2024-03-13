import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegroupementComponent } from './add-regroupement.component';

describe('AddRegroupementComponent', () => {
  let component: AddRegroupementComponent;
  let fixture: ComponentFixture<AddRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
