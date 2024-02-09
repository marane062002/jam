import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrigineComponent } from './details-origine.component';

describe('DetailsOrigineComponent', () => {
  let component: DetailsOrigineComponent;
  let fixture: ComponentFixture<DetailsOrigineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrigineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrigineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
