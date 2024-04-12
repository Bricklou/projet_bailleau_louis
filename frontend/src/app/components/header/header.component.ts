import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingCartIconComponent } from '../../modules/redux/components/shopping-cart-icon/shopping-cart-icon.component';
import { LucideAngularModule, LucideLogIn } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ShoppingCartIconComponent, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected icons = { LucideLogIn };

  public constructor(protected auth: AuthService) {}
}
