import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrigineCourriersSortantsComponent } from './show-origine-courriers-sortants.component';

describe('ShowOrigineCourriersSortantsComponent', () => {
  let component: ShowOrigineCourriersSortantsComponent;
  let fixture: ComponentFixture<ShowOrigineCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrigineCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrigineCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
