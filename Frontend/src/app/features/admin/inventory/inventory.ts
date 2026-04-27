import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InventoryService } from '../../../core/services/inventory.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSnackBarModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class Inventory implements OnInit {
  private inventoryService = inject(InventoryService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  lowStock = signal<Product[]>([]);
  products = signal<Product[]>([]);
  newStock: Record<number, number> = {};
  cols = ['name', 'category', 'stock', 'update'];

  ngOnInit(): void { this.load(); }

  load(): void {
    this.inventoryService.getLowStock().subscribe(p => this.lowStock.set(p));
    this.productService.getAll().subscribe(p => {
      this.products.set(p);
      p.forEach(prod => this.newStock[prod.id] = prod.stockQuantity);
    });
  }

  updateStock(productId: number): void {
    const qty = this.newStock[productId];
    if (qty == null) return;
    this.inventoryService.updateStock(productId, qty).subscribe(() => {
      this.snackBar.open('Stock updated!', 'Close', { duration: 2000 });
      this.load();
    });
  }
}