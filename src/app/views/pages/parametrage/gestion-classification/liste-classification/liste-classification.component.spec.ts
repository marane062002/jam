import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeClassificationComponent } from './liste-classification.component';

describe('ListeClassificationComponent', () => {
  let component: ListeClassificationComponent;
  let fixture: ComponentFixture<ListeClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
