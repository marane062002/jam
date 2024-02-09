import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesEditComponent } from './prestataires-edit.component';

describe('PrestatairesEditComponent', () => {
  let component: PrestatairesEditComponent;
  let fixture: ComponentFixture<PrestatairesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestatairesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
