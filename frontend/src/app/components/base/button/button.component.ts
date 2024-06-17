import { Directive } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true,
  host: {
    class: `shadow-sm text-white font-medium text-base py-2 bg-primary border inline-flex items-center justify-center gap-2 border-transparent rounded-md w-full\
      hover:bg-primary-600 app-outline-primary transition-colors duration-200 ease-out focus:ring-2 disabled:bg-gray-200 disabled:text-gray-500`,
  },
})
export class ButtonDirective {}
