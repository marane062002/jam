import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNatureComponent } from './show-nature.component';

describe('ShowNatureComponent', () => {
  let component: ShowNatureComponent;
  let fixture: ComponentFixture<ShowNatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowNatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
