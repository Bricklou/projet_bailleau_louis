import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'app/components/base/button/button.component';
import { FormContainerComponent } from 'app/components/form/form-container/form-container.component';
import { InputDirective } from 'app/components/form/input/input.component';
import { LabelComponent } from 'app/components/form/label/label.component';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LucideAngularModule,
    InputDirective,
    FormContainerComponent,
    LabelComponent,
    RouterLink,
    ButtonDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected icons = { ShoppingCart };
}
