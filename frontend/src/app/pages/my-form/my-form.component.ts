import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSend, lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-my-form',
  standalone: true,
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.css',
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ lucideSend, lucideChevronDown })],
})
export class MyFormComponent {}
