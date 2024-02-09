import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConducteurComponent } from './details-conducteur.component';

describe('DetailsConducteurComponent', () => {
  let component: DetailsConducteurComponent;
  let fixture: ComponentFixture<DetailsConducteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsConducteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
