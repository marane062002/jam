import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorisationsListComponent } from './autorisations-list.component';

describe('AutorisationsListComponent', () => {
  let component: AutorisationsListComponent;
  let fixture: ComponentFixture<AutorisationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorisationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorisationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
