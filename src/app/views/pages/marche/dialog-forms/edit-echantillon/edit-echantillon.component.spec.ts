import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEchantillonComponent } from './edit-echantillon.component';

describe('EditEchantillonComponent', () => {
  let component: EditEchantillonComponent;
  let fixture: ComponentFixture<EditEchantillonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEchantillonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEchantillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
