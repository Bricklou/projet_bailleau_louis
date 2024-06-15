import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Check, ChevronDown, LucideAngularModule, X } from 'lucide-angular';
import { SelectComponent } from '../../../../../components/form/select/select.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, SelectComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  protected readonly icons = { Check, X, ChevronDown };
}
