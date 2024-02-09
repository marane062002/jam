import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFestivalesComponent } from './show-festivales.component';

describe('ShowFestivalesComponent', () => {
  let component: ShowFestivalesComponent;
  let fixture: ComponentFixture<ShowFestivalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFestivalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFestivalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
