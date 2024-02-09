import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCadavreComponent } from './details-cadavre.component';

describe('DetailsCadavreComponent', () => {
  let component: DetailsCadavreComponent;
  let fixture: ComponentFixture<DetailsCadavreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCadavreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCadavreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
