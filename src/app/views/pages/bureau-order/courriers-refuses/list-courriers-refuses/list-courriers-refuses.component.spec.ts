import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourriersRefusesComponent } from './list-courriers-refuses.component';

describe('ListCourriersRefusesComponent', () => {
  let component: ListCourriersRefusesComponent;
  let fixture: ComponentFixture<ListCourriersRefusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCourriersRefusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCourriersRefusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
