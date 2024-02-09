import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationsEditComponent } from './autorisations-edit.component';

describe('AutorisationsEditComponent', () => {
  let component: AutorisationsEditComponent;
  let fixture: ComponentFixture<AutorisationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
