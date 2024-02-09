import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartiePreneurComponent } from './detail-partie-preneur.component';

describe('DetailPartiePreneurComponent', () => {
  let component: DetailPartiePreneurComponent;
  let fixture: ComponentFixture<DetailPartiePreneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPartiePreneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPartiePreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
