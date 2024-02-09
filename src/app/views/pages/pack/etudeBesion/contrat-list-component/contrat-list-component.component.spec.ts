import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratListComponentComponent } from './contrat-list-component.component';

describe('ContratListComponentComponent', () => {
  let component: ContratListComponentComponent;
  let fixture: ComponentFixture<ContratListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
