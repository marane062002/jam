import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteFlotteComponent } from './proprete-flotte.component';

describe('PropreteFlotteComponent', () => {
  let component: PropreteFlotteComponent;
  let fixture: ComponentFixture<PropreteFlotteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteFlotteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteFlotteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
