import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartementShowComponent } from './appartement-show.component';

describe('AppartementShowComponent', () => {
  let component: AppartementShowComponent;
  let fixture: ComponentFixture<AppartementShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppartementShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppartementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
