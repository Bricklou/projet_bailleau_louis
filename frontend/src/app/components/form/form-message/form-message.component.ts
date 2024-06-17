import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-message',
  standalone: true,
  imports: [],
  templateUrl: './form-message.component.html',
  styleUrl: './form-message.component.css',
})
export class FormMessageComponent {
  public control = input.required<FormControl | FormGroup>();
}
