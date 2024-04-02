import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Product } from '../../../../types/products';
import { AddProduct, RemoveProduct } from './cart.action';

export interface CountableItem<T> {
  item: T;
  count: number;
}

export interface CardStateModel {
  products: CountableItem<Product>[];
}

@State<CardStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class CardState {
  @Action(AddProduct)
  public addProduct(ctx: StateContext<CardStateModel>, action: AddProduct) {
    const state = ctx.getState();

    const idx = state.products.findIndex(
      (p) => p.item.ref === action.product.ref,
    );

    if (idx >= 0) {
      ctx.patchState({
        products: state.products.map((p) => {
          if (p.item.ref === action.product.ref) {
            return { item: p.item, count: p.count + action.count };
          }
          return p;
        }),
      });
      return;
    }

    ctx.patchState({
      products: [
        ...state.products,
        { item: action.product, count: action.count },
      ],
    });
  }

  @Action(RemoveProduct)
  public removeProduct(
    ctx: StateContext<CardStateModel>,
    action: RemoveProduct,
  ) {
    const state = ctx.getState();

    const idx = state.products.findIndex(
      (p) => p.item.ref === action.productRef,
    );

    if (idx < 0) {
      return;
    }

    ctx.patchState({
      products: state.products.filter((p) => p.item.ref !== action.productRef),
    });
  }

  @Selector()
  public static productCount(state: CardStateModel): number {
    return state.products.reduce((acc, p) => acc + p.count, 0);
  }

  @Selector()
  public static products(state: CardStateModel): CountableItem<Product>[] {
    return state.products;
  }
}
