import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  cart = inject(CartService);
  private orderService = inject(OrderService);
  private auth = inject(AuthService);
  router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cols = ['name', 'price', 'quantity', 'subtotal', 'actions'];
  loading = false;

  placeOrder(): void {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/login']); return; }
    this.loading = true;
    const dto = { items: this.cart.items().map(i => ({ productId: i.productId, quantity: i.quantity })) };
    this.orderService.placeOrder(dto).subscribe({
      next: () => {
        this.cart.clearCart();
        this.loading = false;
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/my-orders']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Order failed.', 'Close', { duration: 4000 });
      }
    });
  }
}