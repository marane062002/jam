import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganismeComponent } from './edit-organisme.component';

describe('EditOrganismeComponent', () => {
  let component: EditOrganismeComponent;
  let fixture: ComponentFixture<EditOrganismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrganismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
