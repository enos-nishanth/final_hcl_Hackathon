import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderCreateDto } from '../models/order.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private url = `${environment.apiUrl}/orders`;
  constructor(private http: HttpClient) {}

  placeOrder(dto: OrderCreateDto): Observable<Order> { return this.http.post<Order>(this.url, dto); }
  getMyOrders(): Observable<Order[]> { return this.http.get<Order[]>(`${this.url}/my`); }
  getAllOrders(): Observable<Order[]> { return this.http.get<Order[]>(this.url); }
  updateStatus(id: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.url}/${id}/status`, { status });
  }
}