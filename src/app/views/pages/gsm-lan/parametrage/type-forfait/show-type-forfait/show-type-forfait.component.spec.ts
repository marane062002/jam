import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTypeForfaitComponent } from './show-type-forfait.component';

describe('ShowTypeForfaitComponent', () => {
  let component: ShowTypeForfaitComponent;
  let fixture: ComponentFixture<ShowTypeForfaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTypeForfaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTypeForfaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
