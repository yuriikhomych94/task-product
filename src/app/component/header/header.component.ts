import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  getProducts: Array<any> = [];
  sum: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.productLength();
    this.getBasketFromLocal();
  }

  private productLength(): void {
    this.orderService.basket.subscribe(() => {
      this.getBasketFromLocal();
    });
  }

  private getBasketFromLocal(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.getProducts = JSON.parse(localStorage.getItem('basket'));
      this.sum = this.getProducts.reduce((accum, product) => accum + (product.price * product.count), 0);
    }
  }


}
