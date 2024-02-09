import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNouveauNeComponent } from './list-nouveau-ne.component';

describe('ListNouveauNeComponent', () => {
  let component: ListNouveauNeComponent;
  let fixture: ComponentFixture<ListNouveauNeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNouveauNeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNouveauNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
