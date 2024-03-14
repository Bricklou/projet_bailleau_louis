import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appInputDate]',
})
export class InputDateDirective implements AfterViewInit {
  public constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  public ngAfterViewInit(): void {
    const { nativeElement } = this.elementRef;

    if (!nativeElement) return;

    nativeElement.inputMode = 'numeric';
    nativeElement.placeholder = nativeElement.placeholder || 'MM/YY';
    nativeElement.autocomplete = 'cc-exp';
    nativeElement.maxLength = 5;
  }

  @HostListener('input')
  public onInput(): void {
    const input = this.elementRef.nativeElement;
    const value = input.value.replace(/\//g, '');

    if (value.length <= 0) return;

    //

    // Format the value as "MM/YY"
    const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1/');
    input.value = formattedValue;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Allow only numeric keys, backspace, and arrow keys
    if (
      !(
        (event.key >= '0' && event.key <= '9') ||
        event.key === 'Backspace' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight'
      )
    ) {
      event.preventDefault();
    }
  }
}
