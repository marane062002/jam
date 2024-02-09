import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheDetailComponent } from './marche-detail.component';

describe('MarcheDetailComponent', () => {
  let component: MarcheDetailComponent;
  let fixture: ComponentFixture<MarcheDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcheDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
