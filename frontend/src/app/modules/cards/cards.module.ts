import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputCardComponent } from './components/input-card/input-card.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import {
  Calendar,
  CreditCard,
  LockKeyhole,
  Trash2,
  LucideAngularModule,
} from 'lucide-angular';
import { InputCardDirective } from './directives/input-card.directive';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';
import { CardItemComponent } from './components/cards-list/card-item/card-item.component';
import { InputDateDirective } from './directives/input-date.directive';
import { CreditCardFormatPipe } from './pipes/credit-card-format.pipe';

@NgModule({
  declarations: [
    InputCardComponent,
    CardsListComponent,
    InputCardDirective,
    CardItemComponent,
    InputDateDirective,
    CreditCardFormatPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({ CreditCard, Calendar, LockKeyhole, Trash2 }),
    ErrorMessageComponent,
  ],
  exports: [InputCardComponent, CardsListComponent],
})
export class CardsModule {}
