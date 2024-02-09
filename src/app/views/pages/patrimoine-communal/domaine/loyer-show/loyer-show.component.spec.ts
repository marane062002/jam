import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyerShowComponent } from './loyer-show.component';

describe('LoyerShowComponent', () => {
  let component: LoyerShowComponent;
  let fixture: ComponentFixture<LoyerShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyerShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
