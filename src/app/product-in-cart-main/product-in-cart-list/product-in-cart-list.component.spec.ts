import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInCartListComponent } from './product-in-cart-list.component';

describe('ProductInCartListComponent', () => {
  let component: ProductInCartListComponent;
  let fixture: ComponentFixture<ProductInCartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInCartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
