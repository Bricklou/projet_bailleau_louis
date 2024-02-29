import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/products';
import { BehaviorSubject, Observable, combineLatest, filter, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductsService],
})
export class ProductsComponent {
  protected products: Observable<Product[]>;
  protected searchFilter = new BehaviorSubject<string>('');

  public constructor(private productsService: ProductsService) {
    //Create a subscription to the products service and searchFilter changes
    this.products = combineLatest([
      this.searchFilter,
      this.productsService.getCatalogue(),
    ]).pipe(
      map(([searchFilter, products]) =>
        products.filter((product) =>
          product.libelle.toLowerCase().includes(searchFilter.toLowerCase()),
        ),
      ),
    );
  }
}
