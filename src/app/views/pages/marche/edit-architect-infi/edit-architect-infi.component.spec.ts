import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArchitectInfiComponent } from './edit-architect-infi.component';

describe('EditArchitectInfiComponent', () => {
  let component: EditArchitectInfiComponent;
  let fixture: ComponentFixture<EditArchitectInfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArchitectInfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArchitectInfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
