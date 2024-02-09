import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganismeComponent } from './list-organisme.component';

describe('ListOrganismeComponent', () => {
  let component: ListOrganismeComponent;
  let fixture: ComponentFixture<ListOrganismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrganismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
