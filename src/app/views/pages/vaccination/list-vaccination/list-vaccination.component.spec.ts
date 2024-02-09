import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVaccinationComponent } from './list-vaccination.component';

describe('ListVaccinationComponent', () => {
  let component: ListVaccinationComponent;
  let fixture: ComponentFixture<ListVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
