import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmplacementComponent } from './new-emplacement.component';

describe('NewEmplacementComponent', () => {
  let component: NewEmplacementComponent;
  let fixture: ComponentFixture<NewEmplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
