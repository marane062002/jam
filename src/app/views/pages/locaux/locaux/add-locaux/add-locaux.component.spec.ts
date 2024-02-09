import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocauxComponent } from './add-locaux.component';

describe('AddLocauxComponent', () => {
  let component: AddLocauxComponent;
  let fixture: ComponentFixture<AddLocauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
