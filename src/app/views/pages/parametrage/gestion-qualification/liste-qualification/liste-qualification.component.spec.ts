import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeQualificationComponent } from './liste-qualification.component';

describe('ListeQualificationComponent', () => {
  let component: ListeQualificationComponent;
  let fixture: ComponentFixture<ListeQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
