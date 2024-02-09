import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsPointEditComponent } from './decisions-point-edit.component';

describe('DecisionsPointEditComponent', () => {
  let component: DecisionsPointEditComponent;
  let fixture: ComponentFixture<DecisionsPointEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsPointEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsPointEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
