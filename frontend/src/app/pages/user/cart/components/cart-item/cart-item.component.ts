import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Check, ChevronDown, LucideAngularModule, X } from 'lucide-angular';
import { CartItem, CartService } from 'app/services/cart.service';
import { InputDirective } from 'app/components/form/input/input.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, InputDirective],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  protected readonly icons = { Check, X, ChevronDown };
  public readonly cartItem = input.required<CartItem>();
  public readonly index = input.required<number>();
  public readonly quantityChange = output<number>();

  public constructor(private cartService: CartService) {}

  protected removeFromCart() {
    this.cartService.removeFromCart(this.cartItem().product);
  }

  protected onQuantityChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.quantityChange.emit(event.target.valueAsNumber);
    }
  }
}
