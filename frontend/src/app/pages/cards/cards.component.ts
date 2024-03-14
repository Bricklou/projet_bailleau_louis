import { Component } from '@angular/core';
import { CardsModule } from '../../modules/cards/cards.module';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

}
