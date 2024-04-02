import { Component, output, OnInit, input } from '@angular/core';
import { Card } from '../../../types/card';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent implements OnInit {
  public readonly cardData = input.required<Card>();

  public readonly delete = output<string>();

  protected declare hueOffset: number;

  public ngOnInit() {
    this.hueOffset = this.hashStringToNumber(this.cardData().code);
  }

  private hashStringToNumber(s: string): number {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 361); // Ensure the result is between 0 and 360
  }
}
