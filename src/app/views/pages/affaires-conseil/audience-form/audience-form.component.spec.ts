import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceFormComponent } from './audience-form.component';

describe('AudienceFormComponent', () => {
  let component: AudienceFormComponent;
  let fixture: ComponentFixture<AudienceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
