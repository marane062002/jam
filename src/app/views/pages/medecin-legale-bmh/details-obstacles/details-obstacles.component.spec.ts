import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsObstaclesComponent } from './details-obstacles.component';

describe('DetailsObstaclesComponent', () => {
  let component: DetailsObstaclesComponent;
  let fixture: ComponentFixture<DetailsObstaclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsObstaclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsObstaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
