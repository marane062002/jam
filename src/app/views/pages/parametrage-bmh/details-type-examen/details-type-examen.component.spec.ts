import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeExamenComponent } from './details-type-examen.component';

describe('DetailsTypeExamenComponent', () => {
  let component: DetailsTypeExamenComponent;
  let fixture: ComponentFixture<DetailsTypeExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
