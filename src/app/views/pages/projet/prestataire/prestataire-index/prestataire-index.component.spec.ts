import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestataireIndexComponent } from './prestataire-index.component';

describe('PrestataireIndexComponent', () => {
  let component: PrestataireIndexComponent;
  let fixture: ComponentFixture<PrestataireIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestataireIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestataireIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
