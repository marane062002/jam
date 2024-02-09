import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAdminAdjucataireComponent } from './doc-admin-adjucataire.component';

describe('DocAdminAdjucataireComponent', () => {
  let component: DocAdminAdjucataireComponent;
  let fixture: ComponentFixture<DocAdminAdjucataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocAdminAdjucataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocAdminAdjucataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
