import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../api/api.service';
import { isAuthenticated } from '../../../utils/utils';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private apiService: APIService, public dialog: MatDialog) {}


  id: string | null = null;
  product: { name: string; price: number } = {
    name: '',
    price: 0,
  };
  editedProductName: string = '';
  editedProductPrice: number = 0;
  isEditing: boolean = false;
  isLogin = isAuthenticated();

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const productId = this.id;
    if (productId) {
      this.apiService.getProductDetail({ id: productId }).subscribe({
        next: (response: any) => {
          const { name, price } = response.product;
          this.product = {
            name,
            price,
          };
        },
        error: (error: any) => {
          console.log(error.error.message);
        },
      });
    }
  }

  editProduct() {
    this.isEditing = true;
    this.editedProductName = this.product.name;
    this.editedProductPrice = this.product.price;
  }
  deleteProduct(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: this.id }
    });
  }

  saveChanges() {
    const productId = this.id;
    const name = this.editedProductName;
    const price = this.editedProductPrice;
    this.apiService.updateProduct({ productId, name, price }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error.message);
      },
    });
    this.product.name = this.editedProductName;
    this.product.price = this.editedProductPrice;
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }

}
