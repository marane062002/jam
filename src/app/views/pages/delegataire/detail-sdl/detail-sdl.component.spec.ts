import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSdlComponent } from './detail-sdl.component';

describe('DetailSDLComponent', () => {
  let component: DetailSdlComponent;
  let fixture: ComponentFixture<DetailSdlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSdlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
