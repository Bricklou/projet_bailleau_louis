import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  LucideAngularModule,
  LucideChevronDown,
  LucideSendHorizonal,
} from 'lucide-angular';
import { MustMatch } from '../../utils/validators/mustMatch';
import { FormResult } from '../../types/form.dto';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-my-form',
  standalone: true,
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.css',
  imports: [ReactiveFormsModule, LucideAngularModule, ErrorMessageComponent],
})
export class MyFormComponent {
  protected readonly LucideChevronDown = LucideChevronDown;
  protected readonly LucideSendHorizontal = LucideSendHorizonal;

  @Output()
  public readonly formSubmitted = new EventEmitter<FormResult>();

  public constructor(private formBuilder: NonNullableFormBuilder) {}

  protected myForm = this.formBuilder.group(
    {
      nom: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      prenom: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      adresse: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      codePostal: this.formBuilder.control<number | null>(null, [
        Validators.required,
        Validators.min(10000),
        Validators.max(99999),
      ]),
      ville: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      telephone: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),

      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),

      civilite: this.formBuilder.control<'male' | 'female'>('male', [
        Validators.required,
      ]),

      login: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      passwordConfirmation: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    },
    {
      validators: MustMatch('password', 'passwordConfirmation'),
    },
  );

  protected changeCivilite(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target?.value;
    if (value) {
      this.myForm.get('civilite')?.setValue(value as 'male' | 'female');
    }
  }

  protected get formControls(): typeof this.myForm.controls {
    return this.myForm.controls;
  }

  protected hasErrors(field: string): boolean {
    return Boolean(
      this.myForm.get(field)?.dirty && this.myForm.get(field)?.errors,
    );
  }

  protected onSubmit() {
    if (!this.myForm.valid) {
      return;
    }

    this.formSubmitted.emit(this.myForm.value as FormResult);
  }
}
