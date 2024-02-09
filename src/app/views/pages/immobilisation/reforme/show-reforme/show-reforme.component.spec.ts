import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReformeComponent } from './show-reforme.component';

describe('ShowReformeComponent', () => {
  let component: ShowReformeComponent;
  let fixture: ComponentFixture<ShowReformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowReformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
