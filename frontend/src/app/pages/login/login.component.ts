import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from '../../modules/shared/components/error-message/error-message.component';
import { LucideAngularModule, LucideSendHorizontal } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessageComponent, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected icons = { LucideSendHorizontal };

  protected loginForm = this.formBuilder.group({
    username: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  public constructor(
    private formBuilder: NonNullableFormBuilder,
    private auth: AuthService,
  ) {}

  protected get formControls(): typeof this.loginForm.controls {
    return this.loginForm.controls;
  }

  protected hasErrors(field: keyof typeof this.loginForm.value): boolean {
    return Boolean(
      this.loginForm.get(field)?.dirty && this.loginForm.get(field)?.errors,
    );
  }

  protected onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const data = this.loginForm.getRawValue();

    this.auth
      .login(data.username, data.password)
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}
