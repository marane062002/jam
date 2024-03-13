import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArrondissementComponent } from './show-arrondissement.component';

describe('ShowArrondissementComponent', () => {
  let component: ShowArrondissementComponent;
  let fixture: ComponentFixture<ShowArrondissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowArrondissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowArrondissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
