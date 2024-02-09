import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFournissuerComponent } from './new-fournissuer.component';

describe('NewFournissuerComponent', () => {
  let component: NewFournissuerComponent;
  let fixture: ComponentFixture<NewFournissuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFournissuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFournissuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
