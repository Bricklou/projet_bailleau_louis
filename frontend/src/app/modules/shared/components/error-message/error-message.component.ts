import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  public control = input.required<FormControl | FormGroup>();
}
