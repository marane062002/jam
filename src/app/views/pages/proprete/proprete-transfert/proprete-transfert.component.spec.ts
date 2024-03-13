import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropreteTransfertComponent } from './proprete-transfert.component';

describe('PropreteTransfertComponent', () => {
  let component: PropreteTransfertComponent;
  let fixture: ComponentFixture<PropreteTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropreteTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropreteTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
