import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, email, FormRoot } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { PostLogin } from '../../type';
import { Router, RouterLink } from '@angular/router';
import type { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageUtil } from '../../../utils/local-storage/local.storage';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-feature',
  imports: [FormField, FormRoot, RouterLink, MatIconModule],
  templateUrl: './login.component.html',
})
export class LoginFeatureComponent {
  private readonly service = inject(AuthService);
  private readonly route = inject(Router);
  private readonly login = signal<PostLogin>({
    identifier: '',
    password: '',
  });
  public showPassword = signal<boolean>(false);

  toggleShowPassword() {
    this.showPassword.update((s) => !s);
  }

  loginForm = form(
    this.login,
    (schema) => {
      required(schema.identifier, { message: 'Campo de email é obrigatório' });
      required(schema.password, { message: 'Campo de senha é obrigatório' });
      email(schema.identifier, { message: 'Formato de Email inválido' });
    },
    {
      submission: {
        action: async (field) => {
          this.service.postLogin({ body: field().value() }).subscribe({
            next: (value) => {
              this.route.navigate(['/home']);
              LocalStorageUtil.setItem('sessionId', value);
            },
            error: (error: HttpErrorResponse) => {
              console.error({ error });
            },
          });
        },
      },
    },
  );
}
