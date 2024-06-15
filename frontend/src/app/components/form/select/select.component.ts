import { Component, input } from '@angular/core';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent {
  public readonly selectId = input.required<string>();
  public readonly selectName = input.required<string>();

  protected readonly icons = { ChevronDown };
}
