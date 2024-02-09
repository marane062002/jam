import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClassificationComponent } from './show-classification.component';

describe('ShowClassificationComponent', () => {
  let component: ShowClassificationComponent;
  let fixture: ComponentFixture<ShowClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
