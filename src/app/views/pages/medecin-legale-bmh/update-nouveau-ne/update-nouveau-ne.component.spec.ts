import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNouveauNeComponent } from './update-nouveau-ne.component';

describe('UpdateNouveauNeComponent', () => {
  let component: UpdateNouveauNeComponent;
  let fixture: ComponentFixture<UpdateNouveauNeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNouveauNeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNouveauNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
