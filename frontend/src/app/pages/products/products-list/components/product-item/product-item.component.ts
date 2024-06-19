import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductListItem } from 'app/types/models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  public readonly product = input.required<ProductListItem>();
}
