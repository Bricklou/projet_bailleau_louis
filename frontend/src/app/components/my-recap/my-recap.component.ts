import { Component, input } from '@angular/core';
import { FormResult } from '../../types/form.dto';

@Component({
  selector: 'app-my-recap',
  standalone: true,
  imports: [],
  templateUrl: './my-recap.component.html',
  styleUrl: './my-recap.component.css',
})
export class MyRecapComponent {
  public result = input.required<FormResult>();
}
