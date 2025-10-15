import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { CartSidebar } from '../cart-sidebar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CartSidebar, MatIconModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'],
})
export class Products implements OnInit {
  userName: string | null = null;
  userEmail: string | null = null;
  products: any[] = [];
  cart: any[] = [];
  notification: string | null = null;
  cartOpen = false;
  loading = true;
  errorMsg = '';
  hasToken = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadProducts();
    if (isPlatformBrowser(this.platformId)) {
      this.hasToken = !!localStorage.getItem('IdToken');
      const token = localStorage.getItem('IdToken');

      if (token) {
        const decoded: any = jwtDecode(token);
        this.userName = decoded.name || decoded['cognito:username'] || '';
        this.userEmail = decoded.email || '';
      }

      const storedCart = localStorage.getItem('cart');
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  loadProducts() {
    this.loading = true;
    this.http
      .get<any>('https://e6j63pv6n2.execute-api.us-west-1.amazonaws.com/dev/products', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })
      .subscribe({
        next: (data) => {
          this.products = data.data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = 'Hubo un error al cargar los productos';
          this.loading = false;
        },
      });
  }

  logout() {
    localStorage.removeItem('IdToken');
    this.hasToken = false;
    this.router.navigate(['/login']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  saveCart() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  addToCart(product: any) {
    // Busca si el producto ya está en el carrito
    const exists = this.cart.find((item) => item.id === product.id);

    if (exists) {
      // Solo incrementa si no supera el stock (opcional)
      if (!product.stock || exists.quantity < product.stock) {
        exists.quantity++;
        this.cart = [...this.cart];
        this.notification = `Cantidad aumentada para "${product.name}" (${exists.quantity})`;
      } else {
        this.notification = `No hay más stock disponible para "${product.name}"`;
      }
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.stock,
      });
      this.notification = `Producto "${product.name}" agregado al carrito.`;
      this.cart = [...this.cart];
    }

    // Notificación temporal
    setTimeout(() => {
      this.notification = null;
    }, 2500);

    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(event: { id: string; quantity: number }) {
    const item = this.cart.find((i) => i.id === event.id);
    console.log('item', item);
    if (item) {
      item.quantity = event.quantity;
      this.cart = [...this.cart];
      this.saveCart();
    }
  }

  purchase() {
    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payload = {
      products: this.cart.map((item) => ({
        id: item.id,
        name: item.name,
        qty: item.quantity,
      })),
      total,
    };

    console.log('paylod XD: ', JSON.stringify(payload));

    this.http
      .post('https://e6j63pv6n2.execute-api.us-west-1.amazonaws.com/dev/cart', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('IdToken')}` },
      })
      .subscribe({
        next: (response) => {
          alert('¡Compra realizada con éxito!');
          this.cart = [];
          this.cartOpen = false;
          // this.loadProducts();
          window.location.reload();
        },
        error: (error) => {
          alert('Error al realizar la compra: ' + error.message);
        },
      });

    this.cart = [];
    localStorage.removeItem('cart');
    this.cartOpen = false;
  }
}
