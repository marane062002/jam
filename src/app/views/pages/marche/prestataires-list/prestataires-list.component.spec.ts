import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesListComponent } from './prestataires-list.component';

describe('PrestatairesListComponent', () => {
  let component: PrestatairesListComponent;
  let fixture: ComponentFixture<PrestatairesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestatairesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
