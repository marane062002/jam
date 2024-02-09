import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeShowComponent } from './conge-show.component';

describe('CongeShowComponent', () => {
  let component: CongeShowComponent;
  let fixture: ComponentFixture<CongeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
