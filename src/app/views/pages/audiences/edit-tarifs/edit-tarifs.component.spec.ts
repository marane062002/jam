import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTarifsComponent } from './edit-tarifs.component';

describe('EditTarifsComponent', () => {
  let component: EditTarifsComponent;
  let fixture: ComponentFixture<EditTarifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTarifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
