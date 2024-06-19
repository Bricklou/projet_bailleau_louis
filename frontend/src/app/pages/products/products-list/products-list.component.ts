import { Component } from '@angular/core';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsService } from 'app/services/products.service';
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { ProductListItem } from 'app/types/models/product.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductItemComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  protected products$: Observable<ProductListItem[]> = this.productsService
    .getProducts()
    .pipe(map((products) => products.data));

  public constructor(private productsService: ProductsService) {}
}
