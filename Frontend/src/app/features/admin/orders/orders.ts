import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [MatTableModule, MatSelectModule, MatFormFieldModule, MatExpansionModule, MatSnackBarModule, FormsModule, DatePipe],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);
  private snackBar = inject(MatSnackBar);

  orders = signal<Order[]>([]);
  statusMap: Record<number, string> = {};

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(o => {
      this.orders.set(o);
      o.forEach(order => this.statusMap[order.id] = order.status);
    });
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateStatus(orderId, status).subscribe(() => {
      this.snackBar.open('Status updated!', 'Close', { duration: 2000 });
    });
  }

  statusColor(status: string): string {
    const map: Record<string, string> = {
      Confirmed: 'green', Pending: 'orange', Delivered: 'blue', Cancelled: 'red'
    };
    return map[status] ?? 'black';
  }
}