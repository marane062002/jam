import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartiePreneurComponent } from './new-partie-preneur.component';

describe('NewPartiePreneurComponent', () => {
  let component: NewPartiePreneurComponent;
  let fixture: ComponentFixture<NewPartiePreneurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPartiePreneurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartiePreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
