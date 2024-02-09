import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEquipeComponent } from './details-equipe.component';

describe('DetailsEquipeComponent', () => {
  let component: DetailsEquipeComponent;
  let fixture: ComponentFixture<DetailsEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
