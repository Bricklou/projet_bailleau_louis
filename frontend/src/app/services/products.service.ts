import { Injectable } from '@angular/core';
import { Product } from '../types/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public constructor(private httpClient: HttpClient) {}

  public getCatalogue(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products');
  }
}
