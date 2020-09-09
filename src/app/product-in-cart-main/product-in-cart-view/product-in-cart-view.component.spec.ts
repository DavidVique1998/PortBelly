import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInCartViewComponent } from './product-in-cart-view.component';

describe('ProductInCartViewComponent', () => {
  let component: ProductInCartViewComponent;
  let fixture: ComponentFixture<ProductInCartViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInCartViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInCartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
