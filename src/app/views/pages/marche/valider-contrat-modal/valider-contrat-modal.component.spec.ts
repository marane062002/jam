import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderContratModalComponent } from './valider-contrat-modal.component';

describe('ValiderContratModalComponent', () => {
  let component: ValiderContratModalComponent;
  let fixture: ComponentFixture<ValiderContratModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderContratModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderContratModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
