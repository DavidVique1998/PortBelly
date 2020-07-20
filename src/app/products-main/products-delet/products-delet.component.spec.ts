import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDeletComponent } from './products-delet.component';

describe('ProductsDeletComponent', () => {
  let component: ProductsDeletComponent;
  let fixture: ComponentFixture<ProductsDeletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDeletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
