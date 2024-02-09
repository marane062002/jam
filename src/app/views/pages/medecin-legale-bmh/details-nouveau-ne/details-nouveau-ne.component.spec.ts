import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNouveauNeComponent } from './details-nouveau-ne.component';

describe('DetailsNouveauNeComponent', () => {
  let component: DetailsNouveauNeComponent;
  let fixture: ComponentFixture<DetailsNouveauNeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsNouveauNeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNouveauNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
