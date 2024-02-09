import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValideTresorerieComponent } from './valide-tresorerie.component';

describe('ValideTresorerieComponent', () => {
  let component: ValideTresorerieComponent;
  let fixture: ComponentFixture<ValideTresorerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValideTresorerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValideTresorerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
