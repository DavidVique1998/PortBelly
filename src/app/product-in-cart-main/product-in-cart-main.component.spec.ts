import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInCartMainComponent } from './product-in-cart-main.component';

describe('ProductInCartMainComponent', () => {
  let component: ProductInCartMainComponent;
  let fixture: ComponentFixture<ProductInCartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInCartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInCartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
