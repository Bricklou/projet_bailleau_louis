import { Component } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CircleHelp, LucideAngularModule } from 'lucide-angular';
import { ButtonDirective } from '../../../components/base/button/button.component';
import { CartItem, CartService } from 'app/services/cart.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, LucideAngularModule, ButtonDirective, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  protected readonly icons = { CircleHelp };

  public constructor(private cartService: CartService) {}

  public get cartItems(): Observable<CartItem[]> {
    return this.cartService.products;
  }

  public get subtotal(): Observable<number> {
    return this.cartService.total;
  }

  public get orderTotal(): Observable<string> {
    return this.cartService.total.pipe(map((value) => (value + 10).toFixed(2)));
  }

  protected onItemCountChange(cartItem: CartItem, quantity: number): void {
    this.cartService.updateQuantity(cartItem.product, quantity);
  }
}
