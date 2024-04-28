import { Product } from '../../../../types/products';

export class AddProduct {
  static readonly type = '[ShoppingCart] Add Product';
  constructor(
    public product: Product,
    public count = 1,
  ) {}
}

export class RemoveProduct {
  static readonly type = '[ShoppingCart] Remove Product';
  constructor(public productId: number) {}
}
