import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideTresorerieConsultationComponent } from './valide-tresorerie-consultation.component';

describe('ValideTresorerieConsultationComponent', () => {
  let component: ValideTresorerieConsultationComponent;
  let fixture: ComponentFixture<ValideTresorerieConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValideTresorerieConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValideTresorerieConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
