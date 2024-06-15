import { Component } from '@angular/core';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import {
  CircleHelp,
  LucideAngularModule,
  MessageCircleQuestionIcon,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/base/button/button.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, LucideAngularModule, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  protected readonly icons = { CircleHelp };
}
