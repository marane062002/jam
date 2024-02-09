import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiePreneurListComponent } from './partie-preneur-list.component';

describe('PartiePreneurListComponent', () => {
  let component: PartiePreneurListComponent;
  let fixture: ComponentFixture<PartiePreneurListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiePreneurListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiePreneurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
