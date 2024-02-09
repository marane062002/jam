import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExamenComponent } from './details-examen.component';

describe('DetailsExamenComponent', () => {
  let component: DetailsExamenComponent;
  let fixture: ComponentFixture<DetailsExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
