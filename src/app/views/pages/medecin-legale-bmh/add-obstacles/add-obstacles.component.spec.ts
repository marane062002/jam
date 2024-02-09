import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObstaclesComponent } from './add-obstacles.component';

describe('AddObstaclesComponent', () => {
  let component: AddObstaclesComponent;
  let fixture: ComponentFixture<AddObstaclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObstaclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
