import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuantiteComponent } from './details-quantite.component';

describe('DetailsQuantiteComponent', () => {
  let component: DetailsQuantiteComponent;
  let fixture: ComponentFixture<DetailsQuantiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsQuantiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsQuantiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
