import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidePresidentComponent } from './valide-president.component';

describe('ValidePresidentComponent', () => {
  let component: ValidePresidentComponent;
  let fixture: ComponentFixture<ValidePresidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidePresidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidePresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
