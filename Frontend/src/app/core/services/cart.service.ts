import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);
  total = computed(() => this.items().reduce((sum, i) => sum + i.price * i.quantity, 0));
  itemCount = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));

  addItem(product: Product, qty: number = 1): void {
    const current = this.items();
    const existing = current.find(i => i.productId === product.id);
    if (existing) {
      this.items.set(current.map(i =>
        i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
      ));
    } else {
      this.items.set([...current, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        imageUrl: product.imageUrl
      }]);
    }
  }

  removeItem(productId: number): void {
    this.items.set(this.items().filter(i => i.productId !== productId));
  }

  updateQuantity(productId: number, qty: number): void {
    if (qty <= 0) { this.removeItem(productId); return; }
    this.items.set(this.items().map(i =>
      i.productId === productId ? { ...i, quantity: qty } : i
    ));
  }

  clearCart(): void { this.items.set([]); }
}