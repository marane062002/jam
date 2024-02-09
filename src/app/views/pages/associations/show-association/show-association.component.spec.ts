import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssociationComponent } from './show-association.component';

describe('ShowAssociationComponent', () => {
  let component: ShowAssociationComponent;
  let fixture: ComponentFixture<ShowAssociationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAssociationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
