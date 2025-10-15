import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cart-sidebar.html',
  styleUrls: ['./cart-sidebar.scss'],
})
export class CartSidebar {
  @Input() open = false;
  @Input() cart: any[] = [];
  @Output() remove = new EventEmitter<string>();
  @Output() purchase = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() changeQuantity = new EventEmitter<{ id: string; quantity: number }>();
  @Output() addToCartRequested = new EventEmitter<any>();

  get total() {
    return this.cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }

  increaseQuantity(item: any) {
    this.addToCartRequested.emit(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.changeQuantity.emit({ id: item.id, quantity: item.quantity - 1 });
    } else {
      this.remove.emit(item.id);
    }
  }

  removeItem(id: string) {
    this.remove.emit(id);
  }

  purchaseCart() {
    this.purchase.emit();
  }

  closeCart() {
    this.close.emit();
  }
}
