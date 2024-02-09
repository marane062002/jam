import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceEditComponent } from './audience-edit.component';

describe('AudienceEditComponent', () => {
  let component: AudienceEditComponent;
  let fixture: ComponentFixture<AudienceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudienceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudienceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
