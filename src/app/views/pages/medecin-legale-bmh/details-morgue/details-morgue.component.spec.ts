import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMorgueComponent } from './details-morgue.component';

describe('DetailsMorgueComponent', () => {
  let component: DetailsMorgueComponent;
  let fixture: ComponentFixture<DetailsMorgueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMorgueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMorgueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
