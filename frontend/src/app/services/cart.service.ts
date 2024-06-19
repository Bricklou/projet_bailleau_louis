import { Injectable } from '@angular/core';
import { Product } from 'app/types/models/product.model';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public readonly products = new BehaviorSubject<CartItem[]>([]);

  public addToCart(product: Product): void {
    // If already in cart, increment quantity
    const currentProducts = this.products.getValue();
    const existingProduct = currentProducts.find(
      (p) => p.product.id === product.id,
    );
    if (existingProduct) {
      existingProduct.quantity++;
      this.products.next(currentProducts);
      return;
    }

    // Otherwise, add new product to cart
    const updatedProducts = [...currentProducts, { product, quantity: 1 }];
    this.products.next(updatedProducts);
  }

  public removeFromCart(product: Product): void {
    const currentProducts = this.products.getValue();
    const existingProduct = currentProducts.find(
      (p) => p.product.id === product.id,
    );
    if (!existingProduct) {
      return;
    }

    if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
      this.products.next(currentProducts);
      return;
    }

    const updatedProducts = currentProducts.filter(
      (p) => p.product.id !== product.id,
    );
    this.products.next(updatedProducts);
  }

  public clearCart(): void {
    this.products.next([]);
  }
}
