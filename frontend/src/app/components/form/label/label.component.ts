import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appLabel]',
  standalone: true,
  host: {
    class: 'block text-sm font-medium leading-6 text-gray-900',
  },
})
export class LabelDirective {
  public readonly for = input.required<string>();
}
