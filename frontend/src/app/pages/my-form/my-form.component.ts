import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSend, lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-my-form',
  standalone: true,
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.css',
  imports: [NgIconComponent, ReactiveFormsModule],
  viewProviders: [provideIcons({ lucideSend, lucideChevronDown })],
})
export class MyFormComponent {
  protected myForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(1)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(1)]),

    adresse: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    codePostal: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(10000),
      Validators.max(99999),
    ]),
    ville: new FormControl('', [Validators.required, Validators.minLength(1)]),

    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),

    civilite: new FormControl<'male' | 'female'>('male', [Validators.required]),

    login: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  protected onSubmit() {}
}
