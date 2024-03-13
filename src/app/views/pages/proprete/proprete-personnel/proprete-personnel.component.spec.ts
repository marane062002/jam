import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropretePersonnelComponent } from './proprete-personnel.component';

describe('PropretePersonnelComponent', () => {
  let component: PropretePersonnelComponent;
  let fixture: ComponentFixture<PropretePersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropretePersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropretePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
