import { Component } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { luhnValidator } from '../../validators/luhnValidator';
import { Card } from '../../types/card';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrl: './input-card.component.css',
})
export class InputCardComponent {
  protected cardForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    code: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(12),
      luhnValidator,
    ]),
    cvv: this.formBuilder.control<string | null>(null, [Validators.required]),
    expiration: this.formBuilder.control('', [Validators.required]),
  });

  public constructor(
    private cardService: CardsService,
    private formBuilder: NonNullableFormBuilder,
  ) {}

  protected onSubmit() {
    if (
      this.formControls.cvv.value == null ||
      this.formControls.expiration.value == null
    )
      return;

    const card = {
      name: this.formControls.name.value,
      code: this.formControls.code.value,
      cvv: this.formControls.cvv.value,
      expiration: this.formControls.expiration.value,
    } satisfies Card;

    this.cardService.add(card);
  }

  protected get formControls(): typeof this.cardForm.controls {
    return this.cardForm.controls;
  }

  protected hasErrors(field: string): boolean {
    return Boolean(
      this.cardForm.get(field)?.dirty && this.cardForm.get(field)?.errors,
    );
  }
}
