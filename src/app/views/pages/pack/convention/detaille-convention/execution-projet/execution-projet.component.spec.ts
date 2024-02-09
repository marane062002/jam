import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionProjetComponent } from './execution-projet.component';

describe('SuiviContributionComponent', () => {
  let component: ExecutionProjetComponent;
  let fixture: ComponentFixture<ExecutionProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
