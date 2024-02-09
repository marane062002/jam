import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderBcModalComponent } from './valider-bc-modal.component';

describe('ValiderBcModalComponent', () => {
  let component: ValiderBcModalComponent;
  let fixture: ComponentFixture<ValiderBcModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderBcModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderBcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
