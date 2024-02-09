import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigineCourriersSortantsComponent } from './origine-courriers-sortants.component';

describe('OrigineCourriersSortantsComponent', () => {
  let component: OrigineCourriersSortantsComponent;
  let fixture: ComponentFixture<OrigineCourriersSortantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrigineCourriersSortantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigineCourriersSortantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
