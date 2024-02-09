import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdapterTypePeseeComponent } from './adapter-type-pesee.component';



describe('AdapterTypePeseeComponent', () => {
  let component: AdapterTypePeseeComponent;
  let fixture: ComponentFixture<AdapterTypePeseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdapterTypePeseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterTypePeseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
