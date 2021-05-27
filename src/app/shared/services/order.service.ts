import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOrder } from '../interface/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  basket: Subject<any> = new Subject<any>();

  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/orders';
  }

  getOrder(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.url);
  }

  addOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.post<Array<IOrder>>(this.url, order);
  }

  
}
