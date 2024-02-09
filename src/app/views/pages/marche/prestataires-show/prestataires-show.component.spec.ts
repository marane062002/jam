import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesShowComponent } from './prestataires-show.component';

describe('PrestatairesShowComponent', () => {
  let component: PrestatairesShowComponent;
  let fixture: ComponentFixture<PrestatairesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestatairesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
