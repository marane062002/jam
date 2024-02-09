import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesFormComponent } from './prestataires-form.component';

describe('PrestatairesFormComponent', () => {
  let component: PrestatairesFormComponent;
  let fixture: ComponentFixture<PrestatairesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestatairesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
