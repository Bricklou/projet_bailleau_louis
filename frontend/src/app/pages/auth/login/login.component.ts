import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'app/components/base/button/button.component';
import { FormContainerComponent } from 'app/components/form/form-container/form-container.component';
import { InputComponent } from 'app/components/form/input/input.component';
import { LabelComponent } from 'app/components/form/label/label.component';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LucideAngularModule,
    InputComponent,
    FormContainerComponent,
    LabelComponent,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected icons = { ShoppingCart };
}
