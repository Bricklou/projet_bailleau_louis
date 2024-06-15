import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-nav-icon',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, NgClass],
  templateUrl: './nav-icon.component.html',
  styleUrl: './nav-icon.component.css',
})
export class NavIconComponent {
  public readonly href = input.required<string>();
  public readonly label = input.required<string>();
  public readonly icon = input.required<LucideIconData>();
  public readonly _class = input<string>('', { alias: 'class' });
}
