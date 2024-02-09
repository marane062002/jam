import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepondreCourrierConvocationComponent } from './repondre-courrier-convocation.component';

describe('RepondreCourrierConvocationComponent', () => {
  let component: RepondreCourrierConvocationComponent;
  let fixture: ComponentFixture<RepondreCourrierConvocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepondreCourrierConvocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepondreCourrierConvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
