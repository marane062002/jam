import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgrammeRetroplanningComponent } from './show-programme-retroplanning.component';

describe('ShowProgrammeRetroplanningComponent', () => {
  let component: ShowProgrammeRetroplanningComponent;
  let fixture: ComponentFixture<ShowProgrammeRetroplanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProgrammeRetroplanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProgrammeRetroplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
