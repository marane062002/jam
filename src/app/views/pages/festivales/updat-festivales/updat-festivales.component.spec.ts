import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatFestivalesComponent } from './updat-festivales.component';

describe('UpdatFestivalesComponent', () => {
  let component: UpdatFestivalesComponent;
  let fixture: ComponentFixture<UpdatFestivalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatFestivalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatFestivalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
