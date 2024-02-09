import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganismeComponent } from './add-organisme.component';

describe('AddOrganismeComponent', () => {
  let component: AddOrganismeComponent;
  let fixture: ComponentFixture<AddOrganismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrganismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
