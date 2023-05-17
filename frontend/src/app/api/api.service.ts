import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getTokenFromLocalStorage } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'https://backend-openfabric-test.onrender.com';

  constructor(private http: HttpClient) {}

  public login(data: {}) {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post(url, data);
  }

  public register(data: {}) {
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post(url, data);
  }
  public getProductList(data: {}) {
    const url = `${this.apiUrl}/product/get-product-list`;
    return this.http.post(url, data);
  }
  public getProductDetail(data: {}) {
    const url = `${this.apiUrl}/product/get-product-detail`;
    return this.http.post(url, data);
  }
  public createProduct(data: {}) {
    const url = `${this.apiUrl}/product/create-product`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${getTokenFromLocalStorage()}`
    );
    return this.http.post(url, data, { headers });
  }
  public updateProduct(data: {}) {
    const url = `${this.apiUrl}/product/update-product`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${getTokenFromLocalStorage()}`
    );
    return this.http.patch(url, data, { headers });
  }
  public deleteProduct(data: {}) {
    const url = `${this.apiUrl}/product/delete-product`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${getTokenFromLocalStorage()}`
    );
    return this.http.post(url, data, { headers });
  }
}
