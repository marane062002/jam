import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleVaccinationComponent } from './detaille-vaccination.component';

describe('DetailleVaccinationComponent', () => {
  let component: DetailleVaccinationComponent;
  let fixture: ComponentFixture<DetailleVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
