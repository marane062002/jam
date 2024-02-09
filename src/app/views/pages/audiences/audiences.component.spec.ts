import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesComponent } from './audiences.component';

describe('AudiencesComponent', () => {
  let component: AudiencesComponent;
  let fixture: ComponentFixture<AudiencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
