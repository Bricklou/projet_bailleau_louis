import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  public readonly id = input.required<string>();
  public readonly inputName = input.required<string>();
  public readonly autocomplete = input<string>();
  public readonly required = input<boolean>();
  public readonly inputType = input<string>();
}
