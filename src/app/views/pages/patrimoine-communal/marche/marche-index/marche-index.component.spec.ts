import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheIndexComponent } from './marche-index.component';

describe('MarcheIndexComponent', () => {
  let component: MarcheIndexComponent;
  let fixture: ComponentFixture<MarcheIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcheIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcheIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
