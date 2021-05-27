import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interface/order.interface';
import { IProduct } from 'src/app/shared/interface/product.interface';
import { Order } from 'src/app/shared/model/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css']
})
export class BasketPageComponent implements OnInit {

  orders: Array<IProduct> = [];
  id: number;
  name: string;
  totalPrice: number;
  totalPayment: string;
  count: string;


  constructor(private orderService: OrderService, private location: Location) { }

  ngOnInit(): void {
    this.getBasket();
  }

  private getBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.orders = JSON.parse(localStorage.getItem('basket'));
    }
    this.total();
  }


  addOrder(): void {
    const newOrder: IOrder = new Order(this.id,
                                       this.name,
                                       this.orders,
                                       this.totalPrice,
                                       this.totalPayment,
                                       this.count);
    this.orders = [];
    localStorage.setItem('basket', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
    this.orderService.addOrder(newOrder).subscribe(() => {
      this.getBasket();
    });
  }


  
  deleteProduct(product: IProduct) {
    const index = this.orders.findIndex(prod => prod.id === product.id);
    this.orders.splice(index, 1);
    this.total();
    this.updateLocalProducts();
    this.orderService.basket.next(this.orders);
  }

  private total() {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0);
  }


  private updateLocalProducts(): void {
    localStorage.setItem('basket', JSON.stringify(this.orders));
  }

  goBack(): void {
    this.location.back();
  }


}
