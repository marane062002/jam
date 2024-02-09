import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQualificationComponent } from './show-qualification.component';

describe('ShowQualificationComponent', () => {
  let component: ShowQualificationComponent;
  let fixture: ComponentFixture<ShowQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
