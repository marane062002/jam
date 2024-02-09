import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceMarcheComponent } from './reference-marche.component';

describe('ReferenceMarcheComponent', () => {
  let component: ReferenceMarcheComponent;
  let fixture: ComponentFixture<ReferenceMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceMarcheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
