import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestataireEditComponent } from './prestataire-edit.component';

describe('PrestataireEditComponent', () => {
  let component: PrestataireEditComponent;
  let fixture: ComponentFixture<PrestataireEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestataireEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestataireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
