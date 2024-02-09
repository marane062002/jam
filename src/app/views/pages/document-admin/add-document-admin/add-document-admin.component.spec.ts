import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentAdminComponent } from './add-document-admin.component';

describe('AddDocumentAdminComponent', () => {
  let component: AddDocumentAdminComponent;
  let fixture: ComponentFixture<AddDocumentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
