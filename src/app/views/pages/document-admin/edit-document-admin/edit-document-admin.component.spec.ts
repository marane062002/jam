import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentAdminComponent } from './edit-document-admin.component';

describe('EditDocumentAdminComponent', () => {
  let component: EditDocumentAdminComponent;
  let fixture: ComponentFixture<EditDocumentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocumentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
