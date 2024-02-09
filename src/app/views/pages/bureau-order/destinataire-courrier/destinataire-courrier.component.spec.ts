import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinataireCourrierComponent } from './destinataire-courrier.component';

describe('DestinataireCourrierComponent', () => {
  let component: DestinataireCourrierComponent;
  let fixture: ComponentFixture<DestinataireCourrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinataireCourrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinataireCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
