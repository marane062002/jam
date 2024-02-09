import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoConsultationEditComponent } from './ao-consultation-edit.component';

describe('AoConsultationEditComponent', () => {
  let component: AoConsultationEditComponent;
  let fixture: ComponentFixture<AoConsultationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoConsultationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoConsultationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
