import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatExpansionModule, DatePipe],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.css']
})
export class MyOrders implements OnInit {
  private orderService = inject(OrderService);
  orders = signal<Order[]>([]);
  cols = ['product', 'qty', 'price', 'sub'];

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe(o => this.orders.set(o));
  }

  statusColor(status: string): string {
    const map: Record<string, string> = {
      Confirmed: 'green', Pending: 'orange', Delivered: 'blue', Cancelled: 'red'
    };
    return map[status] ?? 'black';
  }
}