import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsPointListComponent } from './decisions-point-list.component';

describe('DecisionsPointListComponent', () => {
  let component: DecisionsPointListComponent;
  let fixture: ComponentFixture<DecisionsPointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionsPointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionsPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
