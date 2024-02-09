import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisiteComponent } from './list-visite.component';

describe('ListVisiteComponent', () => {
  let component: ListVisiteComponent;
  let fixture: ComponentFixture<ListVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
