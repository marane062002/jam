import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTypeMarcheComponent } from './show-type-marche.component';

describe('ShowTypeMarcheComponent', () => {
  let component: ShowTypeMarcheComponent;
  let fixture: ComponentFixture<ShowTypeMarcheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTypeMarcheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTypeMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
