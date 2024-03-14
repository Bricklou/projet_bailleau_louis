import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardFormat',
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: string): string {
    // Format the value from "xxxxxxxxxxxxxxxx" to "xxxx **** **** **xx" (including white spaces)
    let formattedValue = value.replace(/\s+/g, ''); // remove all spaces
    formattedValue = formattedValue.replace(/(\d{4})/g, '$1 '); // add a space after every 4 digits
    formattedValue = formattedValue.trim(); // remove trailing space
    formattedValue = formattedValue.replace(
      /(\d{4}) \d{4} \d{4} \d{2}(\d{2})/,
      '$1 **** **** **$2',
    ); // mask the middle 8 digits

    return formattedValue;
  }
}
