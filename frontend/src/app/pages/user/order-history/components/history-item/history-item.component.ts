import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './history-item.component.html',
  styleUrl: './history-item.component.css',
})
export class HistoryItemComponent {}
