import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LogIn,
  LucideAngularModule,
  Menu,
  ShoppingBasket,
  ShoppingCart,
  User,
} from 'lucide-angular';
import { NavIconComponent } from './components/nav-icon/nav-icon.component';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { CartService } from 'app/services/cart.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, NavIconComponent, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  protected readonly icons = {
    Menu,
    ShoppingCart,
    User,
    ShoppingBasket,
    LogIn,
  };

  public constructor(
    protected auth: AuthService,
    private card: CartService,
  ) {}

  protected get cartCount(): Observable<number> {
    return this.card.products.pipe(map((products) => products.length));
  }
}
