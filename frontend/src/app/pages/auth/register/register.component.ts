import { HttpErrorResponse } from '@angular/common/http';
import { Component, model } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonDirective } from 'app/components/base/button/button.component';
import { FormContainerComponent } from 'app/components/form/form-container/form-container.component';
import { InputDirective } from 'app/components/form/input/input.component';
import { LabelDirective } from 'app/components/form/label/label.component';
import { AuthService } from 'app/services/auth.service';
import { isInvalidFieldException } from 'app/types/exceptions';
import { MustMatch } from 'app/utils/validators/mustMatch';
import {
  CircleAlert,
  Loader2,
  LucideAngularModule,
  ShoppingCart,
} from 'lucide-angular';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LucideAngularModule,
    InputDirective,
    FormContainerComponent,
    LabelDirective,
    RouterLink,
    ButtonDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected icons = { ShoppingCart, Loader2, CircleAlert };

  protected error = model<string | null>(null);
  protected loading = model<boolean>(false);

  protected registerForm = this.formBuilder.group(
    {
      first_name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      last_name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password_confirmation: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    },
    {
      validators: [MustMatch('password', 'password_confirmation')],
    },
  );

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  get f() {
    return this.registerForm.controls;
  }

  protected onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.auth
      .register({
        first_name: this.f.first_name.value,
        last_name: this.f.last_name.value,
        email: this.f.email.value,
        password: this.f.password.value,
        password_confirmation: this.f.password_confirmation.value,
      })
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
            if (error.status === 422 && isInvalidFieldException(error.error)) {
              for (const e of error.error.errors) {
                this.registerForm.get(e.field)?.setErrors({
                  [e.rule]: e.message,
                });
              }
            }

            return;
          }

          this.error.set(
            'We encountered some unexpected error. Please try again later.',
          );
        },
      });

    //this.auth.register()
  }
}
