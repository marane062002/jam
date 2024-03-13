import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreTransfertComponent } from './centre-transfert.component';

describe('CentreTransfertComponent', () => {
  let component: CentreTransfertComponent;
  let fixture: ComponentFixture<CentreTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentreTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
