import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContratEditConsultationComponent } from './contrat-edit-consultation.component';


describe('ContratEditConsultationComponent', () => {
  let component: ContratEditConsultationComponent;
  let fixture: ComponentFixture<ContratEditConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratEditConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratEditConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
