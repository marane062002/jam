import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObstaclesComponent } from './list-obstacles.component';

describe('ListObstaclesComponent', () => {
  let component: ListObstaclesComponent;
  let fixture: ComponentFixture<ListObstaclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListObstaclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
