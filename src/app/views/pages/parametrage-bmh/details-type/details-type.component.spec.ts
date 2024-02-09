import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeComponent } from './details-type.component';

describe('DetailsTypeComponent', () => {
  let component: DetailsTypeComponent;
  let fixture: ComponentFixture<DetailsTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
