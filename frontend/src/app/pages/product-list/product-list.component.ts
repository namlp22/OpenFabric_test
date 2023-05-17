import { Component } from '@angular/core';
import { APIService } from '../../api/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(private apiService: APIService) {}
  products: { name: string, price: number, _id: string }[] = [];

  ngOnInit() {
    this.apiService.getProductList({page:1, perPage: 5}).subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response.products;
      },
      error: (error: any) => {
        console.log(error.error.message);
      },
    });
  }
}
