import { Component } from '@angular/core';
import { HistoryItemComponent } from './components/history-item/history-item.component';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [HistoryItemComponent],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {}
