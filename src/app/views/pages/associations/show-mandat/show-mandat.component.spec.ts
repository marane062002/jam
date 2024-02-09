import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMandatComponent } from './show-mandat.component';

describe('ShowMandatComponent', () => {
  let component: ShowMandatComponent;
  let fixture: ComponentFixture<ShowMandatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMandatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMandatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
