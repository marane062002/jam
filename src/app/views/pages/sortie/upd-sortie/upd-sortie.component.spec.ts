import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdSortieComponent } from './upd-sortie.component';

describe('UpdSortieComponent', () => {
  let component: UpdSortieComponent;
  let fixture: ComponentFixture<UpdSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdSortieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
