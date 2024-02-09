import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfosComponent } from './detail-infos.component';

describe('DetailInfosComponent', () => {
  let component: DetailInfosComponent;
  let fixture: ComponentFixture<DetailInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
