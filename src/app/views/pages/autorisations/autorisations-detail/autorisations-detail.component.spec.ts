import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationsDetailComponent } from './autorisations-detail.component';

describe('AutorisationsDetailComponent', () => {
  let component: AutorisationsDetailComponent;
  let fixture: ComponentFixture<AutorisationsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
