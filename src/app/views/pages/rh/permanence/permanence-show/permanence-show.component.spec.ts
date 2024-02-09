import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceShowComponent } from './permanence-show.component';

describe('PermanenceShowComponent', () => {
  let component: PermanenceShowComponent;
  let fixture: ComponentFixture<PermanenceShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
