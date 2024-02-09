import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsEditComponent } from './reclamations-edit.component';

describe('ReclamationsEditComponent', () => {
  let component: ReclamationsEditComponent;
  let fixture: ComponentFixture<ReclamationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
