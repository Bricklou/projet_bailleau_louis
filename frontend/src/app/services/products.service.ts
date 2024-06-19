import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginated } from 'app/types/models/paginated';
import { Product, ProductListItem } from 'app/types/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  public getProducts(
    search = '',
    page = 1,
  ): Observable<Paginated<ProductListItem>> {
    return this.httpClient.get<Paginated<ProductListItem>>('/api/products', {
      params: {
        page: page.toString(),
        search,
      },
    });
  }

  public getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`/api/products/${id}`);
  }
}
