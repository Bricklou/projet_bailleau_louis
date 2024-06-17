import { Component } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CircleHelp, LucideAngularModule } from 'lucide-angular';
import { ButtonDirective } from '../../../components/base/button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, LucideAngularModule, ButtonDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  protected readonly icons = { CircleHelp };
}
