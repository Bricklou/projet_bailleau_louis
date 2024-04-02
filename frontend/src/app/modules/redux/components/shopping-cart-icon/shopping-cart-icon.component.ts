import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { LucideAngularModule, LucideShoppingCart } from 'lucide-angular';
import { CardState } from '../../states/shopping-cart/cart.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-shopping-cart-icon',
  standalone: true,
  imports: [LucideAngularModule, AsyncPipe],
  templateUrl: './shopping-cart-icon.component.html',
  styleUrl: './shopping-cart-icon.component.css',
})
export class ShoppingCartIconComponent {
  protected icons = { LucideShoppingCart };

  @Select(CardState.productCount)
  protected declare productCount$: Observable<number>;
}
