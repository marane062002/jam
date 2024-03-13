import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteRegroupementComponent } from './proprete-regroupement.component';

describe('PropreteRegroupementComponent', () => {
  let component: PropreteRegroupementComponent;
  let fixture: ComponentFixture<PropreteRegroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteRegroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteRegroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
