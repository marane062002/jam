import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrganismeComponent } from './details-organisme.component';

describe('DetailsOrganismeComponent', () => {
  let component: DetailsOrganismeComponent;
  let fixture: ComponentFixture<DetailsOrganismeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrganismeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrganismeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
