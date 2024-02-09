import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestataireShowComponent } from './prestataire-show.component';

describe('PrestataireShowComponent', () => {
  let component: PrestataireShowComponent;
  let fixture: ComponentFixture<PrestataireShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestataireShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestataireShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
