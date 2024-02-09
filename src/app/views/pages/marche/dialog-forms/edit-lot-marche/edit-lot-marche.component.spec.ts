import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLotMarcheComponent } from './edit-lot-marche.component';

describe('EditLotMarcheComponent', () => {
  let component: EditLotMarcheComponent;
  let fixture: ComponentFixture<EditLotMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLotMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLotMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
