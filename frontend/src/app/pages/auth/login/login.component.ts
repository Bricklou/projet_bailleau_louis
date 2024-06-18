import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonDirective } from 'app/components/base/button/button.component';
import { FormContainerComponent } from 'app/components/form/form-container/form-container.component';
import { FormMessageComponent } from 'app/components/form/form-message/form-message.component';
import { InputDirective } from 'app/components/form/input/input.component';
import { LabelComponent } from 'app/components/form/label/label.component';
import { AuthService } from 'app/services/auth.service';
import {
  isInvalidCredentialsException,
  isInvalidFieldException,
} from 'app/types/exceptions';
import {
  CircleAlert,
  Loader2,
  LucideAngularModule,
  ShoppingCart,
} from 'lucide-angular';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LucideAngularModule,
    InputDirective,
    FormContainerComponent,
    LabelComponent,
    ButtonDirective,
    RouterLink,
    FormMessageComponent,

    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected icons = { ShoppingCart, Loader2, CircleAlert };

  protected error = model<string | null>(null);
  protected loading = model<boolean>(false);

  protected loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: NonNullableFormBuilder,
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  protected onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.auth
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl =
            this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
          void this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.loading.set(false);
          if (error instanceof HttpErrorResponse) {
            console.log(error);
            if (isInvalidCredentialsException(error)) {
              this.error.set('Invalid credentials');
              return;
            }

            if (error.status === 422 && isInvalidFieldException(error.error)) {
              for (const e of error.error.errors) {
                this.loginForm.get(e.field)?.setErrors({
                  [e.rule]: e.message,
                });
              }
              return;
            }
          }

          this.error.set(
            'We encountered some unexpected error. Please try again later.',
          );
        },
      });
  }
}
