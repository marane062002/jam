import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibiliteFondsComponent } from './disponibilite-fonds.component';

describe('DisponibiliteFondsComponent', () => {
  let component: DisponibiliteFondsComponent;
  let fixture: ComponentFixture<DisponibiliteFondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibiliteFondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibiliteFondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
