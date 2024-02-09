import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleSortieComponent } from './detaille-sortie.component';

describe('DetailleSortieComponent', () => {
  let component: DetailleSortieComponent;
  let fixture: ComponentFixture<DetailleSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
