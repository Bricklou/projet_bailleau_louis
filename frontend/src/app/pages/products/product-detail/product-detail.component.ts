import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonDirective } from 'app/components/base/button/button.component';
import { CartService } from 'app/services/cart.service';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/types/models/product.model';
import { LucideAngularModule, ShoppingCart, X } from 'lucide-angular';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, LucideAngularModule, ButtonDirective, NgClass],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  protected product$: Observable<Product>;
  protected readonly icons = { ShoppingCart, X };
  protected selectedImage = 0;

  public constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {
    this.product$ = this.route.params.pipe(
      map((params) => params['id'] as string),
      switchMap((id) => this.productsService.getProduct(id)),
    );
  }

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  protected removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  protected get isInCart(): Observable<boolean> {
    return this.cartService.products.pipe(
      map((products) => products.some((p) => p.quantity > 0)),
    );
  }

  protected onImageSelected(index: number) {
    this.selectedImage = index;
  }
}
