import { Injectable } from '@angular/core';
import { Product } from '../types/products';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public constructor(private httpClient: HttpClient) {}

  public searchCatalogue(query?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (query && query.length) {
      params = params.append('search', query);
    }
    return this.httpClient.get<Product[]>(`/api/products`, { params });
  }
}
