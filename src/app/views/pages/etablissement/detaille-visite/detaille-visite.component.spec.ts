import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailleVisiteComponent } from './detaille-visite.component';

describe('DetailleVisiteComponent', () => {
  let component: DetailleVisiteComponent;
  let fixture: ComponentFixture<DetailleVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailleVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailleVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
