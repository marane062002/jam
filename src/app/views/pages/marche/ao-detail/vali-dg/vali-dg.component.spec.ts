import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiDgComponent } from './vali-dg.component';

describe('ValiDgComponent', () => {
  let component: ValiDgComponent;
  let fixture: ComponentFixture<ValiDgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiDgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
