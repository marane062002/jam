import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegatairesComponent } from './delegataires.component';

describe('DelegatairesComponent', () => {
  let component: DelegatairesComponent;
  let fixture: ComponentFixture<DelegatairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegatairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
