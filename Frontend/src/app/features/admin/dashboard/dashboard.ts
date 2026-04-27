import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { OrderService } from '../../../core/services/order.service';
import { InventoryService } from '../../../core/services/inventory.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private inventoryService = inject(InventoryService);

  totalProducts = signal(0);
  totalOrders = signal(0);
  lowStock = signal(0);
  recentOrders = signal<any[]>([]);
  cols = ['id', 'customer', 'total', 'status', 'date'];

  ngOnInit(): void {
    this.productService.getAll().subscribe(p => this.totalProducts.set(p.length));
    this.orderService.getAllOrders().subscribe(o => {
      this.totalOrders.set(o.length);
      this.recentOrders.set(o.slice(0, 10));
    });
    this.inventoryService.getLowStock().subscribe(p => this.lowStock.set(p.length));
  }
}