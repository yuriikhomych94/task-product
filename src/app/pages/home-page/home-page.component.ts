import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interface/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products: Array<IProduct> = [];
  localProducts: Array<IProduct> = [];

  constructor(private productService: ProductService,
    private orderService: OrderService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProduct().subscribe(products => {
      this.products = products;
    })
  }


  addToBasket(product: IProduct): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.localProducts = JSON.parse(localStorage.getItem('basket'));
      if (this.localProducts.some(prod => prod.id === product.id)) {
        const index = this.localProducts.findIndex(prod => prod.id === product.id);
        this.localProducts[index].count += product.count;
      } else {
        this.localProducts.push(product);
      }
      localStorage.setItem('basket', JSON.stringify(this.localProducts));
    } else {
      this.localProducts.push(product);
      localStorage.setItem('basket', JSON.stringify(this.localProducts));
    }
    product.count = 1;
    this.orderService.basket.next(product);
  }



  productCount(product: IProduct, status: boolean): void {
    if(status) {
      product.count++
    } else {
      if(product.count > 1) {
        product.count--
      }
    }
  }


  toBasket(): void {
    this.router.navigate(['/basket']);
  }

}
