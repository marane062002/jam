import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocauxComponent } from './edit-locaux.component';

describe('EditLocauxComponent', () => {
  let component: EditLocauxComponent;
  let fixture: ComponentFixture<EditLocauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
