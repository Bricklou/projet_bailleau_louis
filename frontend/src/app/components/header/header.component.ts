import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartIconComponent } from '../../modules/redux/components/shopping-cart-icon/shopping-cart-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ShoppingCartIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
