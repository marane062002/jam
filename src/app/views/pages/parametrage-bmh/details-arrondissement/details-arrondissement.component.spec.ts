import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsArrondissementComponent } from './details-arrondissement.component';

describe('DetailsArrondissementComponent', () => {
  let component: DetailsArrondissementComponent;
  let fixture: ComponentFixture<DetailsArrondissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsArrondissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsArrondissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
