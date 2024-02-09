import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesComponent } from './prestataires.component';

describe('PrestatairesComponent', () => {
  let component: PrestatairesComponent;
  let fixture: ComponentFixture<PrestatairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestatairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
