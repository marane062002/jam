import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDechargeComponent } from './add-decharge.component';

describe('AddDechargeComponent', () => {
  let component: AddDechargeComponent;
  let fixture: ComponentFixture<AddDechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
