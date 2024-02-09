import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTransfertComponent } from './details-transfert.component';

describe('DetailsTransfertComponent', () => {
  let component: DetailsTransfertComponent;
  let fixture: ComponentFixture<DetailsTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
