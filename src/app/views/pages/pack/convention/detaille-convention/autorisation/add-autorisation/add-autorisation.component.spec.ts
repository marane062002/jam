import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutorisationComponent } from './add-autorisation.component';

describe('AddAutorisationComponent', () => {
  let component: AddAutorisationComponent;
  let fixture: ComponentFixture<AddAutorisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutorisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
