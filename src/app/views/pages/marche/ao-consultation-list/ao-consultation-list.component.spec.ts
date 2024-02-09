import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoConsultationListComponent } from './ao-consultation-list.component';

describe('AoConsultationListComponent', () => {
  let component: AoConsultationListComponent;
  let fixture: ComponentFixture<AoConsultationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoConsultationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoConsultationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
