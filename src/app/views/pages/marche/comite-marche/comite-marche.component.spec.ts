import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteMarcheComponent } from './comite-marche.component';

describe('ComiteMarcheComponent', () => {
  let component: ComiteMarcheComponent;
  let fixture: ComponentFixture<ComiteMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComiteMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComiteMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
