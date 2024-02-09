import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgrammePrevisionnelComponent } from './show-programme-previsionnel.component';

describe('ShowProgrammePrevisionnelComponent', () => {
  let component: ShowProgrammePrevisionnelComponent;
  let fixture: ComponentFixture<ShowProgrammePrevisionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProgrammePrevisionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProgrammePrevisionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
