import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInCartCreateComponent } from './product-in-cart-create.component';

describe('ProductInCartCreateComponent', () => {
  let component: ProductInCartCreateComponent;
  let fixture: ComponentFixture<ProductInCartCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInCartCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInCartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
