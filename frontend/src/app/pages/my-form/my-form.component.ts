import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  LucideAngularModule,
  LucideChevronDown,
  LucideSendHorizonal,
} from 'lucide-angular';
import { MustMatch } from '../../utils/validators/mustMatch';

@Component({
  selector: 'app-my-form',
  standalone: true,
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.css',
  imports: [ReactiveFormsModule, LucideAngularModule],
})
export class MyFormComponent {
  protected readonly LucideChevronDown = LucideChevronDown;
  protected readonly LucideSendHorizontal = LucideSendHorizonal;

  protected myForm = new FormGroup(
    {
      nom: new FormControl('', [Validators.required, Validators.minLength(1)]),
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      adresse: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      codePostal: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(10000),
        Validators.max(99999),
      ]),
      ville: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      email: new FormControl('', [Validators.required, Validators.email]),

      civilite: new FormControl<'male' | 'female'>('male', [
        Validators.required,
      ]),

      login: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    },
    {
      validators: MustMatch('password', 'passwordConfirmation'),
    }
  );

  protected changeCivilite(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target?.value;
    if (value) {
      this.myForm.get('civilite')?.setValue(value as 'male' | 'female');
    }
  }

  protected onSubmit() {
    console.log(this.myForm.valid, this.myForm.value);
  }
}
