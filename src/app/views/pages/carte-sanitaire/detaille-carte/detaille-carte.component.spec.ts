import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleCarteComponent } from './detaille-carte.component';

describe('DetailleCarteComponent', () => {
  let component: DetailleCarteComponent;
  let fixture: ComponentFixture<DetailleCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
