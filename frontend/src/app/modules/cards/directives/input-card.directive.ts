import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: 'input[appInputCard]',
})
export class InputCardDirective implements AfterViewInit {
  public constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  public ngAfterViewInit(): void {
    const { nativeElement } = this.elementRef;

    if (!nativeElement) return;

    nativeElement.inputMode = 'numeric';
    nativeElement.placeholder =
      nativeElement.placeholder || '0000 0000 0000 0000';
    nativeElement.autocomplete = 'cc-number';
    nativeElement.maxLength = 19;
  }

  @HostListener('input')
  public onInput(): void {
    const input = this.elementRef.nativeElement;
    const value = input.value.replace(/\s/g, '');

    if (value.length <= 0) return;

    // Format the value as "xxxx xxxx xxxx xxxx"
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
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
