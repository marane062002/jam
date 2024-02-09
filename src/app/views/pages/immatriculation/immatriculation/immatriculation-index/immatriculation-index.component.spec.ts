import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmatriculationIndexComponent } from './immatriculation-index.component';

describe('ImmatriculationIndexComponent', () => {
  let component: ImmatriculationIndexComponent;
  let fixture: ComponentFixture<ImmatriculationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmatriculationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmatriculationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
