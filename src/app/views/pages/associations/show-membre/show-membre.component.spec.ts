import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMembreComponent } from './show-membre.component';

describe('ShowMembreComponent', () => {
  let component: ShowMembreComponent;
  let fixture: ComponentFixture<ShowMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
