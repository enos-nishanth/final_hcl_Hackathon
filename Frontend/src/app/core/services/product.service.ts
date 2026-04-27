import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCreateDto } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private url = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> { return this.http.get<Product[]>(this.url); }
  getById(id: number): Observable<Product> { return this.http.get<Product>(`${this.url}/${id}`); }
  getByCategory(categoryId: number): Observable<Product[]> { return this.http.get<Product[]>(`${this.url}/category/${categoryId}`); }
  create(dto: ProductCreateDto): Observable<Product> { return this.http.post<Product>(this.url, dto); }
  update(id: number, dto: ProductCreateDto): Observable<Product> { return this.http.put<Product>(`${this.url}/${id}`, dto); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}