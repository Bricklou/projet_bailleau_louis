import { Component } from '@angular/core';
import { LucideAngularModule, LucideShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-shopping-cart-icon',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './shopping-cart-icon.component.html',
  styleUrl: './shopping-cart-icon.component.css',
})
export class ShoppingCartIconComponent {
  protected icons = { LucideShoppingCart };
}
