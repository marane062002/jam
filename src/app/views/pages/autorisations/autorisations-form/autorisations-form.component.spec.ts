import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationsFormComponent } from './autorisations-form.component';

describe('AutorisationsFormComponent', () => {
  let component: AutorisationsFormComponent;
  let fixture: ComponentFixture<AutorisationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
