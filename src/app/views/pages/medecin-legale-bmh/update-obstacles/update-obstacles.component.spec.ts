import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObstaclesComponent } from './update-obstacles.component';

describe('UpdateObstaclesComponent', () => {
  let component: UpdateObstaclesComponent;
  let fixture: ComponentFixture<UpdateObstaclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateObstaclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
