import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideTresorierComponent } from './valide-tresorier.component';

describe('ValideTresorierComponent', () => {
  let component: ValideTresorierComponent;
  let fixture: ComponentFixture<ValideTresorierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValideTresorierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValideTresorierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
