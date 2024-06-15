import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LogIn,
  LucideAngularModule,
  Menu,
  Search,
  ShoppingBasket,
  ShoppingCart,
  User,
} from 'lucide-angular';
import { NavIconComponent } from './components/nav-icon/nav-icon.component';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';

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
    Search,
    ShoppingCart,
    User,
    ShoppingBasket,
    LogIn,
  };

  public constructor(protected auth: AuthService) {}
}
