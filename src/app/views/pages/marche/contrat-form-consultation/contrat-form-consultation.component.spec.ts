import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContratFormConsultationComponent } from './contrat-form-consultation.component';


describe('ContratFormComponent', () => {
  let component: ContratFormConsultationComponent;
  let fixture: ComponentFixture<ContratFormConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratFormConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratFormConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
