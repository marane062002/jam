import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNouveauNeComponent } from './add-nouveau-ne.component';

describe('AddNouveauNeComponent', () => {
  let component: AddNouveauNeComponent;
  let fixture: ComponentFixture<AddNouveauNeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNouveauNeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNouveauNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
