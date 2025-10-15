import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    this.http
      .post<any>('https://e6j63pv6n2.execute-api.us-west-1.amazonaws.com/dev/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (response) => {
          if (response?.tokens) {
            localStorage.setItem('IdToken', response.tokens.IdToken);
            window.location.href = '/products';
          }
          this.loading = false;
        },
        error: () => {
          this.errorMsg = 'Credenciales incorrectas o error de conexión';
          this.loading = false;
        },
      });
  }
}
