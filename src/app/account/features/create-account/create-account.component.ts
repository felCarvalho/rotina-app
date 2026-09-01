import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, email, FormRoot, validateHttp } from '@angular/forms/signals';
import { UserService } from '../../services/account.service';
import { PostUser } from '../../type';
import { environments } from '../../../../environments/environments';
import { Router, RouterLink} from '@angular/router';
import type { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  imports: [FormField, FormRoot, RouterLink],
})
export class CreateAccountComponent {
  private readonly service = inject(UserService);
  private readonly route = inject(Router);
  private readonly createAccount = signal<PostUser>({
    name: '',
    identifier: '',
    password: '',
    repeatPassword: '',
  });
  public showPassword = signal<boolean>(false);
  public showRepeatPassword = signal<boolean>(false);

  toggleShowPassword() {
    this.showPassword.update((s) => !s);
  }

  toggleShowRepeatPassword() {
    this.showRepeatPassword.update((s) => !s);
  }

  createAccountForm = form(
    this.createAccount,
    (schema) => {
      required(schema.identifier, { message: 'Campo de email é obrigatório' });
      required(schema.password, { message: 'Campo de senha é obrigatório' });
      required(schema.repeatPassword, { message: 'Campo de repetir senha é obrigatório' });
      required(schema.name, { message: 'Campo de nome é obrigatório' });
      email(schema.identifier, { message: 'Formato de Email inválido' });
      validateHttp(schema.name, {
        request: ({ value }) =>
          value() ? `${environments.apiUrl}user/username/check/${value()}` : undefined,
        onSuccess: (response: { error: string; success: boolean }) => {
          if (response === null) return null;
          if (!response.success) {
            return {
              kind: 'name',
              message: response.error,
            };
          }

          return null;
        },
        onError: (error, ctx) => ({
          kind: 'network',
          message: `Ops, tivemos alguns problemas ao verificar seu email: ${ctx.value()}`,
        }),
      });
      validateHttp(schema.identifier, {
        request: ({ value }) =>
          value() ? `${environments.apiUrl}verify/credentials/check/${value()}` : undefined,
        onSuccess: (response: { error: string; success: boolean }) => {
          if (response === null) return null;
          if (!response.success) {
            return {
              kind: 'identifier',
              message: response.error,
            };
          }

          return null;
        },
        onError: (error, ctx) => ({
          kind: 'network',
          message: `Ops, tivemos alguns problemas ao verificar seu email: ${ctx.value()}`,
        }),
      });
    },
    {
      submission: {
        action: async (field) => {
          const posUser = this.service.postUser({ body: field().value() }).subscribe({
            next: () => 
              this.route.navigate(['/login'])
            ,
            error: (error: HttpErrorResponse) => {},
          });
        },
      },
    },
  );
}
