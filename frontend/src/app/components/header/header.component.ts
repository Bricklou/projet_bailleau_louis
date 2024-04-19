import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ShoppingCartIconComponent } from '../../modules/redux/components/shopping-cart-icon/shopping-cart-icon.component';
import { LucideAngularModule, LucideLogIn, LucideLogOut } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ShoppingCartIconComponent, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected icons = { LucideLogIn, LucideLogOut };

  public constructor(
    protected auth: AuthService,
    private router: Router,
  ) {}

  protected logoutUser() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
