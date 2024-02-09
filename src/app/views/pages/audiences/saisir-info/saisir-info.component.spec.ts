import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisirInfoComponent } from './saisir-info.component';

describe('SaisirInfoComponent', () => {
  let component: SaisirInfoComponent;
  let fixture: ComponentFixture<SaisirInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisirInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisirInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
