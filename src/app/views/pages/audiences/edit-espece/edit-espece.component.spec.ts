import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEspeceComponent } from './edit-espece.component';

describe('EditEspeceComponent', () => {
  let component: EditEspeceComponent;
  let fixture: ComponentFixture<EditEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
