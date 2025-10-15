import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['../../auth/login/login.scss'],
})
export class Register {
  name = '';
  email = '';
  password = '';
  phone = '';
  errorMsg = '';
  countryCode = '+57';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    console.log('Código país seleccionado:', this.countryCode);
    const fullPhone = this.countryCode + this.phone.trim();
    console.log('Número completo:', fullPhone);
    this.http
      .post<any>('https://e6j63pv6n2.execute-api.us-west-1.amazonaws.com/dev/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        phone: fullPhone,
      })
      .subscribe({
        next: (response) => {
          console.log('response: ', response);
          alert('¡Registro realizado con éxito!');
          window.location.href = '/confirm';
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = 'Error al registrar: ' + (err?.error?.message || err.message);
          this.loading = false;
        },
      });
  }
}
