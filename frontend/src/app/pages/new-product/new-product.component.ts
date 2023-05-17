import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { APIService } from '../../api/api.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent {
  productForm: FormGroup;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: APIService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      const { name, price } = this.productForm.value;
      this.apiService.createProduct({ name, price }).subscribe({
        next: (response: any) => {
          this.message = response.message;
        },
        error: (error: any) => {
          console.log(error.error.message);
        },
      });
      this.productForm.reset();
    }
  }
}
