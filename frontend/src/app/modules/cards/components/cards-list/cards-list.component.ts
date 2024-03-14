import { Component } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css',
})
export class CardsListComponent {
  public constructor(private cardService: CardsService) {}

  protected get cards() {
    return this.cardService.cards;
  }

  protected deleteCard(cardNumber: string) {
    this.cardService.delete(cardNumber);
  }
}
