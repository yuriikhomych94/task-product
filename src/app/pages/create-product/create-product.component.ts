import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interface/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {


  createProductForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, 
    private productService: ProductService) { }

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      label: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      count: new FormControl(1)
    })
  }


  addProduct(): void {
    const product = this.createProductForm.value
    this.productService.addProduct(product).subscribe()
    this.router.navigate(['/home'])
  }


}
