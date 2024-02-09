import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProduitUtiliseComponent } from './details-produit-utilise.component';

describe('DetailsProduitUtiliseComponent', () => {
  let component: DetailsProduitUtiliseComponent;
  let fixture: ComponentFixture<DetailsProduitUtiliseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProduitUtiliseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProduitUtiliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
