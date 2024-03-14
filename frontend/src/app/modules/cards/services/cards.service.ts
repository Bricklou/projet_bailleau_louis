import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../types/card';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private _cards: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([
    {
      code: '0000000000000000',
      cvv: '000',
      expiration: '01/12',
      name: 'Toto',
    },
    {
      code: '1111111111111111',
      cvv: '111',
      expiration: '02/13',
      name: 'Tata',
    },
    {
      code: '2222222222222222',
      cvv: '222',
      expiration: '03/14',
      name: 'Titi',
    },
  ]);

  constructor() {}

  public get cards(): Observable<Card[]> {
    return this._cards.asObservable();
  }

  public add(card: Card): void {
    console.log('Adding card', card);
    this._cards.next([...this._cards.getValue(), card]);
  }

  public delete(cardNumber: string): void {
    console.log('Removing card', cardNumber);
    this._cards.next(
      this._cards.getValue().filter((c) => c.code !== cardNumber),
    );
  }
}
