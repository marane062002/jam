import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AoJournauxComponent } from './ao-journaux.component';

describe('AoJournauxComponent', () => {
  let component: AoJournauxComponent;
  let fixture: ComponentFixture<AoJournauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AoJournauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AoJournauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
