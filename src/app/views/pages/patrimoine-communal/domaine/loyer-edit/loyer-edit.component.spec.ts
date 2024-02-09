import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyerEditComponent } from './loyer-edit.component';

describe('LoyerEditComponent', () => {
  let component: LoyerEditComponent;
  let fixture: ComponentFixture<LoyerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
