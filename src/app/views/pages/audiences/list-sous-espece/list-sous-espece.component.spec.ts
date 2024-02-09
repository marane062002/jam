import { async, ComponentFixture, TestBed } from '@angular/core/testing';



import { ListSousEspeceComponent } from './list-sous-espece.component';

describe('ListSousEspeceComponent', () => {
  let component: ListSousEspeceComponent;
  let fixture: ComponentFixture<ListSousEspeceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSousEspeceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSousEspeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
