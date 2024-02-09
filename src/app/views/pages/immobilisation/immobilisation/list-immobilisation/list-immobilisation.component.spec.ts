import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImmobilisationComponent } from './list-immobilisation.component';

describe('ListImmobilisationComponent', () => {
  let component: ListImmobilisationComponent;
  let fixture: ComponentFixture<ListImmobilisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImmobilisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImmobilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
