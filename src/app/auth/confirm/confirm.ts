import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './confirm.html',
  styleUrls: ['../../auth/login/login.scss'],
})
export class Confirm {
  email = '';
  code = '';
  errorMsg = '';
  loading = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.errorMsg = '';
    this.loading = true;
    this.http
      .post<any>('https://e6j63pv6n2.execute-api.us-west-1.amazonaws.com/dev/confirm', {
        email: this.email,
        code: this.code,
      })
      .subscribe({
        next: (response) => {
          alert('Confirmación exitosa');
          window.location.href = '/login';
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = 'Error en la confirmación: ' + (err?.error?.message || err.message);
          this.loading = false;
        },
      });
  }
}
