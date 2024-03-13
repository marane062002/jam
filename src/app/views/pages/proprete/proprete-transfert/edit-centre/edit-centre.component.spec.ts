import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCentreComponent } from './edit-centre.component';

describe('EditCentreComponent', () => {
  let component: EditCentreComponent;
  let fixture: ComponentFixture<EditCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
