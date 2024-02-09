import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLocauxComponent } from './show-locaux.component';

describe('ShowLocauxComponent', () => {
  let component: ShowLocauxComponent;
  let fixture: ComponentFixture<ShowLocauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLocauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLocauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
