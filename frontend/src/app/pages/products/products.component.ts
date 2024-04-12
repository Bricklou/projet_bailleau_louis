import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../types/products';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, LucidePlus } from 'lucide-angular';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../modules/redux/states/shopping-cart/cart.action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, FormsModule, LucideAngularModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductsService],
})
export class ProductsComponent {
  protected products: Observable<Product[]>;
  protected searchFilter = new BehaviorSubject<string>('');

  protected icons = { LucidePlus };

  public constructor(
    private productsService: ProductsService,
    private store: Store,
  ) {
    //Create a subscription to the products service and searchFilter changes
    this.products = combineLatest([
      this.searchFilter,
      this.productsService.getCatalogue(),
    ]).pipe(
      takeUntilDestroyed(),
      map(([searchFilter, products]) =>
        products.filter((product) =>
          product.libelle.toLowerCase().includes(searchFilter.toLowerCase()),
        ),
      ),
    );
  }

  protected addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }
}
