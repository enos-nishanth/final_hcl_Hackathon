import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CatalogService } from '../../../core/services/catalog.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';
import { CatalogItem } from '../../../core/models/catalog.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSnackBarModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  private productService = inject(ProductService);
  private catalogService = inject(CatalogService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  products = signal<Product[]>([]);
  categories = signal<CatalogItem[]>([]);
  filtered = signal<Product[]>([]);
  selectedCategory = 0;
  searchText = '';

  ngOnInit(): void {
    this.productService.getAll().subscribe(p => { this.products.set(p); this.filtered.set(p); });
    this.catalogService.getAll('categories').subscribe(c => this.categories.set(c));
  }

  filterProducts(): void {
    let result = this.products();
    if (this.selectedCategory) result = result.filter(p => p.categoryId === this.selectedCategory);
    if (this.searchText) result = result.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()));
    this.filtered.set(result);
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.snackBar.open(`${product.name} added to cart!`, 'Close', { duration: 2000 });
  }
}