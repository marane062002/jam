import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmatriculationShowComponent } from './immatriculation-show.component';

describe('ImmatriculationShowComponent', () => {
  let component: ImmatriculationShowComponent;
  let fixture: ComponentFixture<ImmatriculationShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmatriculationShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmatriculationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
