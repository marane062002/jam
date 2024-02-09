import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubventionsComponent } from './show-subventions.component';

describe('ShowSubventionsComponent', () => {
  let component: ShowSubventionsComponent;
  let fixture: ComponentFixture<ShowSubventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSubventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSubventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
