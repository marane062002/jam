import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheShowComponent } from './marche-show.component';

describe('MarcheShowComponent', () => {
  let component: MarcheShowComponent;
  let fixture: ComponentFixture<MarcheShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcheShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
