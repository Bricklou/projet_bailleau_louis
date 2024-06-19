import { Component } from '@angular/core';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsService } from 'app/services/products.service';
import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import { ProductListItem } from 'app/types/models/product.model';
import { InputDirective } from 'app/components/form/input/input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductItemComponent,
    AsyncPipe,
    InputDirective,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  protected products$: Observable<ProductListItem[]> = this.productsService
    .getProducts()
    .pipe(map((products) => products.data));

  protected searchFilter = new BehaviorSubject<string>('');

  public constructor(private productsService: ProductsService) {
    this.products$ = this.searchFilter.pipe(
      takeUntilDestroyed(),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchTerm) => this.productsService.getProducts(searchTerm)),
      map((products) => products.data),
    );
  }
}
