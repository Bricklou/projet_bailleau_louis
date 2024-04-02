import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  CardState,
  CountableItem,
} from '../../states/shopping-cart/cart.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../types/products';
import { RemoveProduct } from '../../states/shopping-cart/cart.action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css',
})
export class MyCartComponent {
  @Select(CardState.products)
  protected declare products$: Observable<CountableItem<Product>[]>;

  public constructor(private store: Store) {}

  protected removeProduct(productRef: string) {
    this.store.dispatch(new RemoveProduct(productRef));
  }
}
