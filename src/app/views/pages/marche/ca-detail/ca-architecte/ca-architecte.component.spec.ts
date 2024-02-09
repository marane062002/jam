import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaArchitecteComponent } from './ca-architecte.component';

describe('CaArchitecteComponent', () => {
  let component: CaArchitecteComponent;
  let fixture: ComponentFixture<CaArchitecteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaArchitecteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaArchitecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
