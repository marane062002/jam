import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsPointFormComponent } from './decisions-point-form.component';

describe('DecisionsPointFormComponent', () => {
  let component: DecisionsPointFormComponent;
  let fixture: ComponentFixture<DecisionsPointFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsPointFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsPointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
