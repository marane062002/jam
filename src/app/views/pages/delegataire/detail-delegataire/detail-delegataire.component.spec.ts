import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDelegataireComponent } from './detail-delegataire.component';

describe('DetailDelegataireComponent', () => {
  let component: DetailDelegataireComponent;
  let fixture: ComponentFixture<DetailDelegataireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDelegataireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDelegataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
