import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInCartAddComponent } from './product-in-cart-add.component';

describe('ProductInCartAddComponent', () => {
  let component: ProductInCartAddComponent;
  let fixture: ComponentFixture<ProductInCartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInCartAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInCartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
