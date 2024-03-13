import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDechargeComponent } from './edit-decharge.component';

describe('EditDechargeComponent', () => {
  let component: EditDechargeComponent;
  let fixture: ComponentFixture<EditDechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
