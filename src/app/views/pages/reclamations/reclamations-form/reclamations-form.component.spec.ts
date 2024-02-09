import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsFormComponent } from './reclamations-form.component';

describe('ReclamationsFormComponent', () => {
  let component: ReclamationsFormComponent;
  let fixture: ComponentFixture<ReclamationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
