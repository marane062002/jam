import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImpressionComponent } from './show-impression.component';

describe('ShowImpressionComponent', () => {
  let component: ShowImpressionComponent;
  let fixture: ComponentFixture<ShowImpressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImpressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
