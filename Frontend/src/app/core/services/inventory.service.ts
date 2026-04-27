import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private url = `${environment.apiUrl}/inventory`;
  constructor(private http: HttpClient) {}

  getLowStock(): Observable<Product[]> { return this.http.get<Product[]>(`${this.url}/low-stock`); }
  updateStock(id: number, stockQuantity: number): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}/stock`, { stockQuantity });
  }
}