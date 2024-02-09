import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoConsultationAddComponent } from './ao-consultation-add.component';

describe('AoConsultationAddComponent', () => {
  let component: AoConsultationAddComponent;
  let fixture: ComponentFixture<AoConsultationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoConsultationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoConsultationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
