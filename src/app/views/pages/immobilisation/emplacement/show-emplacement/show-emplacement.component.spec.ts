import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmplacementComponent } from './show-emplacement.component';

describe('ShowEmplacementComponent', () => {
  let component: ShowEmplacementComponent;
  let fixture: ComponentFixture<ShowEmplacementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmplacementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
