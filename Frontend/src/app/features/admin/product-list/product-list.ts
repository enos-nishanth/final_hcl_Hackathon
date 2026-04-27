import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { ProductForm } from '../product-form/product-form';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  products = signal<Product[]>([]);
  cols = ['name', 'category', 'brand', 'price', 'stock', 'actions'];

  ngOnInit(): void { this.load(); }

  load(): void { this.productService.getAll().subscribe(p => this.products.set(p)); }

  openForm(product?: Product): void {
    const ref = this.dialog.open(ProductForm, { width: '500px', data: product });
    ref.afterClosed().subscribe(result => { if (result) this.load(); });
  }

  delete(id: number): void {
    if (!confirm('Delete this product?')) return;
    this.productService.delete(id).subscribe(() => {
      this.snackBar.open('Product deleted.', 'Close', { duration: 2000 });
      this.load();
    });
  }
}