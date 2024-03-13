import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteContratsComponent } from './proprete-contrats.component';

describe('PropreteContratsComponent', () => {
  let component: PropreteContratsComponent;
  let fixture: ComponentFixture<PropreteContratsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteContratsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
