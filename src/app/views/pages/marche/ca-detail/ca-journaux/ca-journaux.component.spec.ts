import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaJournauxComponent } from './ca-journaux.component';

describe('CaJournauxComponent', () => {
  let component: CaJournauxComponent;
  let fixture: ComponentFixture<CaJournauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaJournauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaJournauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
