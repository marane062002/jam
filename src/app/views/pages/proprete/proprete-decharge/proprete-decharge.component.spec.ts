import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteDechargeComponent } from './proprete-decharge.component';

describe('PropreteDechargeComponent', () => {
  let component: PropreteDechargeComponent;
  let fixture: ComponentFixture<PropreteDechargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteDechargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteDechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
